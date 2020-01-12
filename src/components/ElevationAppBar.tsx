import React from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography 
} from '@material-ui/core';
import { 
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';


import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { ElevationScroll } from './ElevationScroll'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2)
    }
  }),
);

type Props = {
  /** Title of the AppBar */
  title: string
}

const ElevationAppBar: React.FC<Props> = ({ title }) => {
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