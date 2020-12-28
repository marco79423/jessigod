import React from 'react'
import {Container, Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import AboutGod from '../AboutGod'
import SayingForm from '../SayingForm'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}))


export default function MainBanner() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={2} alignContent="space-around" alignItems="center">
          <Grid item sm={6} xs={12}>
            <AboutGod/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <SayingForm/>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}
