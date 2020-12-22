import Grid from '@material-ui/core/Grid'
import SayingCard from './SayingCard'
import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'
import {useSecretKey} from '../helpers'

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(1),
  }
}))


export default function Sayings({editorOnly = false}) {
  const classes = useStyles()
  const {secretKey, isLoading} = useSecretKey()
  const [nextPageIndex, setNextPageIndex] = useState(0)
  const [sayings, setSayings] = useState([])

  function loadMoreSayings() {
    fetch(`/api/sayings?pageIndex=${nextPageIndex}&editorOnly=${editorOnly}`, {
      headers: {
        'Authorization': `Jessi ${secretKey}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setNextPageIndex((nextPageIndex + 1 <= Math.ceil(data.pagination.totalSize / data.pagination.pageSize) - 1) ? nextPageIndex + 1 : null)
        setSayings([...sayings, ...data.data])
      })
  }

  if (isLoading) {
    return (
      <div className="loader">西卡神正在思考要不要理你……</div>
    )
  }

  return (
    <InfiniteScroll
      pageStart={-1}
      loadMore={loadMoreSayings}
      hasMore={nextPageIndex != null}
      loader={<div className="loader">西卡神正在思考要不要理你……</div>}
    >
      <Grid className={classes.root} container spacing={3}>
        {sayings.map(saying => (
          <Grid item key={saying.id} xs={12} sm={6} md={4}>
            <SayingCard className={classes.card} saying={saying}/>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
