import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => navigate('/auth')}>Get Started</button>
    </div>
  )
}

export default Landing