const { test } = require('@playwright/test');
const testData = require('./data/testData.json');

test('debug sidebar', async ({ page }) => {
    await page.goto('https://www.codecuredev.com/login');
    await page.locator('input[placeholder="Email address"]').fill(testData.student.email);
    await page.locator('input[placeholder="Enter your password"]').fill(testData.student.password);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL(/.*dashboard/);
    
    const sidebarLinks = await page.locator('aside a').allTextContents();
    console.log('Sidebar Links:', sidebarLinks);
    
    const sidebarButtons = await page.locator('aside button').allTextContents();
    console.log('Sidebar Buttons:', sidebarButtons);
});
