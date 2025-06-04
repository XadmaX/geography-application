import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Questionnaire from './Questionnaire';

const questions = [
  { id: '1', question: 'Q1?', answers: ['A1', 'A2'], answer: 0 },
  { id: '2', question: 'Q2?', answers: ['B1', 'B2'], answer: 1 },
];

test('navigates through questions and shows score modal', async () => {
  const user = userEvent.setup();
  render(
    <ThemeProvider theme={createTheme()}>
      <Questionnaire questions={questions} />
    </ThemeProvider>
  );

  expect(screen.getByText('Q1?')).toBeInTheDocument();
  await user.click(screen.getByLabelText('A1'));
  await user.click(screen.getByRole('button', { name: /next/i }));

  expect(screen.getByText('Q2?')).toBeInTheDocument();
  await user.click(screen.getByLabelText('B2'));
  await user.click(screen.getByRole('button', { name: /finish/i }));

  expect(await screen.findByText(/congratulations/i)).toBeInTheDocument();
});
