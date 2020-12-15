import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import Sayings from './Sayings'
import Questions from './Questions'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  tabs: {
    marginTop: theme.spacing(3),
  }
}))


export default function BrowseSection() {
  const classes = useStyles()
  const [tabValue, setTabValue] = React.useState('全部')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <section className={classes.root}>
      <Container maxWidth="md">
        <TabContext value={tabValue}>
          <Tabs
            className={classes.tabs}
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="全部" label="全部"/>
            <Tab value="我聽見的" label="我聽見的"/>
            <Tab value="教義說明" label="教義說明"/>
          </Tabs>
          <TabPanel value="全部">
            <Sayings/>
          </TabPanel>
          <TabPanel value="我聽見的">
            <Sayings author="me"/>
          </TabPanel>
          <TabPanel value="教義說明">
            <Questions/>
          </TabPanel>
        </TabContext>
      </Container>
    </section>
  )
}
