process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const Question = require('../models/questionModel');

describe('Question routes', () => {
  afterEach(() => {
    if (Question.find.and) Question.find.and.stub();
    if (Question.findById.and) Question.findById.and.stub();
    if (Question.create.and) Question.create.and.stub();
    if (Question.findByIdAndUpdate.and) Question.findByIdAndUpdate.and.stub();
    if (Question.findOne.and) Question.findOne.and.stub();
    if (Question.findByIdAndRemove && Question.findByIdAndRemove.and) {
      Question.findByIdAndRemove.and.stub();
    }
  });

  it('GET /questions should return list of questions', async () => {
    const fakeQuestions = [{ question: 'Q1' }, { question: 'Q2' }];
    spyOn(Question, 'find').and.returnValue(Promise.resolve(fakeQuestions));

    const res = await request(app).get('/questions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
    expect(res.body.length).toBe(fakeQuestions.length);
  });

  it('GET /questions/:id should return a single question', async () => {
    const fakeQuestion = { _id: '1', question: 'Q1' };
    spyOn(Question, 'findById').and.returnValue(Promise.resolve(fakeQuestion));

    const res = await request(app).get('/questions/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(fakeQuestion);
  });

  it('POST /questions should create a question', async () => {
    const payload = { question: 'New?' };
    const created = { _id: '1', ...payload };
    spyOn(Question, 'create').and.returnValue(Promise.resolve(created));

    const res = await request(app).post('/questions').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(created);
  });

  it('PUT /questions/:id should update a question', async () => {
    const updated = { _id: '1', question: 'Updated' };
    spyOn(Question, 'findByIdAndUpdate').and.returnValue(Promise.resolve());
    spyOn(Question, 'findOne').and.returnValue(Promise.resolve(updated));

    const res = await request(app)
      .put('/questions/1')
      .send({ question: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it('DELETE /questions/:id should delete a question', async () => {
    const removed = { _id: '1', question: 'Removed' };
    if (!Question.findByIdAndRemove) {
      Question.findByIdAndRemove = () => {};
    }
    spyOn(Question, 'findByIdAndRemove').and.returnValue(
      Promise.resolve(removed),
    );

    const res = await request(app).delete('/questions/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(removed);
  });
});
