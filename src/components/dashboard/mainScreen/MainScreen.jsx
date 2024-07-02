import React, { lazy } from 'react'
const Homepage = lazy(() => import('../homepage/Homepage'))
const Search = lazy(() => import('../searchMenu/Search'))

const MainScreen = ({ showMenu }) => {

  return (
    <div className='bg-[#0f0f0f] overflow-y-auto h-auto my-2 mx-1 rounded-lg col-span-8 p-5'>
      {showMenu === 'search'
        ? <Search />
        : <Homepage />
      }
    </div>
  )
}

export default MainScreen