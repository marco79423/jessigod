import React, {useEffect} from 'react'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'

import AppBar from '../../base/AppBar'
import Copyright from '../../base/Copyright'
import ScrollTop from '../../base/utils/ScrollTop'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey[200],
  },
  scrollTop: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))


function printConsoleMessage() {
  console.log('%c%s', 'color: red; background: yellow; font-size: 72px;', '西卡神正在有點嚴肅的看著你……')
}

export default function BaseLayout({className, children}) {
  const classes = useStyles()

  useEffect(() => {
    printConsoleMessage()
  }, [])

  return (
    <div className={classNames(classes.root, className)}>
      {/*Header 部分*/}
      <header id="header">
        <AppBar logo="/images/logo@24x24.ico" title={'西卡神教福音'}/>
      </header>

      {/*主體部分*/}
      <main>
        {children}
      </main>

      {/*Footer 部分*/}
      <footer>
        <Copyright owner={'西卡神教'}/>
      </footer>
      <ScrollTop className={classes.scrollTop} selector="#header"/>
    </div>
  )
}
