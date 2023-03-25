import { expect, Locator, Page } from "@playwright/test"
import fs from 'fs'

export class Homepage {
    readonly page: Page;
    readonly button;
    readonly menuItems: Locator;
    readonly menuItem;
    readonly block;
    readonly link_LearnMore: Locator;
    readonly block2;

    constructor(page: Page) {
        this.page = page;
        this.button = (btnName: string): Locator => page.getByRole("button", { name: btnName });
        this.menuItems = page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link"));
        this.menuItem = (menuName: string): Locator => page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link", { name: menuName }));
        this.block = (menuItem: string): Locator => page.getByRole('link', { name: menuItem });
        this.link_LearnMore = page.locator('#Automate-Knowledge').getByRole('link', { name: 'Learn More' })
        // this.block2 = page.getByText(/Automate Knowledge/).getByRole('link', { name: 'Learn More' })

    }

    async clickAcceptCookie() {
        await this.button("Accept").click();
    }

    async clickMenuButton() {
        await this.button("Menu").click();
    }

    async getAllMenuItems() {
        let arrMenuItems = [];
        let obj = await this.menuItems.elementHandles();
        for (let ctr = 0; ctr < obj.length; ctr++) {
            arrMenuItems.push(await this.menuItems.nth(ctr).textContent());
        }

        return arrMenuItems;
    }

    async clickAMenuItem(paramMenuItem: string) {
        let menuItemSelector = this.getSelectorFromLocator(this.menuItem(paramMenuItem))
        await this.menuItem(paramMenuItem).click();
        await this.page.waitForSelector(menuItemSelector, { state: 'hidden' })
    }

    async checkBlockExists(paramBlockTitle: string) {
        await expect(this.link_LearnMore).toBeInViewport()
    }

    async visualCompare(paramFileName: string) {
        await this.page.waitForLoadState('networkidle')
        await this.page.screenshot({ path: `./tests-out/tests/homepage.spec.js-snapshots/${paramFileName}-Desktop-Chrome-win32.png` }) //get actual screenshot that gets saved in outDir
        expect(fs.readFileSync(`./screenshots/${paramFileName}.png`)).toMatchSnapshot(`${paramFileName}.png`) //compare to reference screenshot        
    }

    getSelectorFromLocator(paramLocator: Locator) {
        return paramLocator.toString().split('@')[1];
    };
}