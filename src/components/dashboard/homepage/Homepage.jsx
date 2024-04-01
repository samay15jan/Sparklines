import React, { useEffect, useState } from 'react'
import { homepageData } from '../../../utils/apiMethods'
import Playlists from '../searchMenu/Playlists'

const Homepage = () => {
  const [data, setData] = useState()

  useEffect( () => {
    getData()
  }, [])

  async function getData(){
    const response = await homepageData()
    setData(response)
  }

  return (
    <div>
    </div>
  )
}

export default Homepage