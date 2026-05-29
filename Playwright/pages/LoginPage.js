class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[placeholder="Email address"]');
        this.passwordInput = page.locator('input[placeholder="Enter your password"]');
        this.loginButton = page.locator('button:has-text("Sign In")');
        this.errorMessage = page.locator('.error-message');
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForURL(/.*dashboard/, { timeout: 10000 });
    }
}

module.exports = { LoginPage };
