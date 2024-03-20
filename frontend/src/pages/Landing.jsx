import React, { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))

const Landing = () => {
  const navigate = useNavigate()
  
  return (
    <div>
        <AutoNavigate location='/dashboard' />
        <button onClick={() => navigate('/auth')}>
          Get Started
        </button>
    </div>
  )
}

export default Landing