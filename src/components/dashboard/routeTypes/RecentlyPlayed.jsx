import React, { useState, lazy } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import PlayIcon from './components/PlayIcon'
const Header = lazy(() => import('./components/Header'))
import SongList from './components/SongList'

const RecentlyPlayed = () => {
  const [dominantColor, setDominantColor] = useState()
  const userName = localStorage.getItem('username')
  const recentlyPlayedDataLocally = localStorage.getItem('recentlyPlayed')
  const [data, setNewData] = useRQGlobalState(
    'recentlyPlayed',
    JSON.parse(recentlyPlayedDataLocally)
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
              image='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/bsfocl2s4dbhjsjaklwh?_a=BAMAGSRg0'
              type={`Created By ${userName}`}
              name='Recently Played'
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

export default RecentlyPlayed