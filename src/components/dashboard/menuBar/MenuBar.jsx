import { useEffect, useState } from 'react'
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
  const localData = localStorage.getItem('following')
  const [following] = useRQGlobalState('following', JSON.parse(localData))

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
    <div className='fixed bottom-0 left-0 right-0 z-50 flex h-16 flex-row m-0 rounded-none bg-black p-1 lg:static lg:z-auto lg:h-auto lg:flex-col lg:m-2 lg:mr-1 lg:rounded-lg lg:bg-transparent lg:p-0'>
      <div className='bg-[#0f0f0f] mb-0 rounded-lg flex flex-1 items-center justify-center p-3 lg:mb-2 lg:block lg:flex-none lg:p-5'>
        {menu === 'home' && (
          <div className='flex items-center gap-6 lg:block'>
            <Link to='/dashboard'>
              <MdHome size={30} onClick={handleMenu2} />
            </Link>
            <Link to='/dashboard/search'>
              <RiSearchLine
                size={28}
                className='opacity-70 lg:mt-5'
                onClick={handleMenu1}
              />
            </Link>
          </div>
        )}
        {menu === 'search' && (
          <div className='flex items-center gap-6 lg:block'>
            <Link to='/dashboard'>
              <MdOutlineHome
                size={30}
                className='opacity-70 lg:mb-5'
                onClick={handleMenu2}
              />
            </Link>
            <Link to='/dashboard/search'>
              <RiSearchFill size={28} onClick={handleMenu1} />
            </Link>
          </div>
        )}
      </div>
      <div className='hidden bg-[#0f0f0f] rounded-lg py-5 grow overflow-y-auto lg:block'>
        <LuLibrary size={30} className='opacity-70 mb-5 ml-5' />
        <Link to='/dashboard/liked'>
          <div className='w-10 mb-4 mx-4' onClick={handleMenu1}>
            <img
              className='rounded-lg'
              src='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/wgp6vslfpkovzcivmegp?_a=BAMAGSRg0'
              alt=''
            />
          </div>
        </Link>
        <Link to='/dashboard/playlists'>
          <div className='w-10 mb-2 mx-4' onClick={handleMenu1}>
            <img
              className='rounded-lg'
              src='https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/gkgkol3qvikb8byg2x6x?_a=BAMAGSRg0'
              alt=''
            />
          </div>
        </Link>

        <div className='h-auto overflow-y-scroll grid grid-cols-1 px-3'>
          {following &&
            following?.data &&
            following.data?.map((item, index) => (
              <img
                className='w-10 ml-1 my-2 border-gray-800 hover:border-2 rounded-full cursor-pointer'
                key={index}
                onClick={() => navigateArtist(item?.id)}
                src={item?.image}
                alt=''
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MenuBar
