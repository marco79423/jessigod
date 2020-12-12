import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import Description from './Description'
import GospelForm from './GospelForm'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))

export default function MainSection() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={2} alignContent="space-around">
          <Grid item sm={6} xs={12}>
            <Description/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <GospelForm/>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
