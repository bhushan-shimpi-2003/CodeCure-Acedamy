const { test, expect } = require('../fixtures/baseTest');

test.describe('Landing Page Integrity', () => {

    test.beforeEach(async ({ landingPage }) => {
        await landingPage.navigate();
    });

    test('should have correct page title', async ({ page }) => {
        await expect(page).toHaveTitle(/CodeCure Academy/i);
    });

    test('should display hero section with main heading', async ({ landingPage }) => {
        await expect(landingPage.heroHeading).toBeVisible();
        await expect(landingPage.heroHeading).toContainText('Master Any Skill');
    });

    test('should have functional navigation links', async ({ landingPage, page }) => {
        await expect(landingPage.navHome).toBeVisible();
        await expect(landingPage.navCourses).toBeVisible();
        await expect(landingPage.navAbout).toBeVisible();
        await expect(landingPage.navLogin).toBeVisible();
        
        // Test navigation to login page
        await landingPage.navLogin.click();
        await expect(page).toHaveURL(/.*login/);
    });

    test('should display call to action buttons', async ({ landingPage }) => {
        await expect(landingPage.exploreProgramsBtn).toBeVisible();
        await expect(landingPage.watchDemoBtn).toBeVisible();
    });

    test('should display footer with copyright and links', async ({ landingPage }) => {
        await landingPage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(landingPage.copyrightText).toBeVisible();
        await expect(landingPage.footerTerms).toBeVisible();
        await expect(landingPage.footerPrivacy).toBeVisible();
    });
});
