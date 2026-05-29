const { test, expect } = require('../fixtures/baseTest');
const testData = require('../data/testData.json');

test.describe('Student Module Full Suite', () => {

    test.beforeEach(async ({ loginPage, dashboardPage, page }) => {
        await loginPage.navigate();
        await loginPage.login(testData.student.email, testData.student.password);
        await expect(dashboardPage.sidebarItems.overview).toBeVisible();
    });

    test('Dashboard: Should display welcome message and stats cards', async ({ dashboardPage }) => {
        await expect(dashboardPage.welcomeMessage).toBeVisible();
        await expect(dashboardPage.statsCards.first()).toBeVisible();
        const count = await dashboardPage.statsCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('Navigation: Should navigate to all sidebar sections successfully', async ({ dashboardPage, page }) => {
        const sections = [
            { name: 'availableCourses', expectedText: 'Available Courses' },
            { name: 'lectures', expectedText: 'Course Content' },
            { name: 'assignment', expectedText: 'Tasks & Assignments' },
            { name: 'career', expectedText: 'Career & Placement' },
            { name: 'doubtSupport', expectedText: 'Doubt Support' },
            { name: 'profile', expectedText: 'My Profile' }
        ];

        for (const section of sections) {
            await dashboardPage.navigateTo(section.name);
            await expect(page.getByText(section.expectedText, { exact: false }).first()).toBeVisible();
        }
    });

    test('Courses: Should display course catalog and enrolled courses', async ({ dashboardPage, coursesPage, page }) => {
        await dashboardPage.navigateTo('availableCourses');
        await expect(page.getByText('Available Courses', { exact: false }).first()).toBeVisible();
        await expect(coursesPage.courseCards.first()).toBeVisible();
        
        const enrolledCount = await coursesPage.enrolledBadges.count();
        console.log(`Student is enrolled in ${enrolledCount} courses.`);
    });

    test('Assignments: Should display assignment cards', async ({ dashboardPage, assignmentsPage, page }) => {
        await dashboardPage.navigateTo('assignment');
        await expect(page.getByText('Tasks & Assignments', { exact: false }).first()).toBeVisible();
        
        // Wait for cards to load
        await expect(assignmentsPage.assignmentCards.first()).toBeVisible();
        const cardCount = await assignmentsPage.assignmentCards.count();
        expect(cardCount).toBeGreaterThan(0);
    });

    test('Doubt Support: Should be able to see the "Submit Doubt" section', async ({ dashboardPage, doubtPage, page }) => {
        await dashboardPage.navigateTo('doubtSupport');
        await expect(page.getByText('Doubt Support', { exact: false }).first()).toBeVisible();
        
        await expect(doubtPage.submitDoubtButton).toBeVisible();
    });

    test('Profile: Should display student profile details', async ({ dashboardPage, profilePage, page }) => {
        await dashboardPage.navigateTo('profile');
        await expect(page.getByText('My Profile', { exact: false }).first()).toBeVisible();
        
        await expect(profilePage.fullNameInput).toBeVisible();
        await expect(profilePage.emailInput).toHaveValue(testData.student.email);
    });

    test('Logout: Should successfully log out the student', async ({ dashboardPage, page }) => {
        await dashboardPage.sidebarItems.logout.click();
        await expect(page).toHaveURL(/.*login/);
    });
});
