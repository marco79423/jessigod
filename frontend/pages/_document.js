import React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheets} from '@material-ui/core'


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render() {
    return (
      <Html lang="zh-Hant">
        <Head>
          <title>西卡神教福音 | 記錄每一句話，傳每一教徒</title>

          <link rel="icon" href="/favicon.ico"/>
          <link rel="canonical" href="https://jessigod.marco79423.net/"/>
          <meta name="description" content="西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。"/>
          <meta httpEquiv="content-language" content="zh_Hant"/>

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
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
