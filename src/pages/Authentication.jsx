import React from 'react'
import Login from '../components/authentication/Login'
import Video from '../components/authentication/Video'

const Authentication = () => {
  return (
    <div className='lg:grid lg:grid-cols-2 w-screen h-screen overflow-hidden'>
        <Login />
        <Video />
    </div>
  )
}

export default Authentication