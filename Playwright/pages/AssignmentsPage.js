class AssignmentsPage {
    constructor(page) {
        this.page = page;
        this.assignmentCards = page.locator('.grid > div'); // Assignments are in cards
        this.submitButton = page.locator('button:has-text("Submit")');
        this.statusBadge = (card) => card.locator('.text-xs'); // Assuming the badge has text-xs
    }

    async submitAssignment(assignmentName, filePath) {
        const card = this.page.locator(`div:has-text("${assignmentName}")`).first();
        await card.locator('button:has-text("Submit")').click();
        // File upload logic would go here if a file chooser opens
    }
}

module.exports = { AssignmentsPage };
