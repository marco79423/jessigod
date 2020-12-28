import React, {useState} from 'react'
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import ModifySayingDialog from './ModifySayingDialog'
import DeleteSayingDialog from './DeleteSayingDialog'


const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    fontSize: '1.5rem',
    fontWeight: 400,
  },
  content: {
    marginTop: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2),
  }
}))

export default function SayingCard({saying}) {
  const classes = useStyles()

  const [modifyDialogOpen, setModifyDialog] = useState(false)
  const [deleteDialogOpen, setDeleteDialog] = useState(false)

  const showModifyDialog = () => {
    setModifyDialog(true)
  }

  const hideModifyDialog = () => {
    setModifyDialog(false)
  }

  const showDeleteDialog = () => {
    setDeleteDialog(true)
  }

  const hideDeleteDialog = () => {
    setDeleteDialog(false)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.name} variant="h1">
            {saying.origin}
          </Typography>
          <Typography className={classes.content}>
            {saying.content}
          </Typography>
        </CardContent>
        {
          saying.editable ? (
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" onClick={showModifyDialog}>修改</Button>
              <Button size="small" color="primary" onClick={showDeleteDialog}>刪除</Button>
            </CardActions>
          ) : null
        }
      </Card>

      <ModifySayingDialog
        id={saying.id}
        defaultName={saying.origin}
        defaultContent={saying.content}
        open={modifyDialogOpen}
        onClose={hideModifyDialog}/>

      <DeleteSayingDialog
        id={saying.id}
        open={deleteDialogOpen}
        onClose={hideDeleteDialog}/>

    </>
  )
}
