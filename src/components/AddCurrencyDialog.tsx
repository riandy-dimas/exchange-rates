import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { FlagIcon } from './FlagIcon'

type Currency = {
  currency: string
  label: string
  flagCode: string
}

type Props = {
  onClose: Function
  open: boolean
  currencies: Currency[]
}

const AddCurrencyDialog = (props: Props) => {
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
              <Avatar>
                <FlagIcon code={currency.flagCode} />
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