import React from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography 
} from '@material-ui/core';
import { 
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

import theme from '../utils/AppTheme'


import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ElevationScroll from '../utils/ElevationScroll'

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2)
    }
  }),
);

type ElevationAppBarProps = {
  /** Title of the AppBar */
  title: string
}

const ElevationAppBar: React.FC<ElevationAppBarProps> = ({ title }) => {
  const classes = useStyles()

  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <MonetizationOnIcon className={classes.icon} />
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

export { ElevationAppBar }