import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  whom: {
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.whom} variant="h1">
          {saying.whom}
        </Typography>
        <Typography className={classes.content}>
          {saying.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          修改
        </Button>
        <Button size="small" color="primary">
          刪除
        </Button>
      </CardActions>
    </Card>
  )
}
