import React, { useState, useEffect } from 'react';
import { CURRENCY_LIST } from './config'
import { CurrencyData, CurrencyList } from './types'

import { 
  Container,
  Fab,
  Toolbar, 
} from '@material-ui/core';
import { 
  createStyles,
  makeStyles,
  ThemeProvider 
} from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';

import theme from './utils/AppTheme'
import { Cards, ElevationAppBar, MainCurrency, CurrencyDialog } from './components'
import { getCurrencyRates } from './services/CurrencyService'

const initialValue = 10.00
const initialBaseCurrency: CurrencyData = {
  currency: 'USD',
  flagCode: 'us',
  label: 'USD - United States dollar',
  rates: 0,
  value: initialValue
}
const initialCurrencyList = ['IDR']
const initialCurrencyData: CurrencyData[] = CURRENCY_LIST.map(currency => ({
  label: `${currency.currency} - ${currency.label}`,
  currency: currency.currency,
  value: initialValue,
  rates: 0,
  flagCode: currency.flagCode,
}))

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      flexGrow: 1,
      height: '100vh',
      color: theme.palette.primary.contrastText
    },
    container: {
      backgroundColor: theme.palette.primary.main,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {
      position: "fixed",
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  })
);

const mapCurrencyData = (currencyList: CurrencyList[], rates: any) => {
  const result: CurrencyData[] = currencyList.map(currency => ({
    label: `${currency.currency} - ${currency.label}`,
    currency: currency.currency,
    value: initialValue,
    rates: rates[currency.currency],
    flagCode: currency.flagCode,
  }))
  return result
}

const App: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState(initialBaseCurrency)
  const [value, setValue] = useState(initialValue)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSwitchDialog, setShowSwitchDialog] = useState(false)
  const [currencyList, setCurrencyList] = useState(initialCurrencyList)
  const [currencyData, setCurrencyData] = useState(initialCurrencyData)
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false)
  const classes = useStyles();

  const currencies = currencyData.filter(data => currencyList.indexOf(data.currency) > -1).sort((a, b) => a.currency.localeCompare(b.currency))
  const filteredAddCurrencyList = CURRENCY_LIST.filter(currency => currencyList.indexOf(currency.currency) === -1)
  const filteredSwitchCurrencyList = CURRENCY_LIST.filter(currency => currency.currency !== baseCurrency.currency)

  useEffect(() => {
    handleGetCurrencyData()
  }, [])

  const handleCloseAddCurrencyDialog = (value: string) => {
    if (value) {
      setCurrencyList([...currencyList, value])
    }
    setShowAddDialog(false)
  }

  const handleCloseSwitchCurrencyDialog = (value: string) => {
    if (value) {
      handleFlagClick(value, baseCurrency)
    }
    setShowSwitchDialog(false)
  }

  const handleClearCurrency = (currency: string) => {
    setCurrencyList(currencyList.filter(c => c !== currency))
  }

  const handleFlagClick = (currency: string, baseCurrency: CurrencyData) => {
    const filteredList = currencyList.filter(c => c !== currency)
    filteredList.push(baseCurrency.currency)
    setCurrencyList([...filteredList])
    setBaseCurrency(currencyData.find(c => c.currency === currency) || initialBaseCurrency)

    handleGetCurrencyData(currency)
  }

  const handleGetCurrencyData = (defaultBaseCurrency?: string) => {
    setIsCurrencyLoading(true)
    getCurrencyRates({
      baseCurrency: defaultBaseCurrency || initialBaseCurrency.currency,
      onSucceed: (rates: any) => {
        const mappedData = mapCurrencyData(CURRENCY_LIST, rates);
        setCurrencyData([...mappedData])
        setIsCurrencyLoading(false)
      },
      onFailed: () => {
        setIsCurrencyLoading(false)
      }
    })
  }

  const mainCurrency: CurrencyData = currencyData.find(currency => currency.currency === baseCurrency.currency) || initialBaseCurrency
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ElevationAppBar title="Exchange Rates" />
        <Toolbar />
        <Container 
          maxWidth="sm" 
          className={classes.container}
          disableGutters
        >
          <MainCurrency 
            currency={mainCurrency.currency}
            label={mainCurrency.label}
            value={value}
            onChange={setValue}
            onFlagClick={() => setShowSwitchDialog(true)}
            flagCode={mainCurrency.flagCode}
          />
          <Cards 
            value={value}
            currencies={currencies}
            onClear={handleClearCurrency}
            isLoading={isCurrencyLoading}
            onFlagClick={handleFlagClick}
            baseCurrency={baseCurrency}
          />
          <Fab color="primary" onClick={() => setShowAddDialog(true)} className={classes.fab} variant="extended">
            <PostAddIcon className={classes.extendedIcon} />
            Add Currency
          </Fab>
        </Container>
        <CurrencyDialog 
          open={showAddDialog}
          onClose={handleCloseAddCurrencyDialog}
          currencies={filteredAddCurrencyList}
          title="Add currency"
        />
        <CurrencyDialog 
          open={showSwitchDialog}
          onClose={handleCloseSwitchCurrencyDialog}
          currencies={filteredSwitchCurrencyList}
          title="Change currency"
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
