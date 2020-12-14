import Grid from '@material-ui/core/Grid'
import SayingCard from './SayingCard'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSayings} from '../helpers'


const useStyles = makeStyles((theme) => ({
  root: {
  },
  card: {
    margin: theme.spacing(1),
  }
}))
export default function Sayings() {
  const classes = useStyles()
  const {sayings, isLoading, isError} = useSayings()

  if (isError) {
    return <div>西卡神生氣了！請等會兒再試！</div>
  }

  if (isLoading) {
    return <div>西卡神正在思考要不要理你……</div>
  }

  return (
    <Grid className={classes.root} container spacing={3}>
      {sayings.map(saying => (
        <Grid item key={saying.id} xs={12} sm={6} md={4}>
          <SayingCard className={classes.card} saying={saying}/>
        </Grid>
      ))}
    </Grid>
  )
}
