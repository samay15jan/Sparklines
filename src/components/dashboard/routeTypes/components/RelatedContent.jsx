import React from 'react'
import Carousel from '../../homepage/Carousel'
import Skeleton from '../../homepage/Skeleton'

const RelatedContent = ({ relatedSongs, heading, artistName }) => {
  return (
    <div className='mx-5 my-10'>
      <h1 className='mt-5 text-2xl font-bold'>{heading ? heading : 'More from ' + artistName || 'this artist'}</h1>
      {relatedSongs && <Carousel CarouselData={relatedSongs} isArtistPage={true} typeId='3' />
        // <>
        //   <h1 className='w-36 h-5 rounded-md bg-white animate-pulse opacity-20 mt-5 text-2xl font-bold'></h1>
        //   <Skeleton />
        // </>
      }
    </div>
  )
}

export default RelatedContent