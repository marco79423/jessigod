import React, {useRef, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, DialogActions, DialogContent, DialogTitle, TextField, Typography} from '@material-ui/core'

import sayingManager from '../../../core/features/sayingManager'
import useSecretKey from '../../hooks/useSecretKey'
import useIsSecretKeyShown from '../../hooks/useIsSecretKeyShown'
import Alert from '../../base/Alert'
import ResponsiveDialog from '../../base/ResponsiveDialog'

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

export default function ModifySayingDialog({id, defaultName, defaultContent, open, onClose}) {
  const classes = useStyles()
  const [errorOpen, setAlert] = useState(false)
  const {secretKey, isLoading} = useSecretKey()
  const {isSecretKeyShown} = useIsSecretKeyShown()
  const originInputRef = useRef()
  const contentInputRef = useRef()

  const showAlert = () => {
    setAlert(true)
  }

  const hideAlert = () => {
    setAlert(false)
  }

  const modifySaying = async () => {
    try {
      const saying = {
        id,
        origin: originInputRef.current.value,
        content: contentInputRef.current.value,
      }
      await sayingManager.modify(saying)
      window.location.reload()
    } catch {
      showAlert()
    }
  }

  return (
    <>
      <ResponsiveDialog className={classes.root} open={open} onClose={onClose}>
        <DialogTitle disableTypography="false" className={classes.title}>編輯我聽見的話</DialogTitle>
        <DialogContent>
          {isSecretKeyShown ? (
            <div className={classes.secretKeyPanel}>
              {isLoading ? null : (
                <Typography>我的密錀： {secretKey}</Typography>
              )}
            </div>
          ) : null}
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
          <Button variant="contained" onClick={onClose}>取消</Button>
          <Button variant="contained" color="primary" onClick={modifySaying}>修改</Button>
        </DialogActions>
      </ResponsiveDialog>
      <Alert
        message={'你做錯了什麼事，西卡神略帶怒意的看著你……'}
        open={errorOpen}
        onClose={hideAlert}
      />
    </>
  )
}
