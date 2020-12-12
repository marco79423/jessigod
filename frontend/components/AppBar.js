import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}))

export default function AppBar() {
  const classes = useStyles()

  return (
    <MuiAppBar position="relative">
      <Toolbar>
        <img className={classes.icon} src="/images/logo@24x24.ico" alt='logo'/>
        <Typography className={classes.header} variant="h1" color="inherit" noWrap>西卡神教福音</Typography>
      </Toolbar>
    </MuiAppBar>
  )
}
