import React, { lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import tw from 'twin.macro'
const Homepage = lazy(() => import('../components/dashboard/Homepage/Homepage'))
const Search = lazy(() => import('../components/dashboard/SearchMenu/Search'))

const Container = styled.div`${tw`bg-[#0f0f0f] w-screen h-auto`}`

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
      <Search open={(open) => setShowSearch(open)}/> 
      {!showSearch && <Homepage />}

    </Container>
  )
}

export default Dashboard