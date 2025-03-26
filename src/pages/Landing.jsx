import React, { lazy, useState } from 'react'
import { ReactLenis } from 'lenis/react'
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
    <ReactLenis root options={{ lerp: 0.15 }}>
      <div className='bg-white text-black grid grid-cols-12 overflow-x-hidden'>
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
            className='pointer-events-none select-none opacity-60 absolute w-screen h-screen object-cover'
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
    </ReactLenis>
  )
}

export default Landing
