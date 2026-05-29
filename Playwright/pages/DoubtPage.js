class DoubtPage {
    constructor(page) {
        this.page = page;
        this.doubtTitleInput = page.locator('input[placeholder*="Enter doubt title"]');
        this.doubtDescriptionInput = page.locator('textarea[placeholder*="Describe your doubt"]');
        this.submitDoubtButton = page.locator('button:has-text("Submit Doubt")');
        this.myDoubtsList = page.locator('.space-y-4 > div'); // The cards in "My Doubts"
    }

    async askDoubt(title, description) {
        if (await this.doubtTitleInput.isVisible()) {
            await this.doubtTitleInput.fill(title);
        }
        await this.doubtDescriptionInput.fill(description);
        await this.submitDoubtButton.click();
    }
}

module.exports = { DoubtPage };
