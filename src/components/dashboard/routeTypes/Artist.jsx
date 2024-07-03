import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  artistDetails,
  artistSongs,
  artistAlbums,
  artistRecommendations
} from '../../../utils/apiMethods'
const Header = lazy(() => import('./components/Header'))

const artist = () => {
  const [data, setData] = useState()
  const { id } = useParams()
  const [dominantColor, setDominantColor] = useState()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const response = await artistDetails(id)
      setData(response)
    }
  }

  return (
    <div style={dominantColor && { backgroundColor: `rgba(${dominantColor}, 0.7)`, boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)` }}>
      {data &&
        <div className='relative pt-24 ml-5'>
          <Header
            data={data}
            image={data.data?.image[2].link}
            name={data.data?.name}
            followerCount={data.data?.followerCount}
            dominantColor={(color) => setDominantColor(color)}
          />
        </div>
      }
    </div>
  )
}

export default artist