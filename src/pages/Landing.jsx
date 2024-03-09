import React, { useEffect } from 'react'
import Login from '../components/landing/header/Login'
import { useNavigate } from 'react-router-dom'
import { auth } from '../components/utils/firebase'

const Landing = () => {
  const navigate = useNavigate()
  var userId = localStorage.getItem('userId')

  // Redirect
  useEffect(() => {
    if(userId) {
      navigate('/dashboard')
    }
  },[auth, userId])

  return (
    <div>
        <Login />
    </div>
  )
}

export default Landing