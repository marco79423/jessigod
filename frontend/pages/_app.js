import Head from 'next/head'
import {GA4R} from 'ga-4-react'
import CssBaseline from '@material-ui/core/CssBaseline'

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>西卡神教福音</title>

        <link rel="icon" href="/favicon.ico"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>
      <GA4R code='G-J5MYJMS7B7'>
        <Component {...pageProps} />
      </GA4R>
    </>
  )
}

export default App
