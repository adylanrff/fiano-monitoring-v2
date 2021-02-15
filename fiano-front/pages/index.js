import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Base from '../src/components/Base';
import withAuthentication from '../src/components/hoc/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10)
  }
}))

function DashboardPage() {
  const classes = useStyles();
  return (
    <Base title="Dashboard">
      <Typography variant="h2" component="h1" align="center" gutterBottom color="textPrimary" style={{ fontWeight: "bold" }}>
        Fiano Monitoring
      </Typography>
      <Box p={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card elevation={2} style={{ minHeight: '30vh' }}>
              Dashboard
                </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card elevation={2} style={{ minHeight: '30vh' }}>
              Dashboard
                </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card elevation={2} style={{ minHeight: '30vh' }}>
              Dashboard
                </Card>
          </Grid>
        </Grid>
      </Box>
    </Base>
  );
}

export default withAuthentication(DashboardPage)