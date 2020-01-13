import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders initial currency', () => {
  const { getByText } = render(<App />);
  const mainCurrencyElement = getByText(/USD - United States dollar/i);
  expect(mainCurrencyElement).toBeInTheDocument();
});

test('renders dialog on add', () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText(/ADD CURRENCY/i))
  const addDialogElement = getByText(/Add currency:/i);
  expect(addDialogElement).toBeInTheDocument();
});
