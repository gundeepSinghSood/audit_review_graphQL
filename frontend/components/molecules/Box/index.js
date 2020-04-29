import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const {title} = props;
  const todayTime = new Date().toDateString();
  return (
    <React.Fragment>
      <Title>Info</Title>
      <Typography component="p" variant="h4" className="red-color upper-case">
        {title}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {todayTime}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}