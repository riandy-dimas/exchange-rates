import { CurrencyData, SimplifiedCurrencyData } from '../types'
import { GetCurrencyRateResponse } from '../services/CurrencyService'

/**
  * Map the received rates data into consumable `CurrencyData[]`
  *
  * @param {SimplifiedCurrencyData[]} currencyList
  * @param {number} initialValue
  * @param {GetCurrencyRateResponse['rates']} rates
  * @returns {CurrencyData[]}
  */
export const mapCurrencyData = (
  currencyList: SimplifiedCurrencyData[], 
  initialValue: number, 
  rates: GetCurrencyRateResponse['rates']
): CurrencyData[] => { 
  const result: CurrencyData[] = currencyList.map(currency => ({
    label: `${currency.currency} - ${currency.label}`,
    currency: currency.currency,
    value: initialValue,
    rates: rates[currency.currency],
    flagCode: currency.flagCode,
  }))
  return result
}