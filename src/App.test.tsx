import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders initial currency', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/USD - United States dollar/i);
  expect(linkElement).toBeInTheDocument();
});
