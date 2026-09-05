import { useEffect, lazy, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { artistSongs, recommendedSongs } from '../../../api/apiMethods'
const AudioDetails = lazy(() => import('./AudioDetails'))
const AudioVisualizer = lazy(() => import('./AudioVisualizer'))
const AudioController = lazy(() => import('./AudioController'))
const ControllerButtons = lazy(() => import('./ControllerButtons'))
const SeekBar = lazy(() => import('./Seekbar'))
const MenuButtons = lazy(() => import('./MenuButtons'))
const VolumeController = lazy(() => import('./VolumeController'))

const Container = styled.div`
  ${tw`bg-black w-full p-1 text-sm font-semibold lg:h-24 lg:border-t lg:border-white/10 lg:px-6 lg:py-0`}
`
const SubContainer = styled.div`
  ${tw`grid h-full grid-cols-[minmax(200px,1fr)_2fr_minmax(200px,1fr)] items-center gap-6`}
`

const Player = () => {
  const audioRef = useRef()
  const [, setPlayerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)
  const [id, setId] = useRQGlobalState('currentId', currentSong?.data?.id)
  const location = useLocation()
  let currentPath = location.pathname

  useEffect(() => {
    if (!currentSong?.data) return
    setId(currentSong?.data?.id)
    if (!id) {
      setId(currentSong?.data?.id)
    }
  }, [currentSong, id])

  useEffect(() => {
    setPlayerRef(audioRef?.current)
  }, [audioRef?.current])

  useEffect(() => {
    if (!playbackDetails?.isPending && playbackDetails?.data != null) {
      setPlaybackDetails(playbackDetails?.data)
      setCurrentSong(playbackDetails?.data[0])
    }
  }, [playbackDetails?.isPending, playbackDetails?.data])

  // Handle Queue
  useEffect(() => {
    if (!audioRef?.current) return
    const audioElement = audioRef.current

    const handleSongEnd = async () => {
      if (!playbackDetails?.data) return
      const newData = playbackDetails?.data?.filter(
        (song) => song?.id != id?.data
      )
      setPlaybackDetails(newData)
      setCurrentSong(newData[0])
    }
    audioElement.addEventListener('ended', handleSongEnd)
  }, [audioRef?.current?.currentTime, playbackDetails?.data])

  // fetch new data for queue
  useEffect(() => {
    if (playbackDetails?.data?.length == 1) {
      fetchNewData()
    }
  }, [playbackDetails?.data])

  async function fetchNewData() {
    let isPublic = currentPath.startsWith('/public/')
    const songId = playbackDetails?.data[0]?.id
    const artistsId = playbackDetails?.data[0]?.primaryArtistsId?.split(',')
    const albumsResponse = isPublic
      ? await artistSongs(artistsId[0], 1, 'latest')
      : await recommendedSongs(songId)
    if (!isPublic && albumsResponse?.data) {
      const updatedData = [playbackDetails?.data[0], ...albumsResponse.data]

      setPlaybackDetails(updatedData)
    }

    if (isPublic && albumsResponse?.data?.results) {
      const updatedData = [
        playbackDetails?.data[0],
        ...albumsResponse.data.results,
      ]

      setPlaybackDetails(updatedData)
    }
  }

  return (
    <>
      {currentSong?.data?.downloadUrl && (
        <audio
          ref={audioRef}
          autoPlay
          src={currentSong?.data?.downloadUrl[4]?.link}
        ></audio>
      )}
    </>
  )
}

const Playback = ({ isPublic, onOpenArtistsPanel }) => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const [, setSelectedScreen] = useRQGlobalState('contentPlay', 'nowPlaying')

  // Set Webpage Title
  useDocumentTitle(
    currentSong
      ? `${currentSong?.data?.name || 'unknown'} - ${currentSong?.data?.primaryArtists || 'unknown'}`
      : 'Sparklines - A music streaming platform'
  )

  function handleExpandNowPlaying() {
    setSelectedScreen('nowPlaying')
    onOpenArtistsPanel?.()
  }

  return (
    <>
      {!isPublic && (
        <Container>
          {/* Desktop: full bar with seek, volume and secondary controls */}
          <div className='hidden lg:block'>
            <SubContainer>
              <div className='flex min-w-0 items-center'>
                <AudioDetails />
                <AudioVisualizer />
              </div>
              <AudioController />
              <div className='flex justify-end'>
                <MenuButtons onOpenArtistsPanel={onOpenArtistsPanel} />
                <VolumeController />
              </div>
            </SubContainer>
          </div>

          {/* Mobile: compact mini-player. Tapping the row (outside the
              like/play/prev/next buttons and the seek bar) expands to
              Now Playing. */}
          <div className='flex flex-col gap-1.5 py-1 lg:hidden'>
            <div
              className='flex items-center gap-2'
              onClick={handleExpandNowPlaying}
            >
              <div className='flex min-w-0 flex-1 items-center'>
                <AudioDetails />
              </div>
              <div
                className='flex items-center'
                onClick={(e) => e.stopPropagation()}
              >
                <MenuButtons onOpenArtistsPanel={onOpenArtistsPanel} />
              </div>
              <div
                className='flex items-center'
                onClick={(e) => e.stopPropagation()}
              >
                <ControllerButtons />
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <SeekBar />
            </div>
          </div>
        </Container>
      )}
      {isPublic && (
        <div className='relative z-10 flex mt-10 ml-20 mr-40 justify-between'>
          <AudioController />
          <MenuButtons isPublic='true' />
          <VolumeController isPublic='true' />
        </div>
      )}
      <Player />
    </>
  )
}

export default Playback