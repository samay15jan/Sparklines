import React, { useEffect } from 'react'
import Login from '../components/landing/header/Login'
import { useNavigate } from 'react-router-dom'
import { auth } from '../components/utils/firebase'

const Landing = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  // Redirect
  useEffect(() => {
    if(email) {
      navigate('/dashboard')
    }
  },[auth, email])

  return (
    <div>
        <Login />
    </div>
  )
}

export default Landing