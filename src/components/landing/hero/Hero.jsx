import React, { useState, useEffect } from 'react'
// import homepageData from '../../../utils/apiMethods'
import tw from 'twin.macro'
import styled from 'styled-components'
import { GoArrowUpRight } from "react-icons/go"

const Heading = styled.span`${tw`drop-shadow-2xl text-8xl font-black opacity-80`}
  font-family: 'Courier New', monospace;
  font-weight: 1000;
  text-shadow: 5px 5px, 5px 5px, 5px 5px;
  letter-spacing: 4px;
`

const SubHeading = styled.div`${tw`drop-shadow-xl text-lg font-bold opacity-70 max-w-96 my-10`}`
const Button = styled.button`${tw`flex justify-center gap-1 pt-4 my-10 drop-shadow-2xl w-56 h-14 font-bold text-2xl text-black`}`

const Hero = () => {
  /*
  TODO: FIX THE 
  const [data, setData] = useState()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const response = await homepageData()
    setData(response)
  }
 */

  return (
    <div className='grid grid-cols-2 px-10'>
      <div>
        <Heading>
          LIVE YOUR DAY WITH MUSIC
        </Heading>
        <SubHeading>
          Make your day more lively with a variety of music that suits your mood, and get premium like features at no cost.
        </SubHeading>
        <div className='flex'>
          <Button className='bg-[#CAFC00] shadow-xl shadow-[#CAFC00]'>GET PREMIUM <GoArrowUpRight size={30} /></Button>
          <Button className=''>TRY FOR FREE <GoArrowUpRight size={30} /></Button>
        </div>
      </div>
      <div className='relative w-auto h-auto'>
        <img className='drop-shadow-2xl' src='/icons/hero_person.png' alt="" />
        <div className='mt-[-50px] ml-28 w-96 h-32 rounded-full bg-gray-200 opacity-90 drop-shadow-sm'>
          <img className='absolute top-4 left-4 w-24 h-24 border-4 border-white rounded-full' src="data:image/jpeg;base64,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" alt="" />
          <div className='absolute top-8 left-32 grid grid-rows-2'>
            <div className='font-extrabold text-2xl'>Crossing Field</div>
            <div className='font-medium text-lg'>Lisa - Landscape</div>
          </div>
        </div>
      </div>
    </div>
  )
}
//TODO: FIX LAYOUT AND ADD SKELETON
export default Hero