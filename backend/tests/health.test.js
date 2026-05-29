/**
 * health.test.js
 *
 * Tests for GET /health endpoint.
 * Run with: npm test
 */

const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('should return HTTP 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  it('should return JSON with success: true', async () => {
    const res = await request(app).get('/health');
    expect(res.body.success).toBe(true);
  });

  it('should return a non-empty message string', async () => {
    const res = await request(app).get('/health');
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message.length).toBeGreaterThan(0);
  });

  it('should return a valid ISO timestamp', async () => {
    const res = await request(app).get('/health');
    expect(typeof res.body.timestamp).toBe('string');
    // Verify it parses as a valid date
    const parsed = new Date(res.body.timestamp);
    expect(parsed.toString()).not.toBe('Invalid Date');
  });

  it('should respond with Content-Type application/json', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

describe('Keep-Alive job disabled by default', () => {
  it('should NOT have KEEP_ALIVE_ENABLED=true in the test environment', () => {
    // The keep-alive job must only activate when explicitly enabled
    expect(process.env.KEEP_ALIVE_ENABLED).not.toBe('true');
  });
});
