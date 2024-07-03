import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCirclePlay } from "react-icons/fa6"
import { songDetails } from '../../../utils/apiMethods'
const Header = lazy(() => import('./components/Header'))

const Track = () => {
  const [data, setData] = useState()
  const { id } = useParams()
  const [dominantColor, setDominantColor] = useState()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    if (id) {
      localStorage.setItem('playback', id)
      const response = await songDetails()
      setData(response)
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes} min  ${seconds.toString().padStart(2, '0')} sec`
  }

  function artistNames(artists) {
    return artists.replaceAll(',', ' \u25CF')
  }

  return (
    <div style={dominantColor && { backgroundColor: `rgba(${dominantColor}, 0.7)`, boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)` }}>
      {data &&
        <div className='relative pt-24 ml-5'>
          <Header
            data={data}
            image={data.data[0]?.image[2].link}
            type='Single'
            name={data.data[0]?.name}
            artistName={artistNames(data.data[0]?.primaryArtists)}
            year={data.data[0]?.year}
            time={formatTime(data.data[0]?.duration)}
            dominantColor={(color) => setDominantColor(color)}
          />
          <FaCirclePlay
            size={55}
            color='#1ed760'
            className='absolute bottom-[-80px] drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-100 hover:scale-110'
          />
        </div>
      }
    </div>
  )
}

export default Track