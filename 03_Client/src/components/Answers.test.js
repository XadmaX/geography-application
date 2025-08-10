import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Answers from './Answers';

test('Answers renders items and calls onSelect with index', async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  render(
    <ThemeProvider theme={createTheme()}>
      <Answers items={["A1", "A2", "A3"]} value={null} onSelect={onSelect} />
    </ThemeProvider>
  );

  await user.click(screen.getByLabelText('A2'));
  expect(onSelect).toHaveBeenCalledWith(1);
});


