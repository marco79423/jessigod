import React, {useRef, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from '@material-ui/core'

import sayingManager from '../../../core/features/sayingManager'
import useSecretKey from '../../hooks/useSecretKey'
import useIsSecretKeyShown from '../../hooks/useIsSecretKeyShown'
import Alert from '../../base/Alert'
import useOrigins from '../../hooks/useOrigins'
import {Autocomplete} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(3),
  },
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
    marginRight: theme.spacing(1),
    width: 180,
  },
  contentSection: {
    marginTop: theme.spacing(1),
    width: theme.breakpoints.values.sm,
  },
  actionSection: {
    paddingRight: theme.spacing(3),
  }
}))

export default function ModifySayingDialog({id, defaultName, defaultContent, open, onClose}) {
  const classes = useStyles()
  const [errorOpen, setAlert] = useState(false)
  const {secretKey, isLoading} = useSecretKey()
  const {origins, isLoading: isOriginLoading} = useOrigins()
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
      <Dialog classes={{paper: classes.root}} maxWidth="md" open={open} onClose={onClose}>
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
              <Autocomplete
                freeSolo
                loading={isOriginLoading}
                options={origins}
                renderInput={(params) => (
                  <TextField {...params}
                             inputRef={originInputRef}
                             className={classes.nameInput}
                             variant="outlined"
                             margin="dense"
                             placeholder={'某位'}/>
                )}/>
              <Typography>說了</Typography>
            </div>
            <div className={classes.contentSection}>
              <TextField
                inputRef={contentInputRef}
                multiline
                fullWidth
                defaultValue={defaultContent}
                variant="outlined"
                rows={10}
                placeholder={'什麼名言高見？'}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className={classes.actionSection}>
          <Button variant="contained" onClick={onClose}>取消</Button>
          <Button variant="contained" color="primary" onClick={modifySaying}>修改</Button>
        </DialogActions>
      </Dialog>
      <Alert
        message={'你做錯了什麼事，西卡神略帶怒意的看著你……'}
        open={errorOpen}
        onClose={hideAlert}
      />
    </>
  )
}
