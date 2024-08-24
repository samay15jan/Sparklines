import { lazy, useState } from 'react'
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

const Landing = () => {
  const [response, setApiResponse] = useState('')

  return (
    <div className='bg-white text-black grid grid-cols-12'>
      <div className='w-auto col-span-11'>
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
