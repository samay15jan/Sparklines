import React, { lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import tw from 'twin.macro'
import UserProfile from '../components/dashboard/profile/UserProfile'
const Homepage = lazy(() => import('../components/dashboard/homepage/Homepage'))
const Search = lazy(() => import('../components/dashboard/searchMenu/Search'))
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
const MenuBar = lazy(() => import('../components/dashboard/menuBar/MenuBar'))
const ArtistsScreen = lazy(() => import('../components/dashboard/artistsScreen/ArtistsScreen'))

const Container = styled.div`${tw`overflow-y-hidden bg-black text-white w-screen h-auto`}`

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState('true')
  const [id, setId] = useState('null')
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='A music streaming platform' />
      </Helmet>
      <div>
        {showSearch &&
          <div className='grid grid-rows-8 w-screen h-screen'>
            <div className='flex row-span-9'>
              <MenuBar />
              <div className='grid grid-cols-10'>
                <Homepage playbackID={(id) => setId(id)} />
                <ArtistsScreen />
              </div>
            </div>
            <Playback playbackID={id} />
          </div>
        }
      </div>
    </Container>
  )
}

export default Dashboard