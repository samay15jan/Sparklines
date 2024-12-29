import React, { lazy, useState } from 'react'
import Background from '../../public/backgrounds/background.png'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Header = lazy(() => import('../components/landing/header/Header'))
const Hero = lazy(() => import('../components/landing/hero/Hero.jsx'))
const Features = lazy(
  () => import('../components/landing/features/Features.jsx')
)
const Bottom = lazy(() => import('../components/landing/bottom/Bottom.jsx'))
const Footer = lazy(() => import('../components/landing/footer/Footer.jsx'))
const RightBar = lazy(
  () => import('../components/landing/rightBar/RightBar.jsx')
)
import AnimatedCursor from 'react-animated-cursor'

const Landing = () => {
  const [response, setApiResponse] = useState('')

  return (
    <div className='bg-white text-black grid grid-cols-12'>
      <AnimatedCursor
        innerSize={20}
        outerSize={10}
        color='225, 185, 20'
        outerAlpha={0.4}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />
      <div className='select-none w-auto col-span-11'>
        <img
          src={Background}
          className='opacity-60 absolute w-screen h-screen'
          alt=''
        />
        <AutoNavigate location='/dashboard' />
        <div className='fixed z-50'>
          <Header />
        </div>
        <Hero apiResponse={(data) => setApiResponse(data)} />
        <Features response={response} />
        <Bottom />
        <Footer />
      </div>
      <RightBar />
    </div>
  )
}

export default Landing
