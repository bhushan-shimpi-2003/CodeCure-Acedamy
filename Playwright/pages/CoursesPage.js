class CoursesPage {
    constructor(page) {
        this.page = page;
        this.courseCards = page.locator('.grid > div'); // Adjust based on actual UI if needed
        this.requestAccessButtons = page.locator('button:has-text("Request Access")');
        this.enrolledBadges = page.locator('span:has-text("Enrolled")');
    }

    async requestAccess(courseName) {
        const course = this.page.locator(`.grid > div:has-text("${courseName}")`);
        await course.locator('button:has-text("Request Access")').click();
    }
}

module.exports = { CoursesPage };
