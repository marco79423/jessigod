import Image from 'next/image'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Toolbar, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    fontSize: '1.5rem',
    fontWeight: 600,
  },
}))


export default function AppBar({logo, title}) {
  const classes = useStyles()

  return (
    <MuiAppBar position="relative">
      <Toolbar>
        <Image src={logo} alt='logo' width={24} height={24}/>
        <Typography className={classes.title} variant="h1" color="inherit" noWrap>{title}</Typography>
      </Toolbar>
    </MuiAppBar>
  )
}
