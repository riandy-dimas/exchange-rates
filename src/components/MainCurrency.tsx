import React, { useState } from 'react'
import numeral from 'numeral'
import { 
  Box,
  Paper,
  Typography,
  IconButton,
  Input,
} from '@material-ui/core';
import { 
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import { FlagIcon } from './FlagIcon'
import theme from '../utils/AppTheme'
import { FORMAT_NUMERAL } from '../config'

type MainCurrencyProps = {
  /** Three letter currency code based on `ISO 4217`. */
  currency: string
  /** Two letter flag code of the currrency code based on `ISO 3166`. */
  flagCode: string
  /** The description of the currency. */
  label: string
  /** Function to be called when changing the input value. */
  onChange: Function
  /** Function to be called when user click the flag. */
  onFlagClick: Function
  /** Current to be converted number value. */
  value: number
}

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
      borderRadius: '15px',
      backgroundSize: 'cover',
      height: '50px',
      width: '50px',
      padding: 0,
      margin: 0,
      backgroundPosition: 'center',
      boxSizing: 'border-box',
      boxShadow: 'inset 1px 1px 1px #555'
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

const MainCurrency = ({ 
  currency, 
  flagCode,
  label, 
  onChange, 
  onFlagClick, 
  value, 
}: MainCurrencyProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const classes = useStyles({});
  const localeValue = numeral(value).format(FORMAT_NUMERAL)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Paper variant="elevation" component="div" className={classes.box} style={{ borderStyle: isFocused ? 'solid' : 'dashed' }}>
        <IconButton onClick={() => onFlagClick(currency)} className={classes.flag}>
          <FlagIcon code={flagCode} className={classes.flag} size='2x' />
        </IconButton>      
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
          />
        </Box>
      </Box>
    </Paper>
  )
}

export { MainCurrency }