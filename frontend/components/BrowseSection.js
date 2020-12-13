import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

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
  const [tabValue, setTabValue] = React.useState('0')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <section className={classes.root}>
      <Container maxWidth="md">
        <TabContext value={tabValue}>
          <Tabs
            className={classes.tabs}
            value="全部"
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
            全部
          </TabPanel>
          <TabPanel value="我聽見的">
            我聽見的
          </TabPanel>
          <TabPanel value="教義說明">
            教義說明
          </TabPanel>
        </TabContext>
      </Container>
    </section>
  )
}
