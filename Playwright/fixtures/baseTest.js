const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { LandingPage } = require('../pages/LandingPage');
const { StudentDashboardPage } = require('../pages/StudentDashboardPage');
const { CoursesPage } = require('../pages/CoursesPage');
const { AssignmentsPage } = require('../pages/AssignmentsPage');
const { DoubtPage } = require('../pages/DoubtPage');
const { ProfilePage } = require('../pages/ProfilePage');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new StudentDashboardPage(page);
        await use(dashboardPage);
    },
    coursesPage: async ({ page }, use) => {
        const coursesPage = new CoursesPage(page);
        await use(coursesPage);
    },
    assignmentsPage: async ({ page }, use) => {
        const assignmentsPage = new AssignmentsPage(page);
        await use(assignmentsPage);
    },
    doubtPage: async ({ page }, use) => {
        const doubtPage = new DoubtPage(page);
        await use(doubtPage);
    },
    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
    }
});

exports.expect = base.expect;
