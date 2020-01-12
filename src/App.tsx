import React from 'react';
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

import { ElevationAppBar } from './components'

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
    },
    box: {
      height: '100px',
      border: `1px dashed ${theme.palette.primary.contrastText}`,
      borderRadius: '20px',
      padding: '15px',
      boxSizing: 'border-box',
      margin: '30px 0',
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ElevationAppBar title="Exchange Rates" />
        <Toolbar />
        <Container maxWidth="md" className={classes.container}>
          <Typography component="div" className={classes.box}>
            Lorem ipsum dolore
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
