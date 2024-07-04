import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { songDetails } from '../../../utils/apiMethods'
const Header = lazy(() => import('./components/Header'))
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))

const Track = () => {
  const [data, setData] = useState()
  const { id } = useParams()
  const [dominantColor, setDominantColor] = useState()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    if (id) {
      const response = await songDetails(id)
      setData(response)
    }
  }

  function formatTime(time, type) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    if (type == 1) {
      return `${minutes} min ${seconds.toString().padStart(2, '0')} sec`
    }
    if (type == 2) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  function handleDate(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function artistNames(artists) {
    return artists.replaceAll(',', ' \u25CF')
  }

  return (
    <div>
      <div
        style={
          dominantColor && {
            backgroundColor: `rgba(${dominantColor}, 0.7)`,
            boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
          }
        }
      >
        {data && (
          <div className='relative pt-24 ml-5'>
            <Header
              data={data}
              image={data.data[0]?.image[2].link}
              type='Single'
              name={data.data[0]?.name}
              artistName={artistNames(data.data[0]?.primaryArtists)}
              year={data.data[0]?.year}
              time={formatTime(data.data[0]?.duration, 1)}
              dominantColor={(color) => setDominantColor(color)}
            />
            <PlayIcon id={data.data[0]?.id} />
          </div>
        )}
      </div>
      {data && (
        <SongList
          name={data.data[0]?.name}
          artistName={data.data[0]?.primaryArtists}
          time={formatTime(data.data[0]?.duration, 2)}
          releaseDate={handleDate(data.data[0]?.releaseDate)}
          copyright={data.data[0]?.copyright}
          explicit={data.data[0]?.explicitContent}
          id={data.data[0]?.id}
        />
      )}
    </div>
  )
}

export default Track
