import React, { useEffect, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { songDetails, artistSongs, lyrics } from '../api/apiMethods'
import TsParticles from '../components/public/TsParticles'
import useRQGlobalState from '../utils/useRQGlobalState'
import LyricsScreen from '../components/dashboard/artistsScreen/LyricsScreen'
const Playback = lazy(() => import('../components/dashboard/playback/Playback'))

const Public = () => {
  let { id } = useParams()
  const [relatedSongs, setRelatedSongs] = React.useState(null)
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)
  const [currentLyrics, setCurrentLyrics] = React.useState(null)

  async function getData() {
    if (id) {
      const response = await songDetails(id)
      setCurrentSong(response?.data[0])

      if (currentSong?.data) {
        const artistsId = currentSong?.data?.primaryArtistsId?.split(',')
        const songName = currentSong?.data?.name?.replaceAll(' ', '+')
        const artistName = currentSong?.data?.primaryArtists
          ?.split(',')[0]
          ?.replaceAll(' ', '+')
        const getLyrics = await lyrics(songName, artistName)
        setCurrentLyrics(getLyrics)

        const albumsResponse = await artistSongs(artistsId[0], 1, 'latest')
        setRelatedSongs(albumsResponse?.data)
      }
    }
  }
console.log(currentLyrics)
  useEffect(() => {
    getData()
  }, [id])

  return (
    <div className='w-screen h-screen'>
      <TsParticles />
      {currentSong && (
        <div className='grid grid-cols-2'>
          <div className='flex justify-center'>
            <div>
              <img
                src={currentSong?.data?.image[2]?.link}
                className='relative z-2 mt-24 w-96 rounded-xl'
                alt=''
              />
              <h1 className='relative z-2 font-bold text-2xl justify-center flex mt-5'>
                {currentSong?.data?.name}
              </h1>
              <h1 className='font-semibold text-sm opacity-80 justify-center flex mt-1'>
                {currentSong?.data?.primaryArtists}
              </h1>
            </div>
            <LyricsScreen
              lyricsData={currentLyrics}
              songData={currentSong?.data}
              isPublic='true'
            />
          </div>
        </div>
      )}
      <Playback isPublic='true' />
    </div>
  )
}

export default Public
