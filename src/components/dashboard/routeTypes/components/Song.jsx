import { useState } from 'react'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { songDetails } from '../../../../api/apiMethods'
import { FaPlay } from 'react-icons/fa6'
import { MdExplicit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Song = ({
  id,
  songData,
  index,
  name,
  artistName,
  time,
  explicit,
  type,
  menu,
}) => {
  const [hover, setHover] = useState(false)
  const [data, setData] = useRQGlobalState('playbackQueue', null)
  const navigate = useNavigate()

  const handleClick = async (newId) => {
    if (type === 'discography') {
      navigate(`/dashboard/album/${newId}`)
    } else {
      const { data } = await songDetails(newId)
      setData(data)
    }
  }

  function formatTime(time) {
    if (time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  return (
    <div className={menu === 'search' ? '' : 'ml-7 mr-9'}>
      <div
        className='hover:bg-[#353535] hover:cursor-pointer relative rounded-md py-2 px-5 pr-8 grid grid-cols-5 justify-between'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick(songData?.id || id)}
      >
        <div
          className={
            menu === 'search' || menu === 'liked'
              ? 'flex gap-4 col-span-3'
              : 'flex gap-4 col-span-4'
          }
        >
          <h1
            className={
              index + 1 < 10
                ? 'mr-3 pt-2 text-sm font-medium'
                : 'mr-1 pt-2 text-sm font-medium'
            }
          >
            {hover ? (
              <FaPlay className='mt-1 ml-[-6px] pl-1' size={12} />
            ) : (
              index + 1
            )}
          </h1>
          <div className='flex text-sm'>
            {type && (
              <img
                className='w-10 mr-3 rounded-sm'
                src={
                  type === 'liked' || type === 'customPlaylists'
                    ? songData?.image
                    : songData?.image[2]?.link
                }
              />
            )}
            <div>
              <h1
                className={
                  type === 'artist' ? 'text-[16px] font-medium' : 'font-bold'
                }
              >
                {songData?.name || name || 'Unknown'}
              </h1>
              <h1 className='flex opacity-80'>
                {songData?.explicitContent == 1 ||
                  (explicit && <MdExplicit size={20} className='opacity-80' />)}
                {type != 'artist' ||
                  (type != 'customPlaylists' && (
                    <>
                      {(songData?.primaryArtists?.length > 0 &&
                        songData?.primaryArtists[0]?.name) ||
                        songData?.primaryArtists ||
                        artistName ||
                        songData?.artist ||
                        'Unknown'}
                    </>
                  ))}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={
            menu === 'search' || menu === 'liked'
              ? 'flex justify-between col-span-2'
              : 'absolute right-8'
          }
        >
          {menu === 'search' ||
            (menu === 'liked' && (
              <h1 className='mt-3 text-sm font-medium opacity-80'>
                {songData?.album?.name || songData?.album}
              </h1>
            ))}
          <h1 className='pt-2 font-medium p-2 text-sm opacity-80'>
            {type != 'discography' && type != 'customPlaylists'
              ? formatTime(songData?.duration) || time || '0:00'
              : songData?.songCount || songData?.songs?.length + ' Songs'}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Song
