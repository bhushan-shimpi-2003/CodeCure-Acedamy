const { test, expect } = require('../fixtures/baseTest');
const testData = require('../data/testData.json');

test.describe('Login Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('should show error with invalid credentials', async ({ loginPage, page }) => {
        await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
        await expect(page).not.toHaveURL(/.*dashboard/);
    });

    test('should login successfully as student', async ({ loginPage, page }) => {
        await loginPage.login(testData.student.email, testData.student.password);
        await expect(page).toHaveURL(/.*dashboard/);

        const title = await page.locator('h1').textContent();
        console.log('Student Login successful! Page title is:', title);
    });

    test('should login successfully as teacher', async ({ loginPage, page }) => {
        await loginPage.login(testData.teacher.email, testData.teacher.password);
        await expect(page).toHaveURL(/.*teacher/);

        const title = await page.locator('h1').textContent();
        console.log('Teacher Login successful! Page title is:', title);
    });

    test('should login successfully as admin', async ({ loginPage, page }) => {
        await loginPage.login(testData.admin.email, testData.admin.password);
        // Assuming admin also goes to a specific page, possibly /teacher or /dashboard 
        // since the credentials provided are the same as teacher.
        await expect(page).toHaveURL(/.*(admin)/);

        const title = await page.locator('h1').textContent();
        console.log('Admin Login successful! Page title is:', title);
    });

    test('should have visible login elements', async ({ loginPage }) => {
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
});
