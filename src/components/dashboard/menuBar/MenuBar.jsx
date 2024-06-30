import React, { useEffect, useState } from 'react';
import { MdOutlineHome, MdHome } from 'react-icons/md'
import { RiSearchFill, RiSearchLine } from "react-icons/ri"
import { LuLibrary } from "react-icons/lu"

const MenuBar = ({ showSearch }) => {
  const [menu, changeMenu] = useState('home')

  useEffect(() => {
    if(menu==='home'){
      showSearch(false)
    }else{
      showSearch(true)
    }
  }, [menu])

  function handleMenu() {
    if(menu==='home'){
      changeMenu('search')
    }else{
      changeMenu('home')
    }
  }

  return (
    <div className='h-auto m-2 mr-1 rounded-lg'>
      <div className='bg-[#0f0f0f] mb-2 rounded-lg h-auto p-5'>
        {menu === 'home' ? (
          <div className=''>
            <MdHome size={30} onClick={handleMenu} />
            <RiSearchLine size={28} className='opacity-70 mt-5' onClick={handleMenu} />
          </div>
        ) : (
          <div>
            <MdOutlineHome size={30} className='opacity-70 mb-5' onClick={handleMenu} />
            <RiSearchFill size={28} onClick={handleMenu} />
          </div>
        )}
      </div>
      <div className='overflow-y-scroll bg-[#0f0f0f] rounded-lg h-full p-5'>
        <LuLibrary size={30} className='opacity-70 mb-5' />
      </div>
    </div>
  )
}

export default MenuBar
