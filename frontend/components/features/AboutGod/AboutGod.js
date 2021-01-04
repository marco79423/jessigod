import {useState} from 'react'
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import DetailDialog from './DetailDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    maxWidth: 400,
    margin: `${theme.spacing(1)} ${theme.spacing(4)}`,
  },
  media: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  header: {
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  content: {
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-wrap',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2),
  }
}))

export default function AboutGod() {
  const classes = useStyles()
  const [detailOpen, setDetailOpen] = useState(false)

  const handleDetailOpen = () => {
    setDetailOpen(true)
  }

  const handleDetailClose = () => {
    setDetailOpen(false)
  }

  const header = '你聽過西卡神嗎？'
  const content = '西卡神是博愛的，祂允許所有神、智者、甚至人渣都有平等說話的權利。\n\n西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。'

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          className={classes.media}
          image="/images/god.jpg"
          title="西卡神聖像"
        />
        <CardContent>
          <Typography className={classes.header} variant="subtitle1">{header}</Typography>
          <Typography className={classes.content}>{content}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={handleDetailOpen}>想知道更多</Button>
        </CardActions>
      </Card>
      <DetailDialog
        open={detailOpen}
        onClose={handleDetailClose}/>
    </>
  )
}
