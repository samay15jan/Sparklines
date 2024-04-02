import React, { useEffect, useState } from 'react'
import { homepageData } from '../../../utils/apiMethods'

const Homepage = () => {
  const [data, setData] = useState()

  useEffect( () => {
    
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