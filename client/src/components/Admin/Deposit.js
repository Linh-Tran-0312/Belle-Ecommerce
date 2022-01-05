import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { displayDDMonthYYYY } from "../../helper/handleTime";
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({total}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Today sales</Title>
      <Typography component="p" variant="h4">
       {total.toLocaleString()} VND
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {displayDDMonthYYYY(new Date())}
      </Typography>
    </React.Fragment>
  );
}