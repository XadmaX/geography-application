import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const ProgressBar = ({ classes }) => (
  <div className={classes.root}>
    <LinearProgress />
  </div>
);

export default withStyles(styles)(ProgressBar);
