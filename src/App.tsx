import React, { useState } from 'react';
import './App.css';

import { 
  Container,
  Fab,
  Toolbar, 
} from '@material-ui/core';
import { 
  createMuiTheme,
  createStyles,
  makeStyles,
  ThemeProvider 
} from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';

import { Cards, ElevationAppBar, MainCurrency, AddCurrencyDialog } from './components'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#832232'
    },
    secondary: {
      main: '#CE8964'
    }
  }
})

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

const App: React.FC = () => {
  const [value, setValue] = useState(10.00)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [currencyList, setCurrencyList] = useState(['IDR'])
  const classes = useStyles();

  type CurrencyProps = {
    currency: string
    label: string
    flagCode: string
  }

  const addCurrencyList: CurrencyProps[] = [
    {
      currency: 'USD',
      label: 'United States dollar',
      flagCode: 'us',
    },
    {
      currency: 'CAD',
      label: 'Canadian dollar',
      flagCode: 'ca',
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

  type CurrencyData = {
    label: string
    currency: string
    value: number
    rates: number
    flagCode: string
  }

  const currenciesData: CurrencyData[] = addCurrencyList.map(currency => ({
    label: `${currency.currency} - ${currency.label}`,
    currency: currency.currency,
    value,
    rates: Math.random() * 1000,
    flagCode: currency.flagCode,
  }))

  const currencies = currenciesData.filter(currencyData => currencyList.indexOf(currencyData.currency) > -1)
  const filteredAddCurrencyList = addCurrencyList.filter(currency => currencyList.indexOf(currency.currency) === -1)

  const handleCloseAddCurrencyDialog = (value: string) => {
    if (value) {
      setCurrencyList([...currencyList, value])
    }
    setShowAddDialog(false)
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
          />
          <Cards 
            value={value}
            currencies={currencies}
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
