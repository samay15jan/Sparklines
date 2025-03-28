import { lazy, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { MdOutlineLyrics, MdIosShare, MdClose } from 'react-icons/md'
import { TbCornerRightUp } from 'react-icons/tb'
import { artistDetails, lyrics } from '../../../api/apiMethods'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QueueList, QueueScreen } from './QueueScreen'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const LyricsScreen = lazy(() => import('./LyricsScreen'))
const Skeleton = lazy(() => import('./Skeleton'))
const Options = lazy(() => import('../routeTypes/components/Options'))
const ShareScreen = lazy(() => import('./ShareScreen'))

const ArtistsScreen = ({ isPublic }) => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const [playbackDetails] = useRQGlobalState('playbackQueue')
  const [artistsData, setArtistsData] = useState(null)
  const [currentLyrics, setCurrentLyrics] = useState(null)
  const [selectedScreen, setSelectedScreen] = useRQGlobalState(
    'contentPlay',
    'nowPlaying'
  )
  const data = currentSong?.data
  const navigate = useNavigate()

  function handleMenu(type, id) {
    navigate(`/dashboard/${type}/${id}`)
  }

  useEffect(() => {
    const listId = data && data?.primaryArtistsId
    if (listId) {
      const artistIdsArray = listId.split(',').map((id) => id.trim())
      const artistId = artistIdsArray[0]
      getData(artistId)
    }
  }, [data])

  async function getData(artistId) {
    const getArtistData = await artistDetails(artistId)
    if (getArtistData) {
      setArtistsData(getArtistData)
      if (data?.name && data?.primaryArtists) {
        const name = data?.name?.replaceAll(' ', '+')
        const artistName = data?.primaryArtists
          ?.split(',')[0]
          ?.replaceAll(' ', '+')
        const getLyrics = await lyrics(name, artistName)
        setCurrentLyrics(getLyrics)
      }
    }
  }

  return (
    <AnimatePresence>
      <div
        className={
          isPublic
            ? 'overflow-scroll bg-[#0f0f0f] rounded-lg h-auto col-span-4 select-none'
            : 'overflow-scroll bg-[#0f0f0f] m-2 ml-1 rounded-lg h-auto col-span-4 select-none'
        }
      >
        {/* display nowPlaying screen*/}
        {selectedScreen?.data === 'nowPlaying' && (
          <motion.div
            key='details'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {data ? (
              <div className={!isPublic && 'p-4'}>
                {!isPublic && (
                  <SongDetails
                    handleMenu={(type, id) => handleMenu(type, id)}
                    songData={data}
                    showMenu={(type) => setSelectedScreen(type)}
                  />
                )}
                <div className={isPublic && 'max-h-[50vh] overflow-y-scroll'}>
                  {artistsData?.data && (
                    <ArtistDetails
                      handleMenu={(type, id) => handleMenu(type, id)}
                      artistData={artistsData?.data}
                      songData={data}
                      isPublic={isPublic}
                    />
                  )}
                  <Credits
                    handleMenu={(type, id) => handleMenu(type, id)}
                    songData={data}
                  />
                  <NextQueue
                    showMenu={(type) => setSelectedScreen(type)}
                    queueData={playbackDetails?.data}
                    handleMenu={(type, id) => handleMenu(type, id)}
                  />
                </div>
              </div>
            ) : (
              <Skeleton />
            )}
          </motion.div>
        )}

        {/* display lyrics screen*/}
        {selectedScreen?.data === 'lyrics' && (
          <motion.div
            key='lyrics'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LyricsScreen
              lyricsData={currentLyrics}
              songData={data}
              showMenu={(type) => setSelectedScreen(type)}
              isPublic={isPublic}
            />
          </motion.div>
        )}

        {/* display queue screen*/}
        {selectedScreen?.data === 'queue' && (
          <motion.div
            key='lyrics'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <QueueScreen
              showMenu={(type) => setSelectedScreen(type)}
              handleMenu={(type, id) => handleMenu(type, id)}
              isPublic={isPublic}
            />
          </motion.div>
        )}
      </div>

      {/* handle recently played automatically */}
      {!isPublic && currentSong?.data && (
        <Options
          type='recentlyPlayed'
          autoUpdate={true}
          id={currentSong?.data?.id}
          image={currentSong?.data?.image[2]?.link}
          name={currentSong?.data?.name}
          artist={currentSong?.data?.primaryArtists?.split(',')?.slice(0, 1)[0]}
          artistId={
            currentSong?.data?.primaryArtistsId
              ?.replaceAll(' ', '')
              ?.split(',')[0]
          }
          album={currentSong?.data?.album?.name}
          albumId={currentSong?.data?.album?.id}
          duration={currentSong?.data?.duration}
        />
      )}
    </AnimatePresence>
  )
}

