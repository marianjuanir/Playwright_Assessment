import { test, expect, Locator, Page } from "@playwright/test"
import fs from 'fs'

export class Homepage {
    readonly page: Page;
    readonly button: (btnName: string) => Locator;
    readonly menuItems: Locator;
    readonly menuItem: (menuName: string) => Locator;
    readonly link_LearnMore: (menuItem: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = (btnName) => page.getByRole("button", { name: btnName });
        this.menuItems = page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link"));
        this.menuItem = (menuName) => page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link", { name: menuName }));
        this.link_LearnMore = (menuItem) => page.locator(`div:has-text('${menuItem}') ~ div > a:text-is('Learn More')`)
    }




    /**
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Clicks the Accept button in Use Cookie banner
     * 
     */
    async clickAcceptCookie(): Promise<void> {
        await this.button("Accept").click();
    }

    /**
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Clicks the Menu button
     * 
     */
    async clickMenuButton(): Promise<void> {
        await this.button("Menu").click();
    }

    /**
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Retrieves all menu items
     * @returns array containing the retrieved menu items
     * 
     */
    async getAllMenuItems(): Promise<string[]> {
        let menuItems = await this.menuItems.elementHandles();
        const arrMenuItems = await Promise.all(menuItems.map(async (_, index) => {
            return await this.menuItems.nth(index).textContent();
        }))
        return arrMenuItems;
    }

    /** 
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Clicks the supplied menu item
     * @param paramMenuItem menu item to be clicked
     * 
     */
    async clickAMenuItem(paramMenuItem: string): Promise<void> {
        let menuItemSelector = this.getSelectorFromLocator(this.menuItem(paramMenuItem))
        await this.menuItem(paramMenuItem).click();
        await this.page.waitForSelector(menuItemSelector, { state: 'hidden' })
    }

    /**
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Checks that the block is visible in the screen
     * @param paramBlockText texts found in the block to be checked
     * 
     */
    async checkBlockIsVisible(paramBlockText: string): Promise<void> {
        await expect(this.link_LearnMore(paramBlockText)).toBeInViewport()
    }

    /**
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Compares actual screenshot of the page to a reference screenshot
     * @param paramFileName filename of the reference screenshot, e.g. homepage.png
     * 
     */
    async visualCompare(paramFileName: string): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        await this.page.screenshot({ path: `${test.info().snapshotPath()}/${paramFileName}` }) //get actual screenshot
        expect.soft(fs.readFileSync(`./screenshots/${paramFileName}`)).toMatchSnapshot(`${paramFileName}`, { threshold: 1 }) //compare to reference screenshot               
    }

    /**

     * 
     * Revision History
     * 
     *      03/25/2023      Marian Juanir       Initial version
     * 
     * 
     * @description Retrieves the selector from the Locator
     * @param paramLocator Locator
     * @returns selector as string
     * 
     */
    getSelectorFromLocator(paramLocator: Locator): string {
        return paramLocator.toString().split('@')[1];
    }
}