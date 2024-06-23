import React from 'react'

const MenuCard = ({ image, menuName, menuIcon1, menuIcon2, heading, theme, subHeading }) => {
  return (
    <div className={theme==='light' ? 'w-96 h-96 bg-black absolute rounded-[50px] text-white' : 'w-96 h-96 absolute rounded-[50px] text-black'}>
      <div>
        <div className='opacity-80 text-sm font-bold absolute top-10 left-10 z-50 flex'>
          <button className='rounded-3xl border-2 border-gray-500 py-1 px-2'>
            {menuName}
          </button>
          <button className='rounded-full border-2 border-gray-500 py-1 px-2'>
            {menuIcon1}
          </button>
        </div>
        <button className={theme==='light' ? 'text-black bg-white text-4xl absolute right-5 top-5 z-50 p-4 rounded-full' : 'text-white bg-black text-4xl absolute right-5 top-5 z-50 p-4 rounded-full'}>
          {menuIcon2}
        </button>
        <h1 className='absolute z-50 left-10 bottom-20 max-w-60 text-3xl font-extrabold'>
          {heading}
        </h1>
        <p className='opacity-80 absolute left-10 z-50 bottom-6 max-w-72 text-md font-semibold'>
          {subHeading}
        </p>
        <img
          className={theme==='light' ? 'opacity-50 rounded-[50px]' : 'rounded-[50px]'}
          src={image}
        />
      </div>
    </div>
  )
}

export default MenuCard