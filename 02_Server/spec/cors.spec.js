process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');

describe('CORS behavior', () => {
  const oldOrigin = process.env.CORS_ORIGIN;
  afterAll(() => {
    process.env.CORS_ORIGIN = oldOrigin;
  });

  it('responds with 200 without CORS_ORIGIN set (default open)', async () => {
    delete process.env.CORS_ORIGIN;
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });
});