const SongDetails = ({ handleMenu, songData, showMenu }) => {
  const [showQR, setShowQR] = useState(false)
  const [url, setUrl] = useState(
    'https://sparklines.vercel.app/'
  )
  const artist = songData?.primaryArtists?.split(',').slice(0, 2)
  const artistId = songData?.primaryArtistsId?.replaceAll(' ', '').split(',')

  useEffect(() => {
    setUrl(
      `https://sparklines.vercel.app/public/${songData?.id}`
    )
  }, [songData])

  return (
    <>
      <div className='flex justify-between'>
        <h1
          className='text-lg font-bold mb-4 hover:underline cursor-pointer'
          onClick={() => handleMenu('album', songData?.album?.id)}
        >
          {songData?.album?.name}
        </h1>
        <button
          onClick={() => setShowQR(!showQR)}
          className='mb-4 bg-[#0f0f0f]'
        >
          {showQR ? <MdClose size={28} /> : <MdIosShare size={28} />}
        </button>
      </div>
      {showQR ? <ShareScreen newURL={url} /> : null}
      <img
        className={showQR ? 'rounded-lg opacity-50' : 'rounded-lg'}
        src={songData?.image[2]?.link}
        alt=''
      />
      {showQR && (
        <div className='flex justify-center text-xl font-semibold opacity-80 mt-4'>
          <div
            className='cursor-pointer hover:opacity-50 opacity-100 underline'
            onClick={() => navigator.clipboard.writeText(url)}
          >
            Copy
          </div>
          <h1 className='ml-1'>or Scan the QR Code</h1>
          <TbCornerRightUp size={28} />
        </div>
      )}

      <div className='flex justify-between my-2'>
        <div>
          <h1
            className='text-3xl font-bold mt-4 hover:underline cursor-pointer'
            onClick={() => handleMenu('track', songData?.id)}
          >
            {songData?.name}
          </h1>
          <h1 className='flex gap-1 text-sm font-medium opacity-80 mt-1'>
            {artist.map((name, index) => (
              <h1
                className='hover:underline cursor-pointer'
                key={index}
                onClick={() => handleMenu('artist', artistId[index])}
              >
                {name}
              </h1>
            ))}
          </h1>
        </div>
        <div className='flex mt-8'>
          <Options
            type='liked'
            id={songData?.id}
            image={songData?.image[2]?.link}
            name={songData?.name}
            artist={songData?.primaryArtists?.split(',')?.slice(0, 1)[0]}
            artistId={
              songData?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]
            }
            album={songData?.album?.name}
            albumId={songData?.album?.id}
            duration={songData?.duration}
          />
          <Options
            type='customPlaylists'
            id={songData?.id}
            image={songData?.image[2]?.link}
            name={songData?.name}
            artist={songData?.primaryArtists?.split(',')?.slice(0, 1)[0]}
            artistId={
              songData?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]
            }
            album={songData?.album?.name}
            albumId={songData?.album?.id}
            duration={songData?.duration}
          />
          <button
            onClick={() => showMenu('lyrics')}
            className='mr-5 bg-[#0f0f0f]'
          >
            <MdOutlineLyrics className='pt-1' size={28} />
          </button>
          <DownloadURL songData={songData} />
        </div>
      </div>
    </>
  )
}

