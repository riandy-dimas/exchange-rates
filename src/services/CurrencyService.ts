import axios, { AxiosResponse } from 'axios'
import { API_PATH } from '../config'

type GetCurrencyRateRequest = {
  baseCurrency: string
  onSucceed: Function
  onFailed: Function
}

type GetCurrencyRateResponse = {
  rates: any[],
  base: string,
  date: string
}

const getCurrencyRates = ({
  baseCurrency,
  onSucceed,
  onFailed
}: GetCurrencyRateRequest) => {
  axios
    // The API we're requesting data from
    .get(API_PATH.GET_CURRENCY_RATES 
      + `?base=${baseCurrency}` 
      // + `?symbols=${targetCurrencies.join(',')}`
    )
    // Once we get a response, we'll map the API endpoints to our props
    .then((response: AxiosResponse<GetCurrencyRateResponse>) =>
      response.data
    )
    // Let's make sure to change the loading state to display the data
    .then(currencies => {
      const { rates } = currencies
      onSucceed(rates)
    })
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => {
      console.error(error)
      onFailed()
    });
}

export { getCurrencyRates }