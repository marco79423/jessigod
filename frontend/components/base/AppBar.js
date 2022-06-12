import Image from 'next/image'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar as MuiAppBar, Toolbar} from '@material-ui/core'


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
    <MuiAppBar id="header" position="relative">
      <Toolbar>
        <Image src={logo} alt='logo' width={24} height={24}/>
        <h1 className={classes.title}>{title}</h1>
      </Toolbar>
    </MuiAppBar>
  )
}
