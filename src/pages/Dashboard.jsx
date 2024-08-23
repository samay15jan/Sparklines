import React, { lazy, useEffect, useState } from 'react'
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
  ${tw`overflow-y-hidden bg-black text-white w-screen h-auto`}
`

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState('home')
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
  }, [currentPath, query])

  return (
    <Container>
      <div>
        <div className='grid grid-rows-8 w-screen h-screen'>
          <div className='flex row-span-9'>
            <MenuBar />
            <div className='grid grid-cols-12'>
              <MainScreen showMenu={showMenu} />
              <ArtistsScreen />
            </div>
          </div>
          <Playback />
        </div>
      </div>
    </Container>
  )
}

export default Dashboard
