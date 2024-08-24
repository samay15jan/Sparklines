import { FaHistory } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Buttons from './Buttons'
import UserProfile from './profile/UserProfile'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='absolute z-50 w-full mt-5 px-5 grid grid-cols-6'>
      <div className='flex gap-3 col-span-5'>
        <Buttons name='backward' />
        <Buttons name='forward' />
      </div>
      <div className='bg-black bg-opacity-60 rounded-full py-1  flex gap-3'>
        <a
          href='https://github.com/samay15jan/sparklines'
          rel='noreferrer'
          target='_blank'
        >
          <FaGithub
            size={31}
            className='p-1 mt-[1px] ml-2 opacity-80 bg-black rounded-full'
          />
        </a>
        <button>
          <FaHistory
            onClick={() => navigate('/dashboard/recently-played')}
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
