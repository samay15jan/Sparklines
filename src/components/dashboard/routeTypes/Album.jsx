import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { albumDetails } from '../../../utils/apiMethods'

const Album = () => {
  const [data, setData] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [data])

  async function getData() {
    if (id) {
      const response = await albumDetails(id)
      setData(response)
    }
  }

  return (
    <div>

    </div>
  )
}

export default Album