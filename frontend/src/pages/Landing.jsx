import React, { lazy, useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { useMediaQuery } from '@uidotdev/usehooks'
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
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  // react-animated-cursor sets document.body.style.cursor = 'none' on mount
  // but never resets it on unmount, so the real cursor stays hidden after
  // navigating away from this page. Restore it ourselves on unmount.
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      <div className='bg-white text-black grid grid-cols-12 overflow-x-hidden'>
        {hasFinePointer && (
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
        )}
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