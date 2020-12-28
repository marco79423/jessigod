import React, {useRef, useState} from 'react'
import {Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import sayingManager from '../../../core/features/sayingManager'
import useSecretKey from '../../hooks/useSecretKey'
import useIsSecretKeyShown from '../../hooks/useIsSecretKeyShown'
import ConfirmDialog from './ConfirmDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(4),
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
  actionSection: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  }
}))

export default function SayingForm() {
  const classes = useStyles()
  const [confirmDialogOpen, setConfirmDialog] = useState(false)
  const {secretKey, isLoading} = useSecretKey()
  const {isSecretKeyShown} = useIsSecretKeyShown()
  const originInputRef = useRef()
  const contentInputRef = useRef()

  const showConfirmDialog = () => {
    setConfirmDialog(true)
  }

  const hideConfirmDialog = () => {
    setConfirmDialog(false)
  }

  const createSaying = async () => {
    const saying = {
      origin: originInputRef.current.value,
      content: contentInputRef.current.value,
    }
    await sayingManager.create(saying)
    window.location.reload()
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
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
              <TextField inputRef={originInputRef} className={classes.nameInput} variant="outlined" margin="dense"
                         placeholder={'誰說？'}/>
            </div>
            <div className={classes.contentSection}>
              <TextField
                inputRef={contentInputRef}
                multiline
                fullWidth
                variant="outlined"
                rows={10}
                placeholder={'說了什麼？'}
              />
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.actionSection}>
          <Button variant="contained" color="primary" size="large" onClick={showConfirmDialog}>送出給大家知道</Button>
        </CardActions>
      </Card>

      <ConfirmDialog
        open={confirmDialogOpen}
        confirmLabel={'新增'}
        cancelLabel={'取消'}
        onConfirm={createSaying}
        onCancel={hideConfirmDialog}/>
    </>
  )
}
