import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Header = lazy(() => import('../components/landing/header/Header'))
const Hero = lazy(() => import('../components/landing/hero/Hero.jsx'))
const RightBar = lazy(() => import('../components/landing/rightBar/RightBar.jsx'))
const Features = lazy(() => import('../components/landing/features/Features.jsx'))
const Footer = lazy(() => import('../components/landing/footer/Footer.jsx'))

const Landing = () => {
  return (
    <div className='h-screen bg-white text-black grid grid-cols-12'>
      <Helmet>
        <title>Sparklines - A music Streaming Platform</title>
        <meta name='description' content='A Music Streaming Platform' />
      </Helmet>
      <div className='w-auto col-span-11'>
        <AutoNavigate location='/dashboard' />
        <div className='fixed z-50'>
          <Header />
        </div>
        <Hero />
        <Features />
        <Footer />
      </div>
      <RightBar />
    </div>
  )
}

export default Landing