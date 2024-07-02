import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { playlistDetails } from '../../../utils/apiMethods'

const Playlist = () => {
  const [data, setData] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [data])

  async function getData() {
    if (id) {
      const response = await playlistDetails(id)
      setData(response)
    }
  }

  return (
    <div>

    </div>
  )
}

export default Playlist