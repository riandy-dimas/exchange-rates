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

const defaultCard: CSSProperties = {
  minWidth: 275,
  borderTopLeftRadius: '25px',
  borderTopRightRadius: '25px',
  marginTop: '-25px',
  position: 'relative',
  paddingBottom: '25px'
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
      marginTop: '50px',
      minHeight: 'calc(100vh - 231px)',
      paddingTop: '25px',
      borderTopLeftRadius: '25px',
      borderTopRightRadius: '25px',
      backgroundColor: theme.palette.primary.contrastText
    },
    cardOdd: {
      backgroundColor: '#FAF4F0',
      ...defaultCard
    },
    cardEven: {
      backgroundColor: '#F3EAEC',
      ...defaultCard
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
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
      height: '40px'
    },
    subTitle: {
      color: theme.palette.secondary.main,
      fontSize: '0.8em',
      margin: '5px 0'
    },
    title: {
      fontSize: '1em'
    },
    value: {
      fontSize: '1.2em',
      fontWeight: 700
    },
    currencyBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 0'
    }
  })
);

type ElementProps = {
  value: number
  currency: string
  label: string,
  rates: number,
  index: number,
  flagCode: string
}

const Element = ({ label, currency, value, rates, index, flagCode }: ElementProps) => {
  const formatNumeral = '0,0.00'
  const classes = useStyles({})
  const cardClasses = cardStyles({})
  const formattedValue = numeral(value * rates).format(formatNumeral)
  return (
    <Card className={classes[index % 2 === 0? 'cardEven' : 'cardOdd']} variant="outlined">
      <CardContent className={cardClasses.box}>
        <FlagIcon code={flagCode} className={cardClasses.flag} size='2x' />
        <Box>
          <Typography className={cardClasses.subTitle}>{ label }</Typography>
          <Box className={cardClasses.currencyBox}>
            <Typography className={cardClasses.title}>{ currency }</Typography>
            <Typography>{ formattedValue }</Typography>
          </Box>
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
    <Box component="div" className={classes.container}>
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
          />
        )
      }
    </Box>
  )
}

export { Cards }