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
import { Cards, ElevationAppBar, MainCurrency, AddCurrencyDialog } from './components'
import { getCurrencyRates } from './services/CurrencyService'

const initialValue = 10.00
const initialBaseCurrency = 'USD'

const initialCurrenciesData: CurrencyData[] = CURRENCY_LIST.map(currency => ({
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
  const [value, setValue] = useState(initialValue)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currencyList, setCurrencyList] = useState(['IDR'])
  const [currencyData, setCurrencyData] = useState(initialCurrenciesData)
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false)
  const classes = useStyles();

  const currencies = currencyData.filter(data => currencyList.indexOf(data.currency) > -1)
  const filteredAddCurrencyList = CURRENCY_LIST.filter(currency => currencyList.indexOf(currency.currency) === -1)

  useEffect(() => {
    handleGetCurrencyData()
  }, [])

  const handleCloseAddCurrencyDialog = (value: string) => {
    if (value) {
      setCurrencyList([...currencyList, value])
    }
    setShowAddDialog(false)
  }

  const handleClearCurrency = (currency: string) => {
    setCurrencyList(currencyList.filter(c => c !== currency))
  }

  const handleGetCurrencyData = () => {
    setIsCurrencyLoading(true)
    getCurrencyRates({
      baseCurrency: initialBaseCurrency,
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
            currency="USD"
            label="USD - United States Dollar"
            value={value}
            onChange={setValue}
            onBlur={() => {}}
          />
          <Cards 
            value={value}
            currencies={currencies}
            onClear={handleClearCurrency}
            isLoading={isCurrencyLoading}
          />
          <Fab color="primary" onClick={() => setShowAddDialog(true)} className={classes.fab} variant="extended">
            <PostAddIcon className={classes.extendedIcon} />
            Add Currency
          </Fab>
        </Container>
        <AddCurrencyDialog 
          open={showAddDialog}
          onClose={handleCloseAddCurrencyDialog}
          currencies={filteredAddCurrencyList}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
