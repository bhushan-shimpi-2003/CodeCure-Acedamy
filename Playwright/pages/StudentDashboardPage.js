class StudentDashboardPage {
    constructor(page) {
        this.page = page;
        const sidebar = page.locator('aside');
        this.sidebarItems = {
            overview: sidebar.locator('button:has-text("Overview")'),
            availableCourses: sidebar.locator('button:has-text("Available Courses")'),
            lectures: sidebar.locator('button:has-text("Lectures")'),
            assignment: sidebar.locator('button:has-text("Assignment")'),
            career: sidebar.locator('button:has-text("Career")'),
            doubtSupport: sidebar.locator('button:has-text("Doubt Support")'),
            profile: sidebar.locator('button:has-text("Profile")'),
            logout: sidebar.locator('button:has-text("Logout")')
        };
        this.statsCards = page.locator('.grid > div'); // Generic selector for stats cards
        this.welcomeMessage = page.locator('h1');
    }

    async navigateTo(item) {
        await this.sidebarItems[item].click();
    }
}

module.exports = { StudentDashboardPage };
