import React, { lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import tw from 'twin.macro'
import UserProfile from '../components/dashboard/profile/UserProfile'
const Homepage = lazy(() => import('../components/dashboard/homepage/Homepage'))
const Search = lazy(() => import('../components/dashboard/searchMenu/Search'))

const Container = styled.div`${tw`bg-[#0f0f0f] text-white w-screen h-auto`}`

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState('false')
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
      <div className='flex'>
        <Search open={(open) => setShowSearch(open)}/>
        <UserProfile />
      </div>
      {!showSearch && <Homepage />}
    </Container>
  )
}

export default Dashboard