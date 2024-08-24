import { useRef, useState, useEffect } from 'react'
import { homepageData } from '../../../api/apiMethods'
import tw from 'twin.macro'
import styled from 'styled-components'
import { FaPause, FaPlay } from 'react-icons/fa6'
import { songDetails } from '../../../api/apiMethods'
import { useDocumentTitle } from '@uidotdev/usehooks'

const Container = styled.div`
  ${tw`mt-[-50px] ml-28 w-96 h-32 rounded-full bg-gray-200 opacity-90 drop-shadow-sm`}
`
const Controller = styled.div`
  ${tw`absolute top-12 left-12 text-gray-100`}
`
const Image = styled.img`
  ${tw`absolute top-4 left-4 w-24 h-24 border-4 border-white rounded-full`}
`
const DetailsContainer = styled.div`
  ${tw`absolute top-8 left-32 grid grid-rows-2`}
`
const Heading = styled.div`
  ${tw`font-extrabold text-2xl`}
`
const SubHeading = styled.div`
  ${tw`font-medium text-lg`}
`

const Player = ({ apiResponse }) => {
  const [data, setData] = useState('')
  const [playbackId, setPlaybackId] = useState('')
  const [songDetails, setSongDetails] = useState('')
  const [showControls, setShowControls] = useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    apiResponse(data)
  }, [data])

  async function getData() {
    const homepage = await homepageData()
    if (homepage) {
      setPlaybackId(homepage?.data?.trending?.songs[0]?.id)
      setData(homepage)
    }
  }

  const songName = songDetails && songDetails.data[0].name
  const artistName = songDetails && songDetails.data[0].primaryArtists
  const songImage = songDetails && songDetails.data[0].image[1].link

  function trim(details) {
    return details?.length > 15
      ? details?.substring(0, 15) + '...'
      : details?.substring(0, 15)
  }

  useDocumentTitle(
    songDetails && play
      ? `${songName || 'unknown'} - ${artistName || 'unknown'}`
      : 'Sparklines - A music streaming platform'
  )

  return (
    <Container>
      {data && (
        <>
          <div
            onClick={() => setPlay(!play)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <Image
              src={songImage}
              alt=''
              className={showControls ? 'opacity-60' : 'opacity-80'}
            />
            <Controller>
              {play ? <FaPause size={35} /> : <FaPlay size={35} />}
            </Controller>
          </div>
          <DetailsContainer>
            <Heading>{trim(songName)}</Heading>
            <SubHeading>{trim(artistName)}</SubHeading>
          </DetailsContainer>
        </>
      )}
      <AudioPlayer
        songResponse={(data) => setSongDetails(data)}
        playingStatus={play}
        playbackId={playbackId}
      />
    </Container>
  )
}

const AudioPlayer = ({ playbackId, songResponse, playingStatus }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [songData, setSongData] = useState('')

  async function getData() {
    const playback = await songDetails(playbackId)
    setSongData(playback)
  }

  useEffect(() => {
    getData()
  }, [playingStatus, playbackId])

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
    ></audio>
  )
}

export default Player
