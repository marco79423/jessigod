import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'purple',
  },
}))

export default function BrowseSection() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      BrowseSection
    </section>
  )
}
