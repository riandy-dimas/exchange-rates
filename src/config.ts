import { SimplifiedCurrencyData } from './types';

const API_PATH = {
  GET_CURRENCY_RATES: 'https://api.exchangeratesapi.io/latest',
};

const FORMAT_NUMERAL = '0,0.000000';

const CURRENCY_LIST: SimplifiedCurrencyData[] = [
  {
    currency: 'CAD',
    label: 'Canadian dollar',
    flagCode: 'ca',
  },
  {
    currency: 'USD',
    label: 'United States dollar',
    flagCode: 'us',
  },
  {
    currency: 'IDR',
    label: 'Indonesian rupiah',
    flagCode: 'id',
  },
  {
    currency: 'GBP',
    label: 'Pound sterling',
    flagCode: 'gb',
  },
  {
    currency: 'CHF',
    label: 'Swiss franc',
    flagCode: 'ch',
  },
  {
    currency: 'SGD',
    label: 'Singapore dollar',
    flagCode: 'sg',
  },
  {
    currency: 'INR',
    label: 'Indian rupee',
    flagCode: 'in',
  },
  {
    currency: 'MYR',
    label: 'Malaysian ringgit',
    flagCode: 'my',
  },
  {
    currency: 'JPY',
    label: 'Japanese yen',
    flagCode: 'jp',
  },
  {
    currency: 'KRW',
    label: 'South Korean won',
    flagCode: 'kr',
  },
  {
    currency: 'BGN',
    label: 'Bulgarian le',
    flagCode: 'bg',
  },
  {
    currency: 'CZK',
    label: 'Czech korun',
    flagCode: 'cz',
  },
  {
    currency: 'DKK',
    label: 'Danish krone',
    flagCode: 'dk',
  },
  {
    currency: 'HUF',
    label: 'Hungarian forint',
    flagCode: 'hu',
  },
  {
    currency: 'PLN',
    label: 'Polish zloty',
    flagCode: 'pl',
  },
  {
    currency: 'RON',
    label: 'Romanian leu',
    flagCode: 'ro',
  },
  {
    currency: 'SEK',
    label: 'Swedish krona',
    flagCode: 'se',
  },
  {
    currency: 'ISK',
    label: 'Icelandic krona',
    flagCode: 'is',
  },
  {
    currency: 'NOK',
    label: 'Norwegian krone',
    flagCode: 'no',
  },
  {
    currency: 'HRK',
    label: 'Croatian kun',
    flagCode: 'hr',
  },
  {
    currency: 'RUB',
    label: 'Russian rouble',
    flagCode: 'ru',
  },
  {
    currency: 'TRY',
    label: 'Turkish lira',
    flagCode: 'tr',
  },
  {
    currency: 'AUD',
    label: 'Australian dollar',
    flagCode: 'au',
  },
  {
    currency: 'BRL',
    label: 'Brazilian real',
    flagCode: 'br',
  },
  {
    currency: 'CNY',
    label: 'Chinese yuan renminb',
    flagCode: 'cn',
  },
  {
    currency: 'HKD',
    label: 'Hong Kong dollar',
    flagCode: 'hk',
  },
  {
    currency: 'ILS',
    label: 'Israeli sheke',
    flagCode: 'il',
  },
  {
    currency: 'MXN',
    label: 'Mexican pes',
    flagCode: 'mx',
  },
  {
    currency: 'NZD',
    label: 'New Zealand dollar',
    flagCode: 'nz',
  },
  {
    currency: 'PHP',
    label: 'Philippine pes',
    flagCode: 'ph',
  },
  {
    currency: 'THB',
    label: 'Thai bah',
    flagCode: 'th',
  },
  {
    currency: 'ZAR',
    label: 'South African rand',
    flagCode: 'za',
  },
];

export { API_PATH, CURRENCY_LIST, FORMAT_NUMERAL };
