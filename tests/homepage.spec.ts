import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL);
})

test.describe('Homepage tests @Homepage', async () => {

    /**
     * open https://www.taskmaverick.com/ page
        check that correct page is displayed
        click the 'Menu' button in the header
        check that dropdown list contains 11 urls (`a` elements in html)
        click on the 'Automate Knowledge' category in the dropdown
        check that 'Automate Knowledge' block is displayed on page
        click on the 'Menu' button in header again
        get all Menu categories text (create method that get all dropdown links text and save it into array)
     */

    test('Check menu items', async ({ page }) => {
        const homepage = new Homepage(page);
        let arrMenuItems = [];

        await test.step('Check that correct page is displayed', async () => {
            await homepage.clickAcceptCookie();
            await homepage.visualCompare('homepage')
        })
        await test.step('Click the "Menu" button in the header', async () => {
            await homepage.clickMenuButton();
        })
        await test.step('Check that dropdown list contains 11 urls (`a` elements in html)', async () => {
            arrMenuItems = await homepage.getAllMenuItems();
            expect(arrMenuItems.length).toEqual(11);
        })
        await test.step('Click on the "Automate Knowledge" category in the dropdown', async () => {
            await homepage.clickAMenuItem("Automate Knowledge");
        })
        await test.step('Check that "Automate Knowledge" block is displayed on page', async () => {
            await homepage.checkBlockExists('Automate Knowledge');
            await homepage.visualCompare('automate-knowledge-block')
        })
        await test.step('Click on the "Menu" button in header again', async () => {
            await homepage.clickMenuButton();
        })
        await test.step('Get all Menu categories text', async () => {
            arrMenuItems.forEach(menuItem => console.log(menuItem));
        })

    })
})