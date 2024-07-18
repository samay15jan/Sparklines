import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

const Buttons = ({ name }) => {
  const navigate = useNavigate()
  const location = useLocation()

  function handleNav() {
    if (name === 'forward') {
      navigate(1)
    } else {
      if (location.pathname.startsWith('/dashboard')) {
        if (location.pathname !== '/dashboard') {
          navigate(-1)
        }
      } else {
        navigate('/dashboard')
      }
    }
  }
  
  return (
    <button>
      {name === 'forward'
        ? <IoIosArrowForward
          onClick={handleNav}
          size={30}
          className='p-1 bg-opacity-80 bg-black rounded-full hover:bg-opacity-50'
        />
        : <IoIosArrowBack
          onClick={handleNav}
          size={30}
          className='p-1 bg-opacity-80 bg-black rounded-full hover:bg-opacity-50'
        />
      }
    </button>
  )
}

export default Buttons