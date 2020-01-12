import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { FlagIcon } from './FlagIcon'

import { 
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    flag: {
      backgroundPosition: "center",
      backgroundSize: "cover",
      transform: "scale(2)"
    }
  })
);

type CurrencyProps = {
  currency: string
  label: string
  flagCode: string
}

type AddCurrencyDialogProps = {
  onClose: Function
  open: boolean
  currencies: CurrencyProps[]
}

const AddCurrencyDialog = (props: AddCurrencyDialogProps) => {
  const classes = useStyles()
  const { onClose, open, currencies } = props;

  const handleClose = () => {
    onClose();
  }

  const handleListItemClick = (value: string) => {
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select currency</DialogTitle>
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

export { AddCurrencyDialog }