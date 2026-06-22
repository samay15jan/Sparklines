import { useEffect, useState } from 'react'
import { MdFavorite, MdHome, MdOutlineHome } from 'react-icons/md'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { LuLibrary } from 'react-icons/lu'
import { PiPlaylistFill } from 'react-icons/pi'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const likedCover =
  'https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/wgp6vslfpkovzcivmegp?_a=BAMAGSRg0'
const playlistsCover =
  'https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/gkgkol3qvikb8byg2x6x?_a=BAMAGSRg0'

const MenuBar = () => {
  const [menu, changeMenu] = useState('home')
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()
  const navigate = useNavigate()
  const localData = localStorage.getItem('following')
  const [following] = useRQGlobalState('following', JSON.parse(localData))

  function navigateArtist(id) {
    navigate(`/dashboard/artist/${id}`)
    setIsLibraryOpen(false)
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
  }, [currentPath, query])

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

  const isHome = menu === 'home'
  const isSearch = menu === 'search'
  const isLiked = currentPath === '/dashboard/liked'
  const isPlaylists = currentPath === '/dashboard/playlists'

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
            )}
          </Link>
          <Link
            to='/dashboard/search'
            aria-label='Search'
            className='mt-5 flex min-h-11 min-w-11 items-center justify-center'
          >
            {isSearch ? (
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
        </nav>
      </aside>

      {isLibraryOpen && (
        <div className='fixed inset-x-3 bottom-20 z-40 max-h-[55vh] overflow-y-auto rounded-2xl bg-[#0f0f0f] p-4 shadow-2xl lg:hidden'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-sm font-semibold'>Followed artists</h2>
            <button
              type='button'
              className='min-h-11 min-w-11 rounded-full text-sm opacity-70'
              aria-label='Close library'
              onClick={() => setIsLibraryOpen(false)}
            >
              Close
            </button>
          </div>
          <div className='grid grid-cols-4 gap-3'>
            {following?.data?.map((item, index) => (
              <button
                className='flex min-h-11 min-w-11 flex-col items-center gap-2 rounded-lg p-1 text-xs'
                key={index}
                onClick={() => navigateArtist(item?.id)}
                aria-label={`Open ${item?.name || 'artist'}`}
                type='button'
              >
                <img
                  className='size-11 rounded-full'
                  src={item?.image}
                  alt=''
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <nav
        className='fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-white/10 bg-[#0f0f0f]/95 px-3 py-2 backdrop-blur lg:hidden'
        aria-label='Mobile navigation'
      >
        <Link
          to='/dashboard'
          aria-label='Home'
          className='flex min-h-11 min-w-11 items-center justify-center rounded-full'
          onClick={handleMenu2}
        >
          {isHome ? <MdHome size={28} /> : <MdOutlineHome size={28} />}
        </Link>
        <Link
          to='/dashboard/search'
          aria-label='Search'
          className='flex min-h-11 min-w-11 items-center justify-center rounded-full'
          onClick={handleMenu1}
        >
          {isSearch ? <RiSearchFill size={26} /> : <RiSearchLine size={26} />}
        </Link>
        <button
          type='button'
          aria-label='Library'
          aria-expanded={isLibraryOpen}
          className='flex min-h-11 min-w-11 items-center justify-center rounded-full'
          onClick={() => setIsLibraryOpen((isOpen) => !isOpen)}
        >
          <LuLibrary size={26} />
        </button>
        <Link
          to='/dashboard/liked'
          aria-label='Liked songs'
          className='flex min-h-11 min-w-11 items-center justify-center rounded-full'
          onClick={() => setIsLibraryOpen(false)}
        >
          <MdFavorite size={26} className={isLiked ? '' : 'opacity-70'} />
        </Link>
        <Link
          to='/dashboard/playlists'
          aria-label='Playlists'
          className='flex min-h-11 min-w-11 items-center justify-center rounded-full'
          onClick={() => setIsLibraryOpen(false)}
        >
          <PiPlaylistFill
            size={26}
            className={isPlaylists ? '' : 'opacity-70'}
          />
        </Link>
      </nav>
    </>
  )
}

export default MenuBar
