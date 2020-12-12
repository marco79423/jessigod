import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'pink',
  },
}))

export default function GospelForm() {
  const classes = useStyles()

  return (
    <div className={classes.root}>GospelForm</div>
  )
}
