import React from 'react'
import numeral from 'numeral'

import { FlagIcon } from './FlagIcon'

import { 
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Theme
} from '@material-ui/core';
import {
  createMuiTheme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

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
    }
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
      height: '40px',
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
  })
);

type ElementProps = {
  value: number
  currency: string
  label: string,
  rates: number,
  index: number,
  flagCode: string,
  isLastCard: boolean
}

const Element = ({ label, currency, value, rates, index, flagCode, isLastCard }: ElementProps) => {
  const formatNumeral = '0,0.00'
  const cardClasses = cardStyles({})
  const formattedValue = numeral(value * rates).format(formatNumeral)
  const formattedRates = numeral(rates).format(formatNumeral)
  return (
    <Card className={cardClasses[index % 2 === 0? 'cardEven' : 'cardOdd']} variant="outlined" style={isLastCard ? { borderBottom: 'none' } : {}}>
      <CardContent className={cardClasses.box}>
        <FlagIcon code={flagCode} className={cardClasses.flag} size='2x' />
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
  label: string,
  rates: number,
  flagCode: string
}

type CardsProps = {
  value: number
  currencies: CardProps[]
}

const Cards = ({ value, currencies }: CardsProps) => {
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
          />
        )
      }
      {
        currencies.length === 0 &&
        <Typography variant="h6" className={classes.empty}>
          Let's start with adding a currency!
        </Typography>
      }
    </Box>
  )
}

export { Cards }