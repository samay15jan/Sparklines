import React from 'react'

const TopArtists = ({ response, menuName, menuIcon1, menuIcon2, heading, subHeading }) => {
  return (
    <div className='relative w-96 h-[550px] mt-20 bg-[#020f14] rounded-3xl'>
      <div>
        <div className='text-white opacity-80 text-sm font-bold absolute top-10 left-10 z-50 flex'>
          <button className='rounded-3xl border-2 py-1 px-2'>
            {menuName}
          </button>
          <button className='rounded-full border-2 py-1 px-2'>
            {menuIcon1}
          </button>
        </div>
        <button className='text-black text-4xl bg-white absolute right-5 top-5 z-50 p-4 rounded-full'>
          {menuIcon2}
        </button>
        <h1 className='text-white absolute z-50 left-10 bottom-24 max-w-60 text-3xl font-bold'>
          {heading}
        </h1>
        <p className='text-white opacity-80 absolute left-10 z-50 bottom-10 max-w-72 text-md font-semibold'>
          {subHeading}
        </p>
        <div className='absolute top-28 justify-center flex o2pacity-90'>
          <img
            className={'rounded-full w-1/2'}
            src={response}
          />
          <div className='w-24 rounded-r-full mt-3 bg-black bg-yellow-400' />
        </div>
      </div>
    </div>
  )
}

export default TopArtists