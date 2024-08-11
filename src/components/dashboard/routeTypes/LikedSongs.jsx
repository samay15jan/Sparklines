import React, { useState, lazy } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import PlayIcon from './components/PlayIcon'
const Header = lazy(() => import('./components/Header'))
import SongList from './components/SongList'

const LikedSongs = () => {
  const [dominantColor, setDominantColor] = useState()
  const userName = localStorage.getItem('username')
  const likedDataLocally = localStorage.getItem('liked')
  const [data, setNewData] = useRQGlobalState(
    'liked',
    JSON.parse(likedDataLocally)
  )

  return (
    <div>
      <div
        style={
          dominantColor && {
            backgroundColor: `rgba(${dominantColor}, 0.7)`,
            boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
          }
        }
      >
        {data?.data && (
          <div className='relative pt-20 ml-5 pb-5'>
            <Header
              data={data?.data}
              image='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/wgp6vslfpkovzcivmegp?_a=BAMAGSRg0'
              type={`Created By ${userName}`}
              name='Liked Songs'
              verfied={false}
              dominantColor={(color) => setDominantColor(color)}
            />
            <div className='flex gap-4'>
              <PlayIcon />
            </div>
          </div>
        )}
      </div>
      <div className='absolulte'>
        {data?.data && (
          <SongList
            songs={data?.data}
            artistName={data?.data?.artist}
            type='liked'
            menu='liked'
          />
        )}
      </div>
    </div>
  )
}

export default LikedSongs
