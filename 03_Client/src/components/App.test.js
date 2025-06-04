import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import * as API from '../utils/api';

jest.mock('../utils/api', () => ({
  fetchQuestions: jest.fn(),
}));

const questions = [
  { id: '1', question: 'Q1?', answers: ['A1', 'A2'], answer: 0 },
];

test('renders progress bar and then questionnaire after data load', async () => {
  API.fetchQuestions.mockResolvedValueOnce(questions);
  render(
    <ThemeProvider theme={createTheme()}>
      <App />
    </ThemeProvider>
  );
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(await screen.findByText('Q1?')).toBeInTheDocument();
});
