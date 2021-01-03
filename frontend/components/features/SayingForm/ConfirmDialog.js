import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import Alert from '../../base/Alert'

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

export default function ConfirmDialog({open, confirmLabel, cancelLabel, onConfirm, onCancel}) {
  const classes = useStyles()
  const [AlertOpen, setAlert] = useState(false)

  const showAlert = () => {
    setAlert(true)
  }

  const hideAlert = () => {
    setAlert(false)
  }

  const confirm = async () => {
    try {
      onConfirm()
    } catch {
      showAlert()
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle disableTypography="false" className={classes.title}>你確定嗎？</DialogTitle>
        <DialogContent>
          <Typography className={classes.content}>西卡神正在看著你，你確定嗎？</Typography>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button variant="contained" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="contained" color="primary" onClick={confirm}>{confirmLabel}</Button>
        </DialogActions>
      </Dialog>

      <Alert
        message={'你做錯了什麼事，西卡神略帶怒意的看著你……'}
        open={AlertOpen}
        onClose={hideAlert}
      />
    </>
  )
}