export const DownloadURL = ({ songData, isPublic }) => {
  const name = songData?.name
  const fileUrl = songData?.downloadUrl[4]?.link

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
    <button onClick={handleDownload} className={isPublic && 'mb-2'}>
      <LuDownload size={isPublic ? 18 : 25} />
    </button>
  )
}

const ArtistDetails = ({ handleMenu, artistData, songData, isPublic }) => {
  return (
    <>
      <div
        className={
          isPublic
            ? 'relative bg-[#242424] rounded-lg'
            : 'relative my-5 bg-[#242424] rounded-lg'
        }
      >
        <h1 className='absolute z-10 m-5 text-md font-bold'>
          About the artist
        </h1>
        <img
          className='rounded-t-lg z-10 inset-0 w-full h-72 object-cover object-center opacity-70'
          src={artistData?.image[2]?.link}
          alt=''
        />
        <h1
          className='text-lg font-bold pt-4 pl-4 hover:underline cursor-pointer'
          onClick={() => handleMenu('artist', artistData?.id)}
        >
          {artistData?.name}
        </h1>
        <h1 className='text-sm font-medium opacity-80 mt-1 pl-4'>
          {songData?.playCount?.toLocaleString()} monthly listeners
        </h1>
        <h1 className='text-sm font-medium opacity-80 mt-1 pl-4 pb-4'>
          {artistData?.followerCount?.toLocaleString()} followers
        </h1>
      </div>
    </>
  )
}

const Credits = ({ handleMenu, songData }) => {
  const artist = songData?.primaryArtists?.split(',').slice(0, 2)
  const artistId = songData?.primaryArtistsId?.replaceAll(' ', '').split(',')
  return (
    <div className='relative my-5 bg-[#242424] rounded-lg'>
      <h1 className='text-md font-extrabold z-50 p-4'>Credits</h1>
      <h1 className='p-4 pt-1'>
        <div className='text-md font-semibold'>Performed by</div>
        <div className='flex gap-1 text-sm font-medium opacity-80'>
          {artist.map((name, index) => (
            <h1
              className='hover:underline cursor-pointer'
              key={index}
              onClick={() => handleMenu('artist', artistId[index])}
            >
              {name}
            </h1>
          ))}
        </div>
      </h1>
      <h1 className='p-4 pt-1'>
        <div className='text-md font-semibold opacity-100'>Release Date</div>
        <div className='text-sm font-medium opacity-80'>
          {songData?.releaseDate}
        </div>
      </h1>
      <h1 className='p-4 pt-1'>
        <div className='text-md font-semibold opacity-100'>Copyright</div>
        <div className='text-sm font-medium opacity-80'>
          {songData?.copyright}
        </div>
      </h1>
    </div>
  )
}

const NextQueue = ({ showMenu, queueData, handleMenu }) => {
  if (!queueData[1]) return
  return (
    <>
      <div className='relative pb-1 bg-[#242424] rounded-lg'>
        <div className='flex justify-between'>
          <h1 className='text-md font-bold p-4'>Next in queue</h1>
          <h1
            className='px-4 mt-5 text-sm font-bold opacity-60 hover:underline cursor-pointer'
            onClick={() => showMenu('queue')}
          >
            Open queue
          </h1>
        </div>
        <QueueList
          queueData={queueData}
          artists={queueData[1]?.primaryArtists}
          artistsIds={queueData[1]?.primaryArtistsId}
          image={queueData[1].image[1]?.link}
          id={queueData[1]?.id}
          name={queueData[1]?.name}
          handleMenu={handleMenu}
        />
      </div>
    </>
  )
}

export default ArtistsScreen
