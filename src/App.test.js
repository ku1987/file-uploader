import { render, screen } from '@testing-library/react';
import App from './App';

test('renders buttons', () => {
  render(<App />);
  const uploadButton = screen.getByText(/Upload/i);
  const saveButton = screen.getByText(/Save/i);
  expect(uploadButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
