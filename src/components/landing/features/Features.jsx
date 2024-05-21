import React, { lazy } from 'react'
const Heading = lazy(() => import('./Heading'))
const Favourites = lazy(() => import('./Favourites'))
const TopArtists = lazy(() => import('./TopArtists'))

const Features = () => {
  return (
    <div className='mt-20 mx-5 ml-14 w-auto h-screen grid grid-cols-3'>
      <div>
        <Heading />
        <Favourites />
      </div>
      <div>
        <div className='mt-20 w-96 mb-5 h-16 rounded-full border-2 border-black bg-black' />
        <div className='w-96 mb-5 h-16 rounded-full border-2 border-black bg-black' />
        <Favourites />
      </div>
      <div>
        <TopArtists />
      </div>
    </div>
  )
}

export default Features