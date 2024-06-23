import React, { useRef, useState, useEffect } from 'react'
import { playbackSong } from '../../../utils/apiMethods'

const AudioPlayer = ({ songResponse, playingStatus }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [songDetails, setSongDetails] = useState('')

  async function getData() {
    const playback = await playbackSong()
    setSongDetails(playback)
  }

  useEffect(() => {
    getData()
  }, [playingStatus])

  useEffect(() => {
    songResponse(songDetails)
  }, [songDetails])

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
      src={songDetails && songDetails.data[0].downloadUrl[4].link}
    >
    </audio>
  )
}

export default AudioPlayer