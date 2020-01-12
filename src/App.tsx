import React, { useState } from 'react';
import './App.css';

import { 
  Box,
  Container,
  Toolbar, 
  Typography
} from '@material-ui/core';
import { 
  createMuiTheme,
  createStyles,
  makeStyles,
  ThemeProvider 
} from '@material-ui/core/styles';

import { Cards, ElevationAppBar, MainCurrency } from './components'

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
    }
  })
);

const App: React.FC = () => {
  const [value, setValue] = useState(10.00)
  const classes = useStyles();

  const currencies = [
    {
      label: 'IDR - Indonesian Rupiah',
      currency: 'IDR',
      value,
      rates: 13000,
      flagCode: 'id'
    },
    {
      label: 'MYR - Malaysian Ringgit',
      currency: 'MYR',
      value,
      rates: 2400,
      flagCode: 'my'
    },
    {
      label: 'INR - Indian Rupee',
      currency: 'INR',
      value,
      rates: 1424,
      flagCode: 'in'
    },
    {
      label: 'JPY - Japanese Yen',
      currency: 'JPY',
      value,
      rates: 123,
      flagCode: 'jp'
    }
  ]

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
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
