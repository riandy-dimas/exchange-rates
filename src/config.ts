import { CurrencyList } from './types'

const API_PATH = {
  'GET_CURRENCY_RATES': 'https://api.exchangeratesapi.io/latest'
}

const FORMAT_NUMERAL = '0,0.000000'

const CURRENCY_LIST: CurrencyList[] = [
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
]

export {
  API_PATH,
  CURRENCY_LIST,
  FORMAT_NUMERAL
}