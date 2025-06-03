const { countScore } = require('./helpers');

describe('countScore', () => {
  const questions = [
    { id: '1', answer: 0 },
    { id: '2', answer: 1 },
    { id: '3', answer: 2 },
  ];

  test('returns passed=true when all answers are correct', () => {
    const result = countScore(questions, [0, 1, 2]);
    expect(result).toEqual({ total: 3, correct: 3, passed: true });
  });

  test('returns passed=false when some answers are incorrect', () => {
    const result = countScore(questions, [0, 0, 2]);
    expect(result).toEqual({ total: 3, correct: 2, passed: false });
  });

  test('returns zero correct when all answers are wrong', () => {
    const result = countScore(questions, [3, 3, 3]);
    expect(result).toEqual({ total: 3, correct: 0, passed: false });
  });
});
