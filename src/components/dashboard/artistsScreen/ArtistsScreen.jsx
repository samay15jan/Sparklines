import React, { lazy, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { artistDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const Skeleton = lazy(() => import('./Skeleton'))

const ArtistsScreen = () => {
  const [currentSong, setcurrentSong] = useRQGlobalState('currentSong', null)
  const [artistsData, setArtistsData] = useState(null)
  const data = currentSong?.data
  const name = data && data?.name
  const fileUrl = data && data?.downloadUrl[4]?.link

  useEffect(() => {
    const listId = data && data?.primaryArtistsId
    if (listId) {
      const artistIdsArray = listId.split(',').map((id) => id.trim())
      const artistId = artistIdsArray[0]
      getData(artistId)
    }
  }, [data])

  async function getData(artistId) {
    const data = await artistDetails(artistId)
    setArtistsData(data)
  }

  const handleDownload = async () => {
    try {
      if (!fileUrl && !name) {
        return
      }
      const data = await fetch(fileUrl)
      const blob = await data.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className='overflow-scroll bg-[#0f0f0f] m-2 ml-1 rounded-lg h-auto col-span-4'>
      {data ? (
        <div className='p-4'>
          <h1 className='text-lg font-bold mb-4'>
            {data?.album?.name}
          </h1>
          <img
            className='rounded-lg'
            src={data?.image[2]?.link}
            alt=''
          />
          <div className='flex justify-between'>
            <div>
              <h1 className='text-3xl font-bold mt-4'>{name}</h1>
              <h1 className='text-sm font-medium opacity-80 mt-1'>
                {data?.primaryArtists}
              </h1>
            </div>
            <button onClick={handleDownload}>
              <LuDownload size={25} />
            </button>
          </div>
          {artistsData && (
            <div className='relative my-5 bg-[#242424] rounded-lg'>
              <h1 className='absolute m-5 text-md font-bold z-50'>
                About the artist
              </h1>
              <img
                className='rounded-t-lg inset-0 w-full h-72 object-cover object-center opacity-70'
                src={artistsData.data?.image[2]?.link}
                alt=''
              />
              <h1 className='text-lg font-bold pt-4 pl-4'>
                {artistsData.data?.name}
              </h1>
              <h1 className='text-sm font-medium opacity-80 mt-1 pl-4'>
                {data?.playCount} monthly listeners
              </h1>
              <h1 className='text-sm font-medium opacity-80 mt-1 pl-4 pb-4'>
                {artistsData.data?.followerCount} followers
              </h1>
            </div>
          )}
          <div className='relative my-5 bg-[#242424] rounded-lg'>
            <h1 className='text-md font-extrabold z-50 p-4'>Credits</h1>
            <h1 className='p-4 pt-1'>
              <div className='text-md font-semibold'>Performed by</div>
              <div className='text-sm font-medium opacity-80'>
                {data?.primaryArtists}
              </div>
            </h1>
            <h1 className='p-4 pt-1'>
              <div className='text-md font-semibold opacity-100'>
                Release Date
              </div>
              <div className='text-sm font-medium opacity-80'>
                {data?.releaseDate}
              </div>
            </h1>
            <h1 className='p-4 pt-1'>
              <div className='text-md font-semibold opacity-100'>Copyright</div>
              <div className='text-sm font-medium opacity-80'>
                {data?.copyright}
              </div>
            </h1>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default ArtistsScreen
