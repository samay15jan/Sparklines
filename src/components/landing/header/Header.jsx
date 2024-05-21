import React, { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
const LogoContainer = lazy(() => import('./LogoContainer'))
const MainLogo = lazy(() => import('./MainLogo'))

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='p-5 grid grid-cols-4 w-auto'>
      <div className='flex gap-4'>
        <LogoContainer text='AION' image='/icons/Logo.png' />
        <LogoContainer text='Menu' whiteBg='true' />
      </div>
      <MainLogo text='Sparklines' />
      <div className='flex justify-center gap-4'>
        <LogoContainer text='Github' />
        <LogoContainer text='Login' whiteBg='true' navigation={(location) => navigate(location)} />
      </div>
    </div>
  )
}

export default Header