import axios from 'axios';
import { fetchQuestions } from './api';

jest.mock('axios');

test('fetchQuestions calls API with env host and maps ids', async () => {
  process.env.REACT_APP_GEO_SRV = 'host:4000';
  axios.get.mockResolvedValueOnce({ data: [{ _id: 'x1', question: 'Q' }] });

  const data = await fetchQuestions(3);

  expect(axios.get).toHaveBeenCalledWith(
    'http://host:4000/questions?number=3'
  );
  expect(data).toEqual([{ id: 'x1', question: 'Q' }]);
});

test('fetchQuestions handles error gracefully', async () => {
  process.env.REACT_APP_GEO_SRV = 'host:4000';
  axios.get.mockRejectedValueOnce(new Error('network'));
  await fetchQuestions(1); // should not throw
  expect(axios.get).toHaveBeenCalled();
});


