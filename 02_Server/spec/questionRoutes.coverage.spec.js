process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const Question = require('../models/questionModel');

describe('Question routes happy paths (coverage)', () => {
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

  it('GET /questions limits results with ?number', async () => {
    const fake = [{ question: 'Q1' }, { question: 'Q2' }, { question: 'Q3' }];
    spyOn(Question, 'find').and.returnValue(Promise.resolve(fake));
    const res = await request(app).get('/questions?number=2');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('PUT /questions/:id returns updated doc', async () => {
    spyOn(Question, 'findByIdAndUpdate').and.returnValue(Promise.resolve());
    spyOn(Question, 'findOne').and.returnValue(
      Promise.resolve({ _id: '1', question: 'U' }),
    );
    const res = await request(app)
      .put('/questions/1')
      .send({ question: 'U', answers: ['A'], answer: 0 });
    expect(res.status).toBe(200);
    expect(res.body.question).toBe('U');
  });

  it('DELETE /questions/:id returns removed doc', async () => {
    if (!Question.findByIdAndRemove) Question.findByIdAndRemove = () => {};
    spyOn(Question, 'findByIdAndRemove').and.returnValue(
      Promise.resolve({ _id: '1', question: 'R' }),
    );
    const res = await request(app).delete('/questions/1');
    expect(res.status).toBe(200);
    expect(res.body.question).toBe('R');
  });
});


