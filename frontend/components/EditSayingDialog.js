import {makeStyles, useTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useSecretKey} from '../helpers'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import React, {useRef, useState} from 'react'
import axios from 'axios'
import {Alert} from '@material-ui/lab'
import {Snackbar} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  secretKeyPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  inputPanel: {},
  speakerSection: {
    display: 'flex',
    alignItems: 'center',
  },
  nameInput: {
    marginLeft: theme.spacing(1),
  },
  contentSection: {
    marginTop: theme.spacing(1),
    width: theme.breakpoints.values.sm,
  },
  actionSection: {}
}))

export default function EditSayingDialog({id, defaultName, defaultContent, open, handleClose}) {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [errorOpen, setErrorOpen] = useState(false)
  const {secretKey, isLoading} = useSecretKey()
  const originInputRef = useRef()
  const contentInputRef = useRef()

  const handleErrorOpen = () => {
    setErrorOpen(true)
  }

  const handleErrorClose = () => {
    setErrorOpen(false)
  }


  const handleConfirm = () => {
    axios.put(`/api/sayings/${id}`, {
      'origin': originInputRef.current.value,
      'content': contentInputRef.current.value,
    }, {
      headers: {
        Authorization: `Jessi ${secretKey}`
      }
    }).then(res => {
      window.location.reload()
    }).catch(err => {
      handleErrorOpen()
    })
  }

  return (
    <>
      <Dialog className={classes.root} fullScreen={fullScreen} maxWidth="md" scroll="body" open={open}
              onClose={handleClose}>
        <DialogTitle disableTypography="false" className={classes.title}>編輯我聽見的話</DialogTitle>
        <DialogContent>
          <div className={classes.secretKeyPanel}>
            {isLoading ? null : (
              <Typography>我的密錀： {secretKey}</Typography>
            )}
          </div>
          <div className={classes.inputPanel}>
            <div className={classes.speakerSection}>
              <Typography>你聽見</Typography>
              <TextField inputRef={originInputRef}
                         className={classes.nameInput}
                         defaultValue={defaultName}
                         variant="outlined"
                         margin="dense"
                         placeholder={'誰說？'}/>
            </div>
            <div className={classes.contentSection}>
              <TextField
                inputRef={contentInputRef}
                multiline
                fullWidth
                defaultValue={defaultContent}
                variant="outlined"
                rows={10}
                placeholder={'說了什麼？'}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className={classes.actionSection}>
          <Button variant="contained" onClick={handleClose}>
            取消
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            修改
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          你做錯了什麼事，西卡神略帶怒意的看著你……
        </Alert>
      </Snackbar>
    </>
  )
}
