import React, { useState } from 'react'
import numeral from 'numeral'
import { 
  Box,
  Paper,
  Typography,
  Input,
} from '@material-ui/core';
import { 
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

import { FlagIcon } from './FlagIcon'
import theme from '../utils/AppTheme'

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      height: '80px',
      border: `1px dashed ${theme.palette.primary.contrastText}`,
      color: theme.palette.primary.contrastText,
      borderRadius: '20px',
      padding: '10px 20px',
      boxSizing: 'border-box',
      margin: '20px 7%',
      display: 'grid',
      gridTemplateColumns: '1fr 5fr',
      gridColumnGap: '15px',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.dark
    },
    flag: {
      boxShadow: 'inset 2px 0px 0px #333',
      borderRadius: '15px',
      backgroundSize: 'cover',
      height: '40px',
      backgroundPosition: 'center',
      boxSizing: 'border-box'
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

type MainCurrencyProps = {
  value: number
  currency: string
  label: string
  onChange: Function
  onBlur: Function
}

const MainCurrency = ({ value, currency, label, onBlur, onChange }: MainCurrencyProps) => {
  const formatNumeral = '0,0.00'
  const [isFocused, setIsFocused] = useState(false)
  const classes = useStyles({});
  const localeValue = numeral(value).format(formatNumeral)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = (value: number) => {
    onChange(numeral(numeral(value).format(formatNumeral)).value())
    onBlur()
    setIsFocused(false)
  }

  return (
    <Paper variant="elevation" component="div" className={classes.box} style={{ borderStyle: isFocused ? 'solid' : 'dashed' }}>
      <FlagIcon code={'us'} className={classes.flag} size='2x' />
      <Box>
        <Typography className={classes.subTitle}>{ label }</Typography>
        <Box className={classes.currencyBox}>
          <Typography className={classes.title}>{ currency }</Typography>
          <Input 
            value={isFocused ? value : localeValue} 
            color="primary" 
            onChange={handleChange} 
            className={classes.value}
            inputProps={{
              style: {
                textAlign: 'right',
                color: theme.palette.primary.contrastText,
                padding: 0
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => handleBlur(value)}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export { MainCurrency }