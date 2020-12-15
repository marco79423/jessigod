import Grid from '@material-ui/core/Grid'
import SayingCard from './SayingCard'
import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(1),
  }
}))


export default function Sayings({author}) {
  const classes = useStyles()

  const [nextPageIndex, setNextPageIndex] = useState(0)
  const [sayings, setSayings] = useState([])

  function loadMoreSayings() {
    fetch(`/api/sayings?pageIndex=${nextPageIndex}&author=${author}`)
      .then(res => res.json())
      .then(data => {
        setNextPageIndex((nextPageIndex + 1 <= Math.ceil(data.pagination.totalSize / data.pagination.pageSize) - 1) ? nextPageIndex + 1 : null)
        setSayings([...sayings, ...data.data])
      })
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
