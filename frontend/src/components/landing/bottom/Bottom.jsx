import tw from 'twin.macro'
import styled from 'styled-components'
import { RiLoginCircleFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const Heading = styled.span`
  ${tw`drop-shadow-md text-4xl font-black opacity-80`}
  font-family: 'Courier New', monospace;
  font-weight: 1000;
  text-shadow:
    2px 2px,
    2px 2px,
    2px 2px;
  letter-spacing: 0px;
`

const SubHeading = styled.div`
  ${tw`drop-shadow-xl text-lg font-bold opacity-70 mt-5`}
`

const Bottom = () => {
  const navigate = useNavigate()
  return (
    <div className='overflow-x-hidden lg:mt-20'>
      <img
        src='/icons/background.png'
        className='hidden lg:block absolute w-screen h-3/5 mt-20 opacity-30 drop-shadow-2xl right-10 pointer-events-none select-none'
      />
      <div className='relative lg:absolute ml-4 lg:right-80 flex pointer-events-none select-none'>
        <div className='mt-3 w-12 h-12 rounded-full bg-yellow-400' />
        <div className='w-6 h-12 rounded-r-full mt-3 bg-[#dad4f1]' />
        <div className='w-6 h-12 rounded-r-full mt-3 bg-[#dad4f1]' />
        <div className='font-semibold text-md mt-4 ml-2'>
          Access to millions of songs <br /> on <b>your fingertips...</b>
        </div>
      </div>
      <div className='block lg:hidden mt-5 ml-5 my-10 lg:my-0'>
        <Heading>
          A OpenSource Alternative <br /> for all your needs
        </Heading>
        <div className='flex lg:hidden relative left-32 lg:left-3/4 lg:bottom-40 gap-1'>
        <button
          onClick={() => navigate('/auth')}
          className='flex jusitfy-center gap-2 border-2 border-gray-500 rounded-full text-sm font-bold p-2 my-5 bg-white hover:bg-black hover:text-white transition-colors'
        >
          <div className='mt-1 ml-2'>START NOW</div>
          <RiLoginCircleFill className='mr-2' size={30} />
        </button>
        <div className='w-4 h-8 rounded-r-full mt-7 border-2 border-gray-500' />
        <div className='w-4 h-4 rounded-full mt-9 border-2 border-gray-500' />
      </div>
      </div>
      <div className='relative lg:left-72 flex gap-2 lg:gap-4 pointer-events-none select-none mx-5 lg:mx-5 my-5 lg:my-0'>
        <img
          src='/icons/female1.png'
          className='w-24 lg:w-44 h-24 lg:h-52 object-cover rounded-t-[100px] mt-24 rounded-b-[50px] bg-purple-300'
        />
        <div className='w-24 lg:w-44 h-40 lg:h-80 mt-14 lg:mt-0 rounded-t-[100px] rounded-b-[50px] bg-gradient-to-r from-purple-300 to-yellow-300' />
        <img
          src='/icons/female2.png'
          className='w-24 lg:w-44 h-32 lg:h-72 object-cover rounded-[100px] mt-40 bg-emerald-500'
        />
        <div className='w-24 lg:w-44 h-24 lg:h-44 rounded-full mt-28 bg-gradient-to-l from-purple-300 to-yellow-300' />
      </div>
      <div className='hidden lg:flex relative left-4 lg:left-3/4 lg:bottom-40 gap-1'>
        <button
          onClick={() => navigate('/auth')}
          className='flex jusitfy-center gap-2 border-2 border-gray-500 rounded-full text-sm font-bold p-2 my-5 bg-white hover:bg-black hover:text-white transition-colors'
        >
          <div className='mt-1 ml-2'>START NOW</div>
          <RiLoginCircleFill className='mr-2' size={30} />
        </button>
        <div className='w-4 h-8 rounded-r-full mt-7 border-2 border-gray-500' />
        <div className='w-4 h-4 rounded-full mt-9 border-2 border-gray-500' />
      </div>
      <div className='relative pointer-events-none select-none'>
        <div className='hidden lg:block absolute bottom-0 mb-5 left-16'>
          <Heading>
            A OpenSource Alternative <br /> for all your needs
          </Heading>
          <SubHeading>
            Create personalized playlists and find music you love, anytime,
            <br /> anywhere, on all your devices - <b>Exclusively for you.</b>
          </SubHeading>
        </div>
      </div>
    </div>
  )
}

export default Bottom
