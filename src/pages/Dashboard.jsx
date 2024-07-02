import React, { lazy, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
const MainScreen = lazy(() => import('../components/dashboard/mainScreen/MainScreen'))
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
const MenuBar = lazy(() => import('../components/dashboard/menuBar/MenuBar'))
const ArtistsScreen = lazy(() => import('../components/dashboard/artistsScreen/ArtistsScreen'))

const Container = styled.div`${tw`overflow-y-hidden bg-black text-white w-screen h-auto`}`

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState('home')
  const [response, setResponse] = useState()
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  useEffect(() => {
    if (currentPath === '/dashboard') {
      setShowMenu('home')
    }
    if (currentPath === '/dashboard/search') {
      setShowMenu('search')
    }
    if (query && currentPath === `/dashboard/search/${query}`) {
      setShowMenu('search')
    }
  }, [currentPath])

  const menuItems = [
    {
      path: '/dashboard/playlist',
      name: 'playlist',
    },
    {
      path: '/dashboard/artist',
      name: 'artist',
    },
    {
      path: '/dashboard/track',
      name: 'track',
    },
    {
      path: '/dashboard/album',
      name: 'album',
    },
  ]

  return (
    <Container>
      <div>
        <div className='grid grid-rows-8 w-screen h-screen'>
          <div className='flex row-span-9'>
            <MenuBar />
            <div className='grid grid-cols-12'>
              <MainScreen showMenu={showMenu} />
              <ArtistsScreen response={response} />
            </div>
          </div>
          <Playback result={(response) => setResponse(response)} />
        </div>
      </div>
    </Container>
  )
}

export default Dashboard