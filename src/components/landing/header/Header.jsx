import { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
const LogoContainer = lazy(() => import('./LogoContainer'))
const MainLogo = lazy(() => import('./MainLogo'))

const Connect = () => {
  return (
    <div className='hidden lg:flex w-58 px-4 p-2 rounded-full text-sm border-2 border-black gap-2 font-extrabold justify-center transition-colors bg-white hover:bg-black hover:text-white'>
      <div className='mt-2 mr-2'>LETS CONNECT</div>
      <a
        href='https://github.com/samay15jan/sparklines'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='bg-black text-white p-1 bg-opacity-80 rounded-full transition-colors hover:bg-white hover:text-black'>
          <FaGithub size={25} />
        </div>
      </a>
      <a href='mailto:samay15jan@gmail.com'>
        <div className='bg-black text-white p-1 bg-opacity-80 rounded-full transition-colors hover:bg-white hover:text-black'>
          <MdEmail size={25} />
        </div>
      </a>
    </div>
  )
}

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='ml-5 bg-white p-2 grid grid-cols-2 lg:grid-cols-3'>
      <div className='hidden lg:flex ml-10 gap-4'>
        <LogoContainer text='AION' image='/icons/Logo.png' />
        <LogoContainer text='Menu' whiteBg='true' />
      </div>
      <MainLogo text='Sparklines' />
      <div className='ml-5 flex justify-center gap-4'>
        <Connect />
        <LogoContainer
          text='Login'
          whiteBg='true'
          navigation={(location) => navigate(location)}
        />
      </div>
    </div>
  )
}

export default Header
