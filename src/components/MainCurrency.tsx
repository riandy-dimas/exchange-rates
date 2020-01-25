import React, { useState } from 'react'
import numeral from 'numeral'
import cn from 'classnames'
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
  /** Set `true` to hide the main currency panel. */
  hide?: boolean
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
      alignItems: 'center',
      backgroundColor: theme.palette.primary.dark,
      border: `1px dashed ${theme.palette.primary.contrastText}`,
      borderRadius: '20px',
      boxSizing: 'border-box',
      color: theme.palette.primary.contrastText,
      display: 'grid',
      gridColumnGap: '15px',
      gridTemplateColumns: '1fr 5fr',
      height: '80px',
      margin: '20px 7%',
      padding: '10px 20px',
      transition: 'all ease 0.2s',
    },
    boxHidden: {
      border: 'none',
      height: 0,
      margin: 0,
      overflow: 'hidden',
      padding: 0,
    },
    boxFocused: {
      borderStyle: 'solid'
    },
    flag: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '15px',
      boxShadow: 'inset 1px 1px 1px #555',
      boxSizing: 'border-box',
      height: '50px',
      margin: 0,
      padding: 0,
      width: '50px',
    },
    subTitle: {
      color: theme.palette.secondary.main,
      fontSize: '0.8em',
      margin: '5px 0',
      textAlign: 'left',
    },
    title: {
      fontSize: '1em'
    },
    value: {
      fontSize: '1.2em',
      fontWeight: 700
    },
    currencyBox: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '5px 0',
    }
  })
);

const MainCurrency = ({ 
  currency, 
  flagCode,
  hide = false,
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
    <Paper 
      variant="elevation" 
      component="div" 
      className={cn(
        classes.box, 
        { 
          [classes.boxHidden]: hide, 
          [classes.boxFocused]: isFocused 
        })
      }
    >
      <IconButton data-testid="mainCurrencyFlag" onClick={() => onFlagClick(currency)} className={classes.flag}>
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
          onBlur={() => setIsFocused(false)}
        />
        </Box>
      </Box>
    </Paper>
  )
}

export { MainCurrency }