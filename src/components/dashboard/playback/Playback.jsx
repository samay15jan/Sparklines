import React, { useEffect, useState } from 'react'
import { playbackSong } from '../../../utils/apiMethods'

const Playback = () => {
  const [data, setData] = useState()
  const playbackId = localStorage.getItem('playback')
  
  useEffect(() => {
    if (playbackId) {
      getData()
    }
  }, [playbackId])

  async function getData() {
    const response = await playbackSong()
    setData(response)
  }

  return (
    <div>
      {data &&
        <audio src={data.data[0].downloadUrl[4].link}></audio>
      }
    </div >
  )
}

export default Playback