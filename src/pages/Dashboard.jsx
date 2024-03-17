import React, { lazy } from 'react'
import AutoNavigate from '../utils/AutoNavigate'
const FirstLogin = lazy(() => import('../components/initialLogin/FirstLogin'))

const Dashboard = () => {
  const newUser = localStorage.getItem('newUser')

  return (
    <div className='min-h-screen items-center grid-cols-1 grid w-screen overflow-hidden bg-black text-white'>
      <AutoNavigate />
      {newUser && <FirstLogin />}
    </div>
  )
}

export default Dashboard