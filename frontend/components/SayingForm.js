import {useRef, useState} from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {useSecretKey} from '../helpers'
import ConfirmDialog from './ConfirmDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
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
  const [confirmOpen, setConfirmOpen] = useState(false)
  const {secretKey, isLoading} = useSecretKey()
  const originInputRef = useRef()
  const contentInputRef = useRef()

  const handleConfirmDialogOpen = () => {
    setConfirmOpen(true)
  }

  const handleConfirmCancel = () => {
    setConfirmOpen(false)
  }

  const handleConfirm = () => {
    axios.post('/api/sayings', {
      'origin': originInputRef.current.value,
      'content': contentInputRef.current.value,
    }, {
      headers: {
        Authorization: `SIGOD ${secretKey}`
      }
    }).then(res => {
      window.location.reload()
    })
  }


  return (
    <>
      <div className={classes.root}>
        <div className={classes.secretKeyPanel}>
          {isLoading ? null : (
            <Typography>我的密錀： {secretKey}</Typography>
          )}
        </div>

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
          <div className={classes.actionSection}>
            <Button onClick={handleConfirmDialogOpen} variant="contained" color="primary" size="large">
              送出給大家知道
            </Button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        handleConfirm={handleConfirm}
        handleClose={handleConfirmCancel}/>
    </>
  )
}
