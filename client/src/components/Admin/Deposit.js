import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { displayDDMonthYYYY } from "../../helper/handleTime";
function preventDefault(event) {
  event.preventDefault();
}

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
{/*       <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}