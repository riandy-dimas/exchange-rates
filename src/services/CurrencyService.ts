import axios, { AxiosResponse } from 'axios'
import { API_PATH } from '../config'

export type GetCurrencyRateRequest = {
  /** Current base currency code represented in three letter code of `ISO 4217`. */
  baseCurrency: string
  /** Function to be called when the request is unsuccessful. */
  onFailed: Function
  /** Function to be called when the request is successful. */
  onSucceed: Function
}

export type GetCurrencyRateResponse = {
  /** Base currency code represented in three letter code of `ISO 4217`. */
  base: string
  /** The effective date of the data, typed in format `YYYY-MM-DD`. */
  date: string
  /** List of currency data rates. */
  rates: {
    /** Three letter currency code based on `ISO 4217` accompanied by its value. */
    [currencyCode: string]: number
  }
}

export const getCurrencyRates = ({
  baseCurrency,
  onSucceed,
  onFailed
}: GetCurrencyRateRequest) => {
  axios
    // The API we're requesting data from
    .get(API_PATH.GET_CURRENCY_RATES 
      + `?base=${baseCurrency}`
    )
    // Once we get a response, we'll send the data using `onSucceed()`
    .then((response: AxiosResponse<GetCurrencyRateResponse>) => {
      const { rates } = response.data
      onSucceed(rates)
    })
    // Use the `.catch()` method if error happened and also call `onFailed()`
    .catch(error => {
      console.error(error)
      onFailed()
    });
}
