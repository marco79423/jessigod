import {makeStyles, useTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Questions from './Questions'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  actions: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  }
}))

export default function DescriptionDetail({open, handleClose}) {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog className={classes.root} fullScreen={fullScreen} maxWidth="md" scroll="body" open={open}
            onClose={handleClose}>
      <DialogTitle disableTypography="false" className={classes.title}>教義說明</DialogTitle>
      <DialogContent>
        <Questions/>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" size="large" onClick={handleClose} color="primary">
          我瞭解了
        </Button>
      </DialogActions>
    </Dialog>
  )
}
