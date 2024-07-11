import React from 'react'
import Carousel from '../../homepage/Carousel'
import Skeleton from '../../homepage/Skeleton'

const RelatedContent = ({ relatedSongs, artistName }) => {
  return (
    <div className='mx-10 my-10'>
      <h1 className='mt-5 text-2xl font-bold'>More from {artistName || 'this artist'}</h1>
      {relatedSongs && <Carousel CarouselData={relatedSongs} typeId='3' />
        // <>
        //   <h1 className='w-36 h-5 rounded-md bg-white animate-pulse opacity-20 mt-5 text-2xl font-bold'></h1>
        //   <Skeleton />
        // </>
      }
    </div>
  )
}

export default RelatedContent