import Head from 'next/head'
import {GA4R} from 'ga-4-react'
import CssBaseline from '@material-ui/core/CssBaseline'

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>西卡神教福音 | 記錄每一句話，傳每一教徒</title>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="canonical" href="https://jessigod.marco79423.net/"/>
        <meta name="description" content="西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。"/>

        <meta name="twitter:url" content="https://jessigod.marco79423.net"/>
        <meta name="twitter:title" content="西卡神教福音"/>
        <meta name="twitter:description" content="西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。"/>
        <meta name="twitter:image" content="https://jessigod.marco79423.net/images/god.jpg"/>
        <meta name="twitter:creator" content="@marco79423"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="西卡神教福音"/>
        <meta property="og:description" content="西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。"/>
        <meta property="og:site_name" content="西卡神教福音"/>
        <meta property="og:url" content="https://jessigod.marco79423.net"/>
        <meta property="og:image" content="https://jessigod.marco79423.net/images/god.jpg"/>

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
