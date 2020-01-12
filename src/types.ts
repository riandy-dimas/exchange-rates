export type SimplifiedCurrencyData = {
  /** Three letter currency code based on `ISO 4217`. */
  currency: string
  /** Two letter flag code of the currrency code based on `ISO 3166`. */
  flagCode: string
    /** The description of the currency. */
  label: string
}

export type CurrencyData = {
  /** Currency rates based on base currency. */
  rates: number
  /** Current value number to be converted. */
  value: number
} & SimplifiedCurrencyData