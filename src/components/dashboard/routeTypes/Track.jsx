import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { songDetails } from '../../../utils/apiMethods'

const Track = () => {
  const [data, setData] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      localStorage.setItem('playback', id)
      getData()
    }
  }, [data])

  async function getData() {
    const response = await songDetails()
    setData(response)
  }

  return (
    <div>

    </div>
  )
}

export default Track