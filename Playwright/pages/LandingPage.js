class LandingPage {
    constructor(page) {
        this.page = page;
        
        // Hero Section
        this.heroHeading = page.locator('h1');
        this.exploreProgramsBtn = page.locator("a[href='/signup'] >> text='Explore Programs'");
        this.watchDemoBtn = page.locator('button:has-text("Watch Demo")');
        
        // Navigation Links
        this.navHome = page.locator("a[href='/']").first();
        this.navCourses = page.locator("a[href='/courses']").first();
        this.navAbout = page.locator("a[href='/about']").first();
        this.navContact = page.locator("a[href='/contact']").first();
        this.navLogin = page.locator("a[href='/login']").first();
        this.navJoinNow = page.locator("a[href='/signup'] >> text='Join Now'");
        
        // Footer Section
        this.footerCourseCatalog = page.locator("a[href='/courses'] >> text='Course Catalog'");
        this.footerAboutUs = page.locator("a[href='/about'] >> text='About Us'");
        this.footerTerms = page.locator("a[href='/terms']");
        this.footerPrivacy = page.locator("a[href='/privacy']");
        this.copyrightText = page.locator('text="© 2026 Codecure Acedamy. All rights reserved."');
    }

    async navigate() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
}

module.exports = { LandingPage };
