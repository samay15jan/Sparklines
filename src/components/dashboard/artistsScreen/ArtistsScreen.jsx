import React, { lazy, useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { MdOutlineLyrics, MdClose } from 'react-icons/md'
import { artistDetails, lyrics } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Skeleton = lazy(() => import('./Skeleton'))

const ArtistsScreen = () => {
  const [currentSong, setcurrentSong] = useRQGlobalState('currentSong', null)
  const [artistsData, setArtistsData] = useState(null)
  const [currentLyrics, setCurrentLyrics] = useState(null)
  const [isLyrics, showLyrics] = useState(false)
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
        const artistName = data?.primaryArtists?.split(",")[0]?.replaceAll(' ', '+')
        const getLyrics = await lyrics(name, artistName)
        setCurrentLyrics(getLyrics)
      }
    }
  }

  return (
    <AnimatePresence>
      <div className='overflow-scroll bg-[#0f0f0f] m-2 ml-1 rounded-lg h-auto col-span-4'>
        {isLyrics
          ? <motion.div
            key="lyrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Lyrics
              lyricsData={currentLyrics}
              songData={data}
              isLyrics={isLyrics}
              showLyrics={(e) => showLyrics(e)}
            />
          </motion.div>
          : <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {data ? (
              <div className='p-4'>
                <SongDetails
                  handleMenu={(type, id) => handleMenu(type, id)}
                  songData={data}
                  isLyrics={isLyrics}
                  showLyrics={(e) => showLyrics(e)}
                />
                {artistsData?.data &&
                  <ArtistDetails
                    handleMenu={(type, id) => handleMenu(type, id)}
                    artistData={artistsData?.data}
                    songData={data}
                  />
                }
                <Credits
                  handleMenu={(type, id) => handleMenu(type, id)}
                  songData={data}
                />
              </div>
            ) : (
              <Skeleton />
            )}
          </motion.div>
        }
      </div>
    </AnimatePresence>
  )
}

const SongDetails = ({ handleMenu, songData, isLyrics, showLyrics }) => {
  const artist = songData?.primaryArtists?.split(',')
  const artistId = songData?.primaryArtistsId?.replaceAll(' ', '').split(',')
  return (
    <>
      <h1
        className='text-lg font-bold mb-4 hover:underline cursor-pointer'
        onClick={() => handleMenu('album', songData?.album?.id)}
      >
        {songData?.album?.name}
      </h1>
      <img
        className='rounded-lg'
        src={songData?.image[2]?.link}
        alt=''
      />
      <div className='flex justify-between my-2'>
        <div>
          <h1
            className='text-3xl font-bold mt-4 hover:underline cursor-pointer'
            onClick={() => handleMenu('track', songData?.id)}
          >
            {songData?.name}</h1>
          <h1 className=' flex gap-1 text-sm font-medium opacity-80 mt-1'>
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
        <div className='mt-8'>
          <button
            onClick={() => showLyrics(!isLyrics)}
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

const DownloadURL = ({ songData }) => {
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
    <button onClick={handleDownload}>
      <LuDownload size={25} />
    </button>
  )
}

const ArtistDetails = ({ handleMenu, artistData, songData }) => {
  return (
    <>
      <div className='relative my-5 bg-[#242424] rounded-lg'>
        <h1 className='absolute z-10 m-5 text-md font-bold'>
          About the artist
        </h1>
        <img
          className='rounded-t-lg inset-0 w-full h-72 object-cover object-center opacity-70'
          src={artistData?.image[2]?.link}
          alt=''
        />
        <h1
          className='text-lg font-bold pt-4 pl-4 hover:underline cursor-pointer'
          onClick={() => handleMenu('artist', songData?.primaryArtistsId)}
        >
          {artistData?.name}
        </h1>
        <h1 className='text-sm font-medium opacity-80 mt-1 pl-4'>
          {songData?.playCount.toLocaleString()} monthly listeners
        </h1>
        <h1 className='text-sm font-medium opacity-80 mt-1 pl-4 pb-4'>
          {artistData?.followerCount.toLocaleString()} followers
        </h1>
      </div>
    </>
  )
}

const Credits = ({ handleMenu, songData }) => {
  const artist = songData?.primaryArtists?.split(',')
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
        <div className='text-md font-semibold opacity-100'>
          Release Date
        </div>
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

const Lyrics = ({ lyricsData, songData, isLyrics, showLyrics }) => {
  if (!lyricsData?.data?.lyrics) {
    return (
      <>
        <button className='relative top-0 opacity-60 font-bold bg-[#202020]' onClick={() => showLyrics(!isLyrics)}><MdClose size={30} /></button>
        <div className='text-xl mt-80 text-center w-auto'>
          Lyrics Not found !
        </div>
      </>
    )
  }

  const formatLyrics = (lyrics) => {
    const formattedLyrics = []
    const verses = lyrics.split(/\[(.*?)\]/).filter(Boolean)

    verses.forEach((verse, index) => {
      if (index % 2 === 0) {
        // Handle the label (Intro, Verse, Chorus, etc.)
        formattedLyrics.push(<div className="mt-5 opacity-50" key={`verse-${index}`}><strong>{verse}</strong></div>)
      } else {
        // Handle the actual lyrics
        const words = verse.trim().split(/\s+/)
        let line = []

        words.forEach((word, wordIndex) => {
          line.push(word)
          if (line.length >= 6) {
            formattedLyrics.push(<div className="mt-2" key={`line-${index}-${wordIndex}`}>{line.join(' ')}</div>)
            line = []
          }
        })

        if (line.length > 0) {
          formattedLyrics.push(<div className="mt-2" key={`line-${index}-end`}>{line.join(' ')}</div>)
        }
      }
    })

    return formattedLyrics
  }

  const lyrics = formatLyrics(lyricsData?.data?.lyrics)

  return (
    <>
      {lyricsData?.data &&
        <div>
          <div className='py-2 bg-[#202020] font-semibold text-sm'>
            <button className='absolute opacity-60 font-bold bg-[#202020]' onClick={() => showLyrics(!isLyrics)}><MdClose size={25} /></button>
            <h1 className='text-center'>{songData?.name}</h1>
          </div>
          <div className='m-10 text-2xl mt-4 text-center'>
            {lyrics}
          </div>
        </div>
      }
    </>
  )
}

export default ArtistsScreen