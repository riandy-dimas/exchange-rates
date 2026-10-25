import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// UI tests do not contact the deployed exchange-rate provider.
jest.mock('axios', () => ({
  __esModule: true,
  default: { get: jest.fn(() => new Promise(() => {})) },
}));
beforeEach(() => {
  (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
});

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

test('renders dialog on switch', () => {
  const { getByText, getByTestId } = render(<App />);
  fireEvent.click(getByTestId(/mainCurrencyFlag/))
  const switchDialogElement = getByText(/Change currency:/i);
  expect(switchDialogElement).toBeInTheDocument();
});

test('renders empty list', () => {
  const { getByText, getByTestId } = render(<App />);
  fireEvent.click(getByTestId(/removeCurrencyIDR/))
  const emptyElement = getByText(/Let\'s start with adding a currency!/i);
  expect(emptyElement).toBeInTheDocument();
});
