import React, { lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
const Homepage = lazy(() => import('../components/dashboard/homepage/Homepage'))
const Search = lazy(() => import('../components/dashboard/searchMenu/Search'))
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
const MenuBar = lazy(() => import('../components/dashboard/menuBar/MenuBar'))
const ArtistsScreen = lazy(() => import('../components/dashboard/artistsScreen/ArtistsScreen'))

const Container = styled.div`${tw`overflow-y-hidden bg-black text-white w-screen h-auto`}`

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState('false')
  const [response, setResponse] = useState()
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
      <div>
        <div className='grid grid-rows-8 w-screen h-screen'>
          <div className='flex row-span-9'>
            <MenuBar showSearch={(menu) => setShowSearch(menu)} />
            <div className='grid grid-cols-12'>
              {showSearch
                ? <Search />
                : <Homepage />
              }
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