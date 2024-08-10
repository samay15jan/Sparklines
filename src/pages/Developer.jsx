import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@uidotdev/usehooks'
import SideBar from '../components/developer/SideBar'
import Target from '../components/developer/Target'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`grid grid-cols-5`}
`

const Developer = () => {
  const [path, setPath] = useState('')
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  function handlePath(path) {
    setPath(path)
  }

  useDocumentTitle('Sparklines - Developer')

  return (
    <>
      <Container>
        <SideBar activeMenu={handlePath} />
        <Target path={path} />
      </Container>
    </>
  )
}

export default Developer
