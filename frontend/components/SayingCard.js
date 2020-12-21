import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import EditSayingDialog from './EditSayingDialog'

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
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
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
              <Button onClick={handleDialogOpen} size="small" color="primary">
                修改
              </Button>
              <Button size="small" color="primary">
                刪除
              </Button>
            </CardActions>
          ) : null
        }
      </Card>
      <EditSayingDialog id={saying.id}
                        defaultName={saying.origin}
                        defaultContent={saying.content}
                        open={dialogOpen}
                        handleClose={handleDialogClose}/>
    </>
  )
}
