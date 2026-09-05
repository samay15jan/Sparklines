const TopArtists = ({
  image,
  menuName,
  menuIcon1,
  menuIcon2,
  heading,
  subHeading,
  buttonText,
  buttonImage,
}) => {
  return (
    <div className='relative w-auto lg:w-96 h-[572px] mt-20 bg-[#020f14] rounded-[50px]'>
      <div>
        <div className='text-white opacity-80 text-sm font-bold absolute top-10 left-10 z-50 flex'>
          <button className='rounded-3xl border-2 py-1 px-2 hover:text-black hover:bg-white transition-colors'>{menuName}</button>
          <button className='rounded-full border-2 py-1 px-2 hover:text-black hover:bg-white transition-colors'>
            {menuIcon1}
          </button>
        </div>
        <div className='absolute bottom-44 left-3 lg:left-10 text-white text-sm font-bold flex opacity-80'>
          <button className='rounded-3xl text-sm border-2 px-8 hover:bg-white hover:text-black transition-colors'>
            {buttonText}
          </button>
          <img
            src={buttonImage}
            className='w-44 h-12 rounded-full border-2 px-4'
          />
        </div>
        <button className='text-white opacity-80 text-4xl border-2 border-white absolute right-5 top-5 z-50 p-4 rounded-full hover:text-black hover:bg-white transition-colors'>
          {menuIcon2}
        </button>
        <h1 className='text-white absolute z-50 left-10 bottom-20 max-w-60 text-2xl font-bold'>
          {heading}
        </h1>
        <p className='text-white opacity-80 absolute left-10 z-50 bottom-7 max-w-72 text-sm font-semibold'>
          {subHeading}
        </p>
        <div className='absolute top-28 justify-center flex opacity-90'>
          <img
            className={'relative z-50 hover:animate-spin rounded-full w-1/2'}
            src={image}
          />
          <div className='w-24 rounded-r-full mt-3 bg-yellow-400' />
        </div>
      </div>
    </div>
  )
}

export default TopArtists
