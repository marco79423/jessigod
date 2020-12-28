import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import BaseLayout from '../components/layouts/BaseLayout/BaseLayout'
import MainBanner from '../components/features/MainBanner'
import SayingsBrowser from '../components/features/SayingBrowser'

const useStyles = makeStyles((theme) => ({
  root: {},
  mainSection: {},
  browseSection: {},
}))

export default function Index() {
  const classes = useStyles()

  return (
    <BaseLayout className={classes.root}>
      <section className={classes.mainSection}>
        <MainBanner/>
      </section>
      <section className={classes.browseSection}>
        <SayingsBrowser/>
      </section>
    </BaseLayout>
  )
}
