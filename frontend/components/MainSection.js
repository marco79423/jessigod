import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'pink',
    height: 100,
  },
}))

export default function MainSection() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      MainSection
    </section>
  )
}
