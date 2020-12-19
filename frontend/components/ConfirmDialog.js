import {makeStyles, useTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '1.4rem',
    fontWeight: 600,
  },
  content: {
    fontSize: '1.2rem',
  },
  actions: {
    padding: theme.spacing(2),
  }
}))

export default function ConfirmDialog({open, handleClose}) {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog className={classes.root} fullScreen={fullScreen} maxWidth="md" scroll="body" open={open}
            onClose={handleClose}>
      <DialogTitle disableTypography="false" className={classes.title}>你確定嗎？</DialogTitle>
      <DialogContent>
        <Typography className={classes.content}>西卡神正在看著你，你確定嗎？</Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" onClick={handleClose}>
          放棄
        </Button>
        <Button variant="contained" color="primary">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  )
}
