class ProfilePage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = page.getByRole('textbox').nth(1);
        this.emailInput = page.locator('input[type="email"]');
        this.updateButton = page.getByRole('button', { name: /Update Profile/i });
        this.changePasswordButton = page.getByRole('button', { name: /Change Password/i });
        this.newPasswordInput = page.getByPlaceholder('Leave blank to keep current password');
        this.confirmPasswordInput = page.getByPlaceholder('Confirm New Password');
    }

    async updateProfile(name) {
        await this.fullNameInput.fill(name);
        await this.updateButton.click();
    }
}

module.exports = { ProfilePage };
