import { expect, Locator, Page } from "@playwright/test"

export class Homepage {
    readonly page: Page;
    readonly button;
    readonly menuItems: Locator;
    readonly menuItem;
    readonly block;

    constructor(page: Page) {
        this.page = page;
        this.button = (btnName: string): Locator => page.getByRole("button", { name: btnName });
        this.menuItems = page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link"));
        this.menuItem = (menuName: string): Locator => page.locator("nav#w-dropdown-list-0").locator(page.getByRole("link", { name: menuName }));
        this.block = (blockTitle: string): Locator => page.locator(`div :text-is("${blockTitle}")`);
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
        await this.menuItem(paramMenuItem).click();
    }

    async checkBlockExists(paramBlockTitle: string) {
        await expect(this.block(paramBlockTitle)).toBeVisible();
    }
}