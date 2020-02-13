import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();
  const { onYesClick, onNoClick } = props;

  return (
    <div className={classes.root} style={{ textAlign: "center" }}>
      <Button variant="contained" color="secondary" onClick={onNoClick}>
        No
      </Button>
      <Button variant="contained" color="primary" onClick={onYesClick}>
        Si
      </Button>
    </div>
  );
}