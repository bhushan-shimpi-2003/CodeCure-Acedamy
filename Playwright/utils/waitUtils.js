/**
 * Utility functions for Playwright tests
 */

class WaitUtils {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector, timeout = 5000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    async pause(ms) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = { WaitUtils };
