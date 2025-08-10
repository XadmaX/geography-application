process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');

describe('Health endpoint', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});


