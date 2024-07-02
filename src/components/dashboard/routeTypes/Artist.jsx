import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  artistDetails,
  artistSongs,
  artistAlbums,
  artistRecommendations
} from '../../../utils/apiMethods'

const artist = () => {
  const [data, setData] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [data])

  async function getData() {
    if (id) {
      const response = await artistDetails(id)
      setData(response)
    }
  }

  return (
    <div>

    </div>
  )
}

export default artist