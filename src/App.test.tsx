import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders initial currency', () => {
  const { getByText } = render(<App />);
  const mainCurrencyElement = getByText(/USD - United States dollar/i);
  expect(mainCurrencyElement).toBeInTheDocument();
});

test('renders dialog on add', () => {
  const { getByText, getByTestId } = render(<App />);
  fireEvent.click(getByTestId(/addCurrency/))
  const addDialogElement = getByText(/Add currency:/i);
  expect(addDialogElement).toBeInTheDocument();
});

test('renders empty list', () => {
  const { getByText, getByTestId } = render(<App />);
  fireEvent.click(getByTestId(/removeCurrencyIDR/))
  const emptyElement = getByText(/Let\'s start with adding a currency!/i);
  expect(emptyElement).toBeInTheDocument();
});
