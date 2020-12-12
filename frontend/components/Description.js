import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'blue',
  },
}))

export default function Description() {
  const classes = useStyles()

  return (
    <div className={classes.root}>Description</div>
  )
}
