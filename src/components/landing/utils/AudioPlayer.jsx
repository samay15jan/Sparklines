import React, { useRef, useState, useEffect } from 'react'
import { songDetails } from '../../../utils/apiMethods'

const AudioPlayer = ({ songResponse, playingStatus }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [songData, setSongData] = useState('')

  async function getData() {
    const playback = await songDetails()
    setSongData(playback)
  }

  useEffect(() => {
    getData()
  }, [playingStatus])

  useEffect(() => {
    songResponse(songData)
  }, [songData])

  useEffect(() => {
    if (currentPlayer) {
      if (playingStatus) {
        currentPlayer.play()
      } else {
        currentPlayer.pause()
      }
    }
  }, [currentPlayer, playingStatus])

  return (
    <audio
      ref={audioPlayer}
      loop
      src={songData && songData.data[0].downloadUrl[4].link}
    >
    </audio>
  )
}

export default AudioPlayer