import React from 'react'
import cn from 'classnames'
import { CurrencyData } from '../types'
import { CurrencyCard } from './CurrencyCard'
import { 
  Backdrop,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import theme from '../utils/AppTheme'

type CardsProps = {
  /** Current base currency data. */
  baseCurrency: CurrencyData
  /** List of currency that will be shown as list. */
  currencies: CurrencyData[]
  /** If `true`, loading spinner will appear. */
  isLoading: boolean
  /** Function to be called when user click the `clear` button. */
  onClear: Function
  /** Function to be called when user click the flag. */
  onFlagClick: (currency: string, baseCurrency: CurrencyData) => void
  /** Current value number to be converted. */
  value: number
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: 'auto',
      marginTop: '30px',
      height: 'calc(100vh - 246px)',
      paddingTop: '25px',
      borderTopLeftRadius: '25px',
      borderTopRightRadius: '25px',
      backgroundColor: theme.palette.primary.contrastText,
      paddingBottom: '35px'
    },
    containerOdd: {
      backgroundColor: '#F3EAEC',
    },
    containerEven: {
      backgroundColor: '#FAF4F0',
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: "#484848"
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Cards = ({ 
  baseCurrency,
  currencies, 
  isLoading, 
  onClear, 
  onFlagClick, 
  value, 
}: CardsProps) => {
  const classes = useStyles({})

  return (
    <Box 
      component="div" 
      className={cn(
        classes.container, 
        { 
          [classes.containerEven]: currencies.length % 2 === 0,
          [classes.containerOdd]: currencies.length % 2 !== 0
        }
      )}
    >
      {
        currencies.map((data, index) => 
          <CurrencyCard 
            label={data.label}
            currency={data.currency}
            value={value}
            rates={data.rates}
            flagCode={data.flagCode}
            key={index}
            index={index}
            isLastCard={index === currencies.length - 1}
            onClear={onClear}
            onFlagClick={(currency: string) => onFlagClick(currency, baseCurrency)}
            baseCurrency={baseCurrency.currency}
          />
        )
      }
      {
        currencies.length === 0 &&
        <Typography variant="h6" className={classes.empty}>
          Let's start with adding a currency!
        </Typography>
      }
    <Backdrop 
      className={classes.backdrop} 
      open={isLoading}
    >
      <CircularProgress />
    </Backdrop>
    </Box>
  )
}

export { Cards }