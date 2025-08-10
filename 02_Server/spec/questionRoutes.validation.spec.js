process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');

describe('Question routes validation', () => {
  it('POST /questions returns 422 on invalid body', async () => {
    const res = await request(app).post('/questions').send({});
    expect(res.status).toBe(422);
    expect(res.body && res.body.error).toBeTruthy();
  });

  it('PUT /questions/:id returns 422 on invalid body', async () => {
    const res = await request(app).put('/questions/1').send({});
    expect(res.status).toBe(422);
    expect(res.body && res.body.error).toBeTruthy();
  });
});


