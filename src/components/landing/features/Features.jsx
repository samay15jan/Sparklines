import React, { lazy } from 'react'
import { FaHeart, FaStar } from "react-icons/fa6"
import { GoArrowUpRight } from "react-icons/go"
import { RiCompassDiscoverLine } from "react-icons/ri"
const Heading = lazy(() => import('./Heading'))
const MenuCard = lazy(() => import('./MenuCard'))
const TopArtists = lazy(() => import('./TopArtists'))

const Features = ({ response }) => {
  return (
    <div className='mt-20 mx-5 ml-14 w-auto h-screen grid grid-cols-3'>
      <div>
        <Heading />
        <MenuCard
          image={response && response.data.albums[0].image[2].link}
          menuName='favourites'
          menuIcon1={<FaHeart />}
          menuIcon2={<GoArrowUpRight />}
          heading='Always your favourites'
          theme='light'
          subHeading='Craft personalized playlists with your favorite artists on an empty canvas.'
        />
      </div>
      <div>
        <div className='mt-20 w-96 mb-5 h-16 rounded-full border-2 border-black bg-black' />
        <div className='w-96 mb-5 h-16 rounded-full border-2 border-black bg-black' />
        <MenuCard
          image='/public/icons/bars.png'
          menuName='discovers'
          menuIcon1={<RiCompassDiscoverLine />}
          menuIcon2={<GoArrowUpRight />}
          heading='New albums & recognition'
          theme='dark'
          subHeading='Our database never stop growing, it means endless discovering.'
        />
      </div>
      <div>
        <TopArtists
          response={response}
          image={response && response.data.trending.songs[4].image[2].link}
          menuName='popular'
          menuIcon1={<FaStar />}
          menuIcon2={<GoArrowUpRight />}
          heading='Listen to top artists anywhere'
          subHeading='Listen to most popular, bright and trending musicians'
        />
      </div>
    </div>
  )
}

export default Features