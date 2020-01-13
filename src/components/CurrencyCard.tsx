import React from 'react'
import numeral from 'numeral'
import cn from 'classnames'
import { FORMAT_NUMERAL } from '../config'
import { FlagIcon } from './FlagIcon'
import theme from '../utils/AppTheme'
import { 
  Box,
  IconButton,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

type CurrencyCardProps = {
  /** Current base currency code represented in three letter code of `ISO 4217`. */
  baseCurrency: string
  /** Three letter currency code based on `ISO 4217`. */
  currency: string
  /** Two letter flag code of the currrency code based on `ISO 3166`. */
  flagCode: string
  /** Card position in the list, determine it's styling. */
  index: number
  /** If `true`, card position style will blend. */
  isLastCard: boolean
  /** The description of the currency. */
  label: string
  /** Function to be called when user click the `clear` button. */
  onClear: Function
  /** Function to be called when user click the flag. */
  onFlagClick: (currency: string) => void
  rates: number
  /** Current value number to be converted. */
  value: number
}


const useStyles = makeStyles(() =>
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
    card: {
      minWidth: 275,
      borderTopLeftRadius: '25px',
      borderTopRightRadius: '25px',
      marginTop: '-25px',
      position: 'relative',
      paddingBottom: '25px',
    },
    cardOdd: {
      backgroundColor: '#FAF4F0',
    },
    cardEven: {
      backgroundColor: '#F3EAEC',
    },
    cardLast: {
      borderBottom: 'none'
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

const CurrencyCard = ({ 
  baseCurrency,
  currency, 
  flagCode, 
  index, 
  isLastCard, 
  label, 
  onClear, 
  onFlagClick, 
  rates, 
  value, 
}: CurrencyCardProps) => {
  const classes = useStyles({})
  const formattedValue = numeral(value * rates).format(FORMAT_NUMERAL)
  const formattedRates = numeral(rates).format(FORMAT_NUMERAL)
  return (
    <Card 
      className={cn(
        classes.card,
        {
          [classes.cardEven]: index % 2 === 0,
          [classes.cardOdd]: index % 2 !== 0,
          [classes.cardLast]: isLastCard
        }
      )} 
      variant="outlined"
    >
      <IconButton data-testid={`removeCurrency${currency}`} onClick={() => onClear(currency)} className={classes.clearButton}>
        <HighlightOffIcon />
      </IconButton>
      <CardContent className={classes.box}>
        <IconButton onClick={() => onFlagClick(currency)} className={classes.flag}>
          <FlagIcon code={flagCode} className={classes.flag} size='2x' />
        </IconButton>
        <Box>
          <Typography className={classes.subTitle}>{ label }</Typography>
          <Box className={classes.currencyBox}>
            <Typography className={classes.title}>{ currency }</Typography>
            <Typography className={classes.value}>{ formattedValue }</Typography>
          </Box>
          <Typography className={classes.note}>{ `1 ${baseCurrency} = ${currency} ${formattedRates}` }</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export { CurrencyCard }