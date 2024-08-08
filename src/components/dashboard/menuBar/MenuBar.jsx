import React, { useEffect, useState } from 'react'
import { MdOutlineHome, MdHome } from 'react-icons/md'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { LuLibrary } from 'react-icons/lu'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const MenuBar = () => {
  const [menu, changeMenu] = useState('home')
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()
  const navigate = useNavigate()
  const [following] = useRQGlobalState('following', null)

  function navigateArtist(id) {
    navigate(`/dashboard/artist/${id}`)
  }

  //based on location
  useEffect(() => {
    if (currentPath === '/dashboard') {
      changeMenu('home')
    }
    if (currentPath === '/dashboard/search') {
      changeMenu('search')
    }
    if (query && currentPath === `/dashboard/search/${query}`) {
      changeMenu('search')
    }
  }, [currentPath])

  // Manual user Interation
  function handleMenu1() {
    if (menu === 'home') {
      changeMenu('search')
    }
  }

  function handleMenu2() {
    if (menu === 'search') {
      changeMenu('home')
    }
  }

  return (
    <div className='h-auto m-2 mr-1 rounded-lg'>
      <div className='bg-[#0f0f0f] mb-2 rounded-lg h-auto p-5'>
        {menu === 'home' && (
          <div>
            <Link to='/dashboard'>
              <MdHome size={30} onClick={handleMenu2} />
            </Link>
            <Link to='/dashboard/search'>
              <RiSearchLine
                size={28}
                className='opacity-70 mt-5'
                onClick={handleMenu1}
              />
            </Link>
          </div>
        )}
        {menu === 'search' && (
          <div>
            <Link to='/dashboard'>
              <MdOutlineHome
                size={30}
                className='opacity-70 mb-5'
                onClick={handleMenu2}
              />
            </Link>
            <Link to='/dashboard/search'>
              <RiSearchFill size={28} onClick={handleMenu1} />
            </Link>
          </div>
        )}
      </div>
      <div className='overflow-y-scroll bg-[#0f0f0f] rounded-lg h-full py-5'>
        <LuLibrary size={30} className='opacity-70 mb-5 ml-5' />
        <div className='grid grid-cols-1 px-3'>
          {following?.data &&
            following.data?.map((item, index) => (
              <img
              className='w-16 my-2 border-gray-800 hover:border-2 rounded-full cursor-pointer'
                key={index}
                onClick={() => navigateArtist(item?.artistId)}
                src={item?.imageUrl}
                alt=''
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MenuBar
