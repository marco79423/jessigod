import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1),
  },
}))

export default function Copyright({owner}) {
  const classes = useStyles()

  return (
    <Typography className={classes.root} color="textSecondary" align="center">
      {`Copyright © ${owner} ${new Date().getFullYear()}.`}
    </Typography>
  )
}
