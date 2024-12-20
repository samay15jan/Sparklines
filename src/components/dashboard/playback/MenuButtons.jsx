import { useState } from 'react'
import { CgPlayButtonR } from 'react-icons/cg'
import { MdOutlineLyrics } from 'react-icons/md'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { LuMonitorSpeaker } from 'react-icons/lu'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import Options from '../routeTypes/components/Options'
import { DownloadURL } from '../artistsScreen/ArtistsScreen'


const MenuButtons = ({ isPublic }) => {
  const [selectedScreen, setSelectedScreen] = useRQGlobalState(
    'contentPlay',
    'nowPlaying'
  )
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
    }
    if (type === 'lyrics') {
      showNowPlaying(false)
      showLyrics(!isShowLyrics)
      showQueue(false)
      setSelectedScreen('lyrics')
    }
    if (type === 'queue') {
      showNowPlaying(false)
      showLyrics(false)
      showQueue(!isShowqueue)
      setSelectedScreen('queue')
    }
    if (type === 'devices') {
      setDevices(!isDevices)
    }
  }

  return (
    <div className={isPublic ? 'mt-10 ml-44 flex justify-center gap-4 opacity-80' :'mt-6 ml-20 flex justify-center gap-4 opacity-70'}>
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
        size={18}
        onClick={() => handleButtons('nowPlaying')}
        style={isShowNowPlaying ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <MdOutlineLyrics
        size={18}
        onClick={() => handleButtons('lyrics')}
        style={isShowLyrics ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <HiOutlineQueueList
        size={18}
        onClick={() => handleButtons('queue')}
        style={isShowqueue ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      {!isPublic && (
        <LuMonitorSpeaker
          size={18}
          onClick={() => handleButtons('devices')}
          style={isDevices ? { color: '#1db954' } : ''}
          className='cursor-pointer'
        />
      )}
      {isPublic && <DownloadURL songData={currentSong?.data} isPublic={isPublic}/>}
    </div>
  )
}

export default MenuButtons
