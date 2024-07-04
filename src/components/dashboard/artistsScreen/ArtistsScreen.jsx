import React, { lazy, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { artistDetails } from '../../../utils/apiMethods'
const Skeleton = lazy(() => import('./Skeleton'))

const ArtistsScreen = ({ response }) => {
  const name = response && response.data[0].name
  const fileUrl = response && response.data[0].downloadUrl[4].link
  const [artistsData, setArtistsData] = useState(null)

  useEffect(() => {
    const listId = response && response.data[0].primaryArtistsId
    if (listId) {
      const artistIdsArray = listId.split(',').map((id) => id.trim())
      const artistId = artistIdsArray[0]
      getData(artistId)
    }
  }, [response])

  async function getData(artistId) {
    const data = await artistDetails(artistId)
    setArtistsData(data)
  }

  const handleDownload = async () => {
    try {
      if (!fileUrl && !name) {
        return
      }
      const response = await fetch(fileUrl)
      const blob = await response.blob()
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
      {response ? (
        <div className='p-4'>
          <h1 className='text-lg font-bold mb-4'>
            {response.data[0]?.album?.name}
          </h1>
          <img
            className='rounded-lg'
            src={response.data[0]?.image[2]?.link}
            alt=''
          />
          <div className='flex justify-between'>
            <div>
              <h1 className='text-3xl font-bold mt-4'>{name}</h1>
              <h1 className='text-sm font-medium opacity-80 mt-1'>
                {response.data[0]?.primaryArtists}
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
                {response.data[0]?.playCount} monthly listeners
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
                {response.data[0]?.primaryArtists}
              </div>
            </h1>
            <h1 className='p-4 pt-1'>
              <div className='text-md font-semibold opacity-100'>
                Release Date
              </div>
              <div className='text-sm font-medium opacity-80'>
                {response.data[0]?.releaseDate}
              </div>
            </h1>
            <h1 className='p-4 pt-1'>
              <div className='text-md font-semibold opacity-100'>Copyright</div>
              <div className='text-sm font-medium opacity-80'>
                {response.data[0]?.copyright}
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
