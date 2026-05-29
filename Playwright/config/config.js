module.exports = {
    baseUrl: 'https://www.codecuredev.com/',
    credentials: {
        admin: {
            email: process.env.ADMIN_EMAIL || 'admin@codecure.com',
            password: process.env.ADMIN_PASSWORD || 'password123'
        }
    }
};
