import React, { lazy } from 'react'
import { FaHistory } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
const Buttons = lazy(() => import('./Buttons'))
const UserProfile = lazy(() => import('./profile/UserProfile'))

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='absolute z-50 w-full mt-5 px-5 grid grid-cols-6'>
      <div className='flex gap-3 col-span-5'>
        <Buttons name='backward' />
        <Buttons name='forward' />
      </div>
      <div className='bg-[#282828] rounded-l-full py-1 rounded-t-full flex gap-3'>
        <a href='https://github.com/samay15jan/sparklines' target='_blank'>
          <FaGithub
            size={31}
            className='p-1 mt-[1px] ml-2 opacity-80 bg-black rounded-full'
          />
        </a>
        <button>
          <FaHistory
            onClick={() =>
              navigate('/dashboard/recently-played')
            }
            size={30}
            className='p-1 opacity-80 bg-black rounded-full'
          />
        </button>
        <UserProfile />
      </div>
    </div>
  )
}

export default Header
