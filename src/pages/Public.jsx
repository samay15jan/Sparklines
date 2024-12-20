import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { songDetails, lyrics } from '../api/apiMethods'
import TsParticles from '../components/public/TsParticles'
import useRQGlobalState from '../utils/useRQGlobalState'
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))
import ArtistsScreen from '../components/dashboard/artistsScreen/ArtistsScreen'

const Public = () => {
  let { id } = useParams()
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)
  const [currentLyrics, setCurrentLyrics] = useState(null)
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')

  async function getData() {
    if (id) {
      const response = await songDetails(id)
      setCurrentSong(response?.data[0])
      setPlaybackDetails([response?.data[0]])

      if (currentSong?.data) {
        const songName = currentSong?.data?.name?.replaceAll(' ', '+')
        const artistName = currentSong?.data?.primaryArtists
          ?.split(',')[0]
          ?.replaceAll(' ', '+')
        const getLyrics = await lyrics(songName, artistName)
        setCurrentLyrics(getLyrics)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  return (
    <div className='w-screen max-h-[100vh] overflow-hidden grid grid-col-2'>
      <TsParticles />
      {currentSong && (
        <div className='grid grid-cols-2 w-screen justify-between pt-20'>
          <div className='flex justify-center'>
            <div>
              <img
                src={currentSong?.data?.image[2]?.link}
                className='relative justify-center flex z-2 w-96 rounded-xl'
                alt=''
              />
              <h1 className='relative z-2 font-bold text-2xl justify-center flex mt-5'>
                {currentSong?.data?.name}
              </h1>
              <h1 className='font-semibold text-sm opacity-80 justify-center flex mt-1'>
                {currentSong?.data?.primaryArtists}
              </h1>
            </div>
          </div>
          <div className='flex w-full justify-center'>
            <div className='w-[380px] overflow-y-scroll'>
              <ArtistsScreen isPublic='true' />
            </div>
          </div>
        </div>
      )}
      <div className='mt-5' />
      <Playback isPublic='true' />
      <div className='flex gap-2 w-full justify-center mt-40' />
    </div>
  )
}

export default Public
