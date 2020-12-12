import AppBar from '../components/AppBar'
import MainSection from '../components/MainSection'
import BrowseSection from '../components/BrowseSection'


export default function Index() {
  return (
    <>
      <header>
        <AppBar/>
      </header>
      <main>
        <MainSection/>
        <BrowseSection/>
      </main>
      <footer>

      </footer>
    </>
  )
}
