import React from 'react'
import Carousel from '../../homepage/Carousel'
import Skeleton from '../../homepage/Skeleton'
import { useNavigate, useParams } from 'react-router-dom'

const RelatedContent = ({ relatedSongs, heading, artistName }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className='mx-5 my-10'>
      <div className='flex mt-5 justify-between'>
        <h1 className='text-2xl font-bold'>
          {heading ? heading : 'More from ' + artistName || 'this artist'}
        </h1>
        <h1
          className='mt-2 font-bold text-sm opacity-50 hover:opacity-60 hover:underline cursor-pointer'
          onClick={() =>
            navigate(`/dashboard/artist/${id}/discography`)
          }
        >
          See discography
        </h1>
      </div>
      {
        relatedSongs && (
          <Carousel
            CarouselData={relatedSongs}
            isArtistPage={true}
            typeId='3'
          />
        )
        // <>
        //   <h1 className='w-36 h-5 rounded-md bg-white animate-pulse opacity-20 mt-5 text-2xl font-bold'></h1>
        //   <Skeleton />
        // </>
      }
    </div>
  )
}

export default RelatedContent
