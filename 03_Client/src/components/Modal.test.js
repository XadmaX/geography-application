import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from './Modal';

const score = { total: 2, correct: 2, passed: true };

test('renders score information and handles retry', async () => {
  const user = userEvent.setup();
  const onRetry = jest.fn();
  render(
    <ThemeProvider theme={createTheme()}>
      <Modal isOpen={true} onRetry={onRetry} score={score} />
    </ThemeProvider>
  );

  expect(screen.getByText('Congratulations, you passed! 🤓')).toBeInTheDocument();
  expect(screen.getByText('Total questions: 2')).toBeInTheDocument();
  expect(screen.getByText('Answered correctly: 2')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /retry/i }));
  expect(onRetry).toHaveBeenCalled();
});
