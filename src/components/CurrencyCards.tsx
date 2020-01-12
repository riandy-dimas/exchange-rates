import React from 'react'
import numeral from 'numeral'
import { CurrencyData } from '../types'
import { FORMAT_NUMERAL } from '../config'

import { FlagIcon } from './FlagIcon'

import { 
  Box,
  IconButton,
  Card,
  CardContent,
  Typography,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import {
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import theme from '../utils/AppTheme'

const defaultCSSProperties: { [x: string]: CSSProperties} = {
  card: {
    minWidth: 275,
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    marginTop: '-25px',
    position: 'relative',
    paddingBottom: '25px',
  },
  evenCard: {
    backgroundColor: '#F3EAEC',
  },
  oddCard: {
    backgroundColor: '#FAF4F0',
  }
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

const cardStyles = makeStyles(() =>
  createStyles({
    box: {
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '1fr 5fr',
      gridColumnGap: '15px',
      alignItems: 'center'
    },
    flag: {
      border: '1px solid #CCC',
      borderRadius: '15px',
      backgroundSize: 'cover',
      height: '50px',
      width: '50px',
      padding: 0,
      margin: 0,
      backgroundPosition: 'center',
      boxSizing: 'border-box'
    },
    subTitle: {
      color: theme.palette.secondary.dark,
      fontSize: '0.8em',
      margin: '5px 0'
    },
    title: {
      fontSize: '1em',
      color: '#484848'
    },
    value: {
      fontSize: '1.2em',
      fontWeight: 700,
      color: '#484848'
    },
    currencyBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 0'
    },
    cardOdd: {
      ...defaultCSSProperties.oddCard,
      ...defaultCSSProperties.card
    },
    cardEven: {
      ...defaultCSSProperties.evenCard,
      ...defaultCSSProperties.card
    },
    note: {
      fontSize: '10px',
      fontStyle: 'italic',
      textAlign: 'right',
      borderTop: `2px solid ${theme.palette.divider}`
    },
    clearButton: {
      position: 'absolute',
      right: 0
    }
  })
);

type ElementProps = {
  value: number
  currency: string
  label: string,
  rates: number,
  index: number,
  flagCode: string,
  isLastCard: boolean,
  onFlagClick: (currency: CurrencyData) => void
  onClear: Function
}

const Element = ({ label, currency, value, rates, index, flagCode, isLastCard, onClear, onFlagClick }: ElementProps) => {
  const cardClasses = cardStyles({})
  const formattedValue = numeral(value * rates).format(FORMAT_NUMERAL)
  const formattedRates = numeral(rates).format(FORMAT_NUMERAL)
  return (
    <Card className={cardClasses[index % 2 === 0? 'cardEven' : 'cardOdd']} variant="outlined" style={isLastCard ? { borderBottom: 'none' } : {}}>
      <IconButton onClick={() => onClear(currency)} className={cardClasses.clearButton}>
        <HighlightOffIcon />
      </IconButton>
      <CardContent className={cardClasses.box}>
        <IconButton onClick={() => onFlagClick({ currency, label, value, rates, flagCode })} className={cardClasses.flag}>
          <FlagIcon code={flagCode} className={cardClasses.flag} size='2x' />
        </IconButton>
        <Box>
          <Typography className={cardClasses.subTitle}>{ label }</Typography>
          <Box className={cardClasses.currencyBox}>
            <Typography className={cardClasses.title}>{ currency }</Typography>
            <Typography className={cardClasses.value}>{ formattedValue }</Typography>
          </Box>
          <Typography className={cardClasses.note}>{ `1 USD = ${currency} ${formattedRates}` }</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

type CardProps = {
  currency: string
  label: string
  rates: number
  flagCode: string
}

type CardsProps = {
  value: number
  currencies: CardProps[]
  isLoading: boolean
  baseCurrency: CurrencyData
  onClear: Function
  onFlagClick: (currency: CurrencyData, baseCurrency: CurrencyData) => void
}

const Cards = ({ value, currencies, onClear, isLoading, onFlagClick, baseCurrency }: CardsProps) => {
  const classes = useStyles({})

  return (
    <Box component="div" className={classes.container} style={{ backgroundColor: currencies.length % 2 === 0 ? defaultCSSProperties.oddCard.backgroundColor : defaultCSSProperties.evenCard.backgroundColor }}>
      {
        currencies.map((data, index) => 
          <Element 
            label={data.label}
            currency={data.currency}
            value={value}
            rates={data.rates}
            flagCode={data.flagCode}
            key={index}
            index={index}
            isLastCard={index === currencies.length - 1}
            onClear={onClear}
            onFlagClick={(currency: CurrencyData) => onFlagClick(currency, baseCurrency)}
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