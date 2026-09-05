const MenuCard = ({
  image,
  menuName,
  menuIcon1,
  menuIcon2,
  heading,
  theme,
  subHeading,
}) => {
  return (
    <div
      className={
        theme === 'light'
          ? 'w-auto lg:w-96 mt-6 h-96 bg-black absolute rounded-[50px] text-white'
          : 'w-auto lg:w-96 lg:h-96 absolute rounded-[50px] text-black'
      }
    >
      <div>
        <div className='opacity-80 text-sm font-bold absolute top-5 left-5 z-50 flex'>
          <button className='rounded-3xl border-2 border-gray-500 py-1 px-2 hover:bg-white hover:text-black transition-colors'>
            {menuName}
          </button>
          <button className='rounded-full border-2 border-gray-500 py-1 px-2 hover:bg-white hover:text-black transition-colors'>
            {menuIcon1}
          </button>
        </div>
        <button
          className={
            theme === 'light'
              ? 'text-black bg-white text-4xl absolute right-5 top-5 z-50 p-4 rounded-full hover:bg-black hover:text-white transition-colors'
              : 'text-white bg-black text-4xl absolute right-5 top-5 z-50 p-4 rounded-full border-black border-2 hover:bg-white hover:text-black transition-colors'
          }
        >
          {menuIcon2}
        </button>
        <h1 className='absolute z-50 left-10 bottom-20 max-w-60 text-2xl font-extrabold'>
          {heading}
        </h1>
        <p className='opacity-80 absolute left-10 z-50 bottom-7 max-w-72 text-sm font-semibold'>
          {subHeading}
        </p>
        <img
          className={
            theme === 'light' ? 'opacity-50 rounded-[50px] pointer-events-none select-none transition-opacity  duration-300 ease-in-out ' : 'rounded-[50px] pointer-events-none select-none'
          }
          src={image}
        />
      </div>
    </div>
  )
}

export default MenuCard
