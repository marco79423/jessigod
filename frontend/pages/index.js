import React, {useEffect} from 'react'
import dynamic from 'next/dynamic'

import AppBar from '../components/AppBar'
import MainSection from '../components/MainSection'
import BrowseSection from '../components/BrowseSection'
import Copyright from '../components/Copyright'


const ScrollTop = dynamic(() => import('../components/ScrollTop'), {ssr: false})

export default function Index() {

  useEffect(() => {
    console.log('%c%s', 'color: red; background: yellow; font-size: 72px;', '西卡神正在有點嚴肅的看著你……')
  }, [])

  return (
    <>
      <header id="header">
        <AppBar/>
      </header>
      <main>
        <MainSection/>
        <BrowseSection/>
      </main>
      <footer>
        <Copyright/>
      </footer>
      <ScrollTop selector="#header"/>
    </>
  )
}
