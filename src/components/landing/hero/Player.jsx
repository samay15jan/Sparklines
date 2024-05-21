import React, { useRef, useState, useEffect } from 'react'
import { homepageData, playbackSong } from '../../../utils/apiMethods'
import tw from 'twin.macro'
import styled from 'styled-components'
import { FaPause, FaPlay } from "react-icons/fa6"

const Container = styled.div`${tw`mt-[-50px] ml-28 w-96 h-32 rounded-full bg-gray-200 opacity-90 drop-shadow-sm`}`
const Controller = styled.div`${tw`absolute top-12 left-12 text-gray-100`}`
const Image = styled.img`${tw`absolute top-4 left-4 w-24 h-24 border-4 border-white rounded-full`}`
const DetailsContainer = styled.div`${tw`absolute top-8 left-32 grid grid-rows-2`}`
const Heading = styled.div`${tw`font-extrabold text-2xl`}`
const SubHeading = styled.div`${tw`font-medium text-lg`}`

const Player = () => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current

  const [data, setData] = useState()
  const [songDetails, setSongDetails] = useState()
  const [showControls, setShowControls] = useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (currentPlayer) {
      if (play) {
        currentPlayer.play()
      } else {
        currentPlayer.pause()
      }
    }
  }, [currentPlayer, play])

  async function getData() {
    const homepage = await homepageData()
    const playbackId = homepage && homepage.data.trending.songs[0].id
    localStorage.setItem('playback', playbackId)
    const playback = await playbackSong()
    setData(homepage)
    setSongDetails(playback)
  }

  const songName = data && data.data.trending.songs[0].name
  const artistName = data && data.data.trending.songs[0].primaryArtists[0].name
  const songImage = data && data.data.trending.songs[0].image[1].link
  const audioSrc = data && songDetails.data[0].downloadUrl[4].link

  function trim(details) {
    return details?.length > 15 ? details?.substring(0, 15) + '...' : details?.substring(0, 15)
  }

  return (
    <Container>
      {data &&
        <>
          <div
            onClick={() => setPlay(!play)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <Image
              src={songImage}
              alt=""
              className={showControls ? 'opacity-60' : 'opacity-80'}
            />
            <Controller>
              {play
                ? <FaPause size={35} />
                : <FaPlay size={35} />
              }
            </Controller>
          </div>
          <DetailsContainer>
            <Heading>{trim(songName)}</Heading>
            <SubHeading>{trim(artistName)}</SubHeading>
          </DetailsContainer>
        </>
      }
      <audio ref={audioPlayer} src={audioSrc}></audio>
    </Container>
  )
}


export default Player