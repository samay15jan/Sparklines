import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDocumentTitle } from '@uidotdev/usehooks'

const Heading = styled.h1`
  ${tw`text-3xl font-medium`}
`
const GenButton = styled.button`
  ${tw`text-sm font-bold bg-black text-white rounded-md py-3 px-5`}
  transition: background 0.3s ease;
  &:hover {
    background: #db916a;
  }
`

const API = () => {
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
    }
  }, [userId])

  useDocumentTitle('Sparklines - Generate API Key')

  return (
    <div>
      <div className='flex justify-between'>
        <Heading>API Keys</Heading>
        <GenButton>Generate Key</GenButton>
      </div>
    </div>
  )
}

export default API
