import { lazy } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { GoArrowUpRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
const Player = lazy(() => import('./Player'))
const ArrowDesign = lazy(() => import('./ArrowDesign'))

const Heading = styled.span`
  ${tw`hidden lg:block drop-shadow-xl text-8xl font-black opacity-80`}
  font-family: 'Courier New', monospace;
  font-weight: 1000;
  text-shadow:
    5px 5px,
    5px 5px,
    5px 5px;
  letter-spacing: 5px;
`
const HeadingMobile = styled.span`
  ${tw`lg:hidden drop-shadow-xl text-5xl font-black opacity-80`}
  font-family: 'Courier New', monospace;
  font-weight: 1000;
  text-shadow:
    3px 3px,
    3px 3px,
    3px 3px;
  letter-spacing: 5px;
`

const SubHeading = styled.div`
  ${tw`hidden lg:block drop-shadow-xl text-lg font-bold opacity-70 max-w-96 my-10`}
`
const Button = styled.button`
  ${tw`flex justify-center gap-1 pt-4 drop-shadow-2xl px-2 w-60 lg:h-14 font-bold text-sm lg:text-2xl text-black`}
`

const Hero = ({ apiResponse }) => {
  const navigate = useNavigate()
  return (
    <div className='ml-5 lg:ml-10 mt-24 lg:mt-28 grid grid-col-1 lg:grid-cols-2 px-0 lg:px-10 w-screen h-auto lg:h-screen'>
      <div>
        <div className='w-screen lg:w-full'>
          <ArrowDesign />
          <Heading>LIVE YOUR DAY WITH MUSIC</Heading>
          <HeadingMobile>LIVE YOUR DAY WITH MUSIC</HeadingMobile>
          <SubHeading>
            Make your day more lively with a variety of music that suits your
            mood, and get premium like features at no cost.
          </SubHeading>
        </div>
        <div className='block lg:hidden ml-12 h-auto w-2/3 my-5'>
          <img
            className='drop-shadow-2xl pointer-events-none select-none'
            src='/icons/hero_person.png'
            alt=''
          />
          <Player apiResponse={apiResponse} />
        </div>
        <div className='flex w-2/3 mt-4 lg:mt-0 lg:w-auto ml-2 lg:ml-0'>
          <Button onClick={() => navigate('/auth')} className='bg-[#CAFC00] shadow-xl shadow-[#CAFC00]'>
            GET PREMIUM <GoArrowUpRight size={30} />
          </Button>
          <Button onClick={() => navigate('/auth')}>
            TRY FOR FREE <GoArrowUpRight size={30} />
          </Button>
        </div>
      </div>
      <div className='hidden lg:block relative w-auto h-auto mx-5'>
        <img className='drop-shadow-2xl pointer-events-none select-none' src='/icons/hero_person.png' alt='' />
        <Player apiResponse={apiResponse} />
      </div>
    </div>
  )
}
//TODO: FIX LAYOUT AND ADD SKELETON
export default Hero
