import React, { lazy, Suspense } from 'react'
import { TbBrandNeteaseMusic } from "react-icons/tb"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const LogoContainer = lazy(() => delay(1500).then(() => import('./LogoContainer')))

const MainLogo = () => {
  return (
    <div className='flex justify-center col-span-2'>
      <div className='w-3 h-3 rounded-full opacity-90 mt-4 mr-1 bg-gray-200' />
      <div className='w-4 h-7 rounded-l-full opacity-90 mt-2 bg-gray-200' />
      <Suspense fallback={<div className='w-32 rounded-full bg-gray-200 opacity-20 animate-pulse'></div>}>
        <LogoContainer text='Sparklines' Icon={TbBrandNeteaseMusic} />
      </Suspense>
      <div className='w-4 h-7 rounded-r-full opacity-90 mt-2 bg-gray-200' />
    </div>
  )
}

export default MainLogo