import { useState } from 'react'
import { CgPlayButtonR } from 'react-icons/cg'
import { MdOutlineLyrics } from 'react-icons/md'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { LuMonitorSpeaker } from 'react-icons/lu'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import Options from '../routeTypes/components/Options'
import { DownloadURL } from '../artistsScreen/ArtistsScreen'

const MenuButtons = ({ isPublic, onOpenArtistsPanel }) => {
  const [, setSelectedScreen] = useRQGlobalState('contentPlay', 'nowPlaying')
  const [isLike, setLiked] = useState(false)
  const [isShowNowPlaying, showNowPlaying] = useState(true)
  const [isShowLyrics, showLyrics] = useState(false)
  const [isShowqueue, showQueue] = useState(false)
  const [isDevices, setDevices] = useState(false)
  const [currentSong] = useRQGlobalState('currentSong', null)
  const songData = currentSong?.data

  function handleButtons(type) {
    if (type === 'like') {
      setLiked(!isLike)
    }
    if (type === 'nowPlaying') {
      showNowPlaying(!isShowNowPlaying)
      showLyrics(false)
      showQueue(false)
      setSelectedScreen('nowPlaying')
      onOpenArtistsPanel?.()
    }
    if (type === 'lyrics') {
      showNowPlaying(false)
      showLyrics(!isShowLyrics)
      showQueue(false)
      setSelectedScreen('lyrics')
      onOpenArtistsPanel?.()
    }
    if (type === 'queue') {
      showNowPlaying(false)
      showLyrics(false)
      showQueue(!isShowqueue)
      setSelectedScreen('queue')
      onOpenArtistsPanel?.()
    }
    if (type === 'devices') {
      setDevices(!isDevices)
    }
  }

  return (
    <div
      className={
        isPublic
          ? 'mt-10 ml-44 flex justify-center gap-4 opacity-80'
          : 'flex items-center justify-center gap-3 opacity-70 lg:gap-4'
      }
    >
      {!isPublic && (
        <Options
          type='liked'
          style='mt-0'
          id={songData?.id}
          image={songData?.image[2]?.link}
          name={songData?.name}
          artist={songData?.primaryArtists?.split(',')?.slice(0, 1)[0]}
          artistId={
            songData?.primaryArtistsId?.replaceAll(' ', '')?.split(',')[0]
          }
          album={songData?.album?.name}
          albumId={songData?.album?.id}
          duration={songData?.duration}
        />
      )}
      <CgPlayButtonR
        className={`hidden w-[18px] h-[18px] cursor-pointer lg:block lg:w-5 lg:h-5 ${
          isShowNowPlaying ? 'text-[#1db954]' : ''
        }`}
        onClick={() => handleButtons('nowPlaying')}
      />
      <MdOutlineLyrics
        className={`hidden w-[18px] h-[18px] cursor-pointer lg:block lg:w-5 lg:h-5 ${
          isShowLyrics ? 'text-[#1db954]' : ''
        }`}
        onClick={() => handleButtons('lyrics')}
      />
      <HiOutlineQueueList
        className={`hidden w-[18px] h-[18px] cursor-pointer lg:block lg:w-5 lg:h-5 ${
          isShowqueue ? 'text-[#1db954]' : ''
        }`}
        onClick={() => handleButtons('queue')}
      />
      {!isPublic && (
        <LuMonitorSpeaker
          className={`hidden w-[18px] h-[18px] cursor-pointer lg:block lg:w-5 lg:h-5 ${
            isDevices ? 'text-[#1db954]' : ''
          }`}
          onClick={() => handleButtons('devices')}
        />
      )}
      {isPublic && (
        <DownloadURL songData={currentSong?.data} isPublic={isPublic} />
      )}
    </div>
  )
}

export default MenuButtons