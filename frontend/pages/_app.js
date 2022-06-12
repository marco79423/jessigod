import React from 'react'
import getConfig from 'next/config'
import {useGATracker} from '@paji-sdk/web'
import {useRouter} from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline'


function App({Component, pageProps}) {
  const {publicRuntimeConfig} = getConfig()
  const gaTracker = useGATracker(publicRuntimeConfig.gaTrackingCode)
  const router = useRouter()

  React.useEffect(() => {
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      gaTracker.pageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', gaTracker.pageView)
    return () => {
      router.events.off('routeChangeComplete', gaTracker.pageView)
    }
  }, [gaTracker.pageView, router.events])

  return (
    <>
      <CssBaseline/>
      <Component {...pageProps} />
    </>
  )
}

export default App
