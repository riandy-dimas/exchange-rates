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

import { ElevationAppBar, MainCurrency } from './components'

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
      backgroundColor: theme.palette.primary.main
    }
  })
);

const App: React.FC = () => {
  const [value, setValue] = useState(10.00)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ElevationAppBar title="Exchange Rates" />
        <Toolbar />
        <Container maxWidth="md" className={classes.container}>
          <MainCurrency 
            currency="USD"
            label="USD - United States Dollar"
            value={value}
            onChange={setValue}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
