import React from 'react';
import { 
  Avatar,
  Dialog, 
  DialogTitle, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
} from '@material-ui/core';
import { FlagIcon } from './FlagIcon'
import { SimplifiedCurrencyData } from '../types'
import { 
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

type CurrencyDialogProps = {
  /** List of currency that will be shown as list. */
  currencies: SimplifiedCurrencyData[]
  /** Function to be called when the dialog is closed, returns selected value if any. */
  onClose: Function
  /** If `true`, the dialog will be showed. */
  open: boolean
  /** Set the title of the dialog. */
  title: string
}

const useStyles = makeStyles(() =>
  createStyles({
    flag: {
      backgroundPosition: "center",
      backgroundSize: "cover",
      transform: "scale(2)"
    }
  })
);

const CurrencyDialog = (props: CurrencyDialogProps) => {
  const classes = useStyles()
  const { onClose, open, currencies, title } = props;

  const handleClose = () => {
    onClose();
  }

  const handleListItemClick = (value: string) => {
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{ title }</DialogTitle>
      <List>
        {currencies.map(currency => (
          <ListItem button onClick={() => handleListItemClick(currency.currency)} key={currency.currency}>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <FlagIcon className={classes.flag} code={currency.flagCode} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={currency.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export { CurrencyDialog }