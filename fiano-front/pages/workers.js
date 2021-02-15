import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Base from '../src/components/Base';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10)
  }
}))

export default function Index() {
  const classes = useStyles();
  return (
    <Base title="Workers">
      <Paper>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Workers
        </Typography>
      </Paper>
    </Base>
  );
}
