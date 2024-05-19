import React, { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import RightBar from '../components/landing/rightBar.jsx/RightBar.jsx'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Header = lazy(() => import('../components/landing/header/Header'))
const Hero = lazy(() => import('../components/landing/hero/Hero.jsx'))

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className='h-screen bg-white text-black grid grid-cols-12'>
      <div className='w-auto col-span-11'>
        <AutoNavigate location='/dashboard' />
        <Header />
        <button onClick={() => navigate('/auth')}>
        </button>
        <Hero />
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  )
}

export default Landing