import React, {useState} from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'

import sayingManager from '../../../core/features/sayingManager'
import SayingCard from './SayingCard'

const useStyles = makeStyles((theme) => ({
  root: {},
}))


export default function SayingsCardGrids({editorOnly = false, origin = ''}) {
  const classes = useStyles()

  const [data, setData] = useState({
    sayings: [],
    hasMoreItem: true,
    nextPageIndex: 0,
  })

  async function loadMoreSayings() {
    const [moreSayings, pagination] = await sayingManager.query(data.nextPageIndex, editorOnly, origin)
    const maxPageIndex = Math.ceil(pagination.totalSize / pagination.pageSize) - 1

    const hasMoreItem = data.nextPageIndex + 1 <= maxPageIndex
    setData({
      sayings: [...data.sayings, ...moreSayings],
      hasMoreItem: hasMoreItem,
      nextPageIndex: hasMoreItem ? data.nextPageIndex + 1 : undefined,
    })
  }

  return (
    <InfiniteScroll
      pageStart={-1}
      loadMore={loadMoreSayings}
      hasMore={data.hasMoreItem}
      loader={<div className="loader" key={0}>西卡神正在思考要不要理你……</div>}
    >
      <Grid className={classes.root} container spacing={3}>
        {data.sayings.map(saying => (
          <Grid item key={saying.id} xs={12} sm={6} md={4}>
            <SayingCard saying={saying}/>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
