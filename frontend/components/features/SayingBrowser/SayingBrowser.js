import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Tab, Tabs} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'

import SayingsCardGrids from './SayingsCardGrids'

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    marginTop: theme.spacing(3),
  }
}))


export default function SayingBrowser() {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('全部')

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
            <Tab value="西卡姐" label="西卡姐"/>
            <Tab value="Nabi 姐" label="Nabi 姐"/>
            <Tab value="我聽見的" label="我聽見的"/>
          </Tabs>
          <TabPanel value="全部">
            <SayingsCardGrids/>
          </TabPanel>
          <TabPanel value="西卡姐">
            <SayingsCardGrids origin={'西卡姐'}/>
          </TabPanel>
          <TabPanel value="Nabi 姐">
            <SayingsCardGrids origin={'Nabi 姐'}/>
          </TabPanel>
          <TabPanel value="我聽見的">
            <SayingsCardGrids editorOnly={true}/>
          </TabPanel>
        </TabContext>
      </Container>
    </section>
  )
}
