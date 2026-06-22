import { lazy, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
const MainScreen = lazy(
  () => import('../components/dashboard/mainScreen/MainScreen')
)
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
const MenuBar = lazy(() => import('../components/dashboard/menuBar/MenuBar'))
const ArtistsScreen = lazy(
  () => import('../components/dashboard/artistsScreen/ArtistsScreen')
)

const Container = styled.div`
  ${tw`overflow-hidden bg-black text-white w-screen min-h-screen`}
`

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState('home')
  const [showArtistsPanel, setShowArtistsPanel] = useState(false)
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const location = useLocation()
  let currentPath = location.pathname
  let { query, id } = useParams()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  useEffect(() => {
    switch (true) {
      case currentPath === '/dashboard':
        setShowMenu('home')
        break
      case currentPath === '/dashboard/recently-played':
        setShowMenu('recently-played')
        break
      case currentPath === '/dashboard/liked':
        setShowMenu('liked')
        break
      case currentPath === '/dashboard/playlists':
        setShowMenu('playlists')
        break
      case currentPath === `/dashboard/artist/${id}/discography`:
        setShowMenu('artist-discography')
        break
      case currentPath === '/dashboard/search' ||
        (query && currentPath.startsWith('/dashboard/search/')):
        setShowMenu('search')
        break
      case currentPath.startsWith('/dashboard/track/') ||
        (query && currentPath.startsWith('/dashboard/track/')):
        setShowMenu('track')
        break
      case currentPath.startsWith('/dashboard/playlist/') ||
        (query && currentPath.startsWith('/dashboard/playlist/')):
        setShowMenu('playlist')
        break
      case currentPath.startsWith('/dashboard/album/') ||
        (query && currentPath.startsWith('/dashboard/album/')):
        setShowMenu('album')
        break
      case currentPath.startsWith('/dashboard/artist/') ||
        (query && currentPath.startsWith('/dashboard/artist/')):
        setShowMenu('artist')
        break
      default:
        setShowMenu('home')
        break
    }
  }, [currentPath, query, id])

  return (
    <Container>
      <div className='relative flex h-screen w-screen flex-col overflow-hidden pb-32 lg:pb-0'>
        <div className='flex min-h-0 flex-1 flex-col lg:flex-row'>
          <MenuBar />
          <div className='grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12'>
            <MainScreen
              showMenu={showMenu}
              onOpenArtistsPanel={() => setShowArtistsPanel(true)}
            />
            <ArtistsScreen
              isOpen={showArtistsPanel}
              onClose={() => setShowArtistsPanel(false)}
            />
          </div>
        </div>
        <div className='fixed bottom-16 left-0 right-0 z-40 lg:static'>
          <Playback onOpenArtistsPanel={() => setShowArtistsPanel(true)} />
        </div>
      </div>
    </Container>
  )
}

export default Dashboard
