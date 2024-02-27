import React, { useState } from 'react'
import FirstLogin from '../components/dashboard/first_login/FirstLogin'

const Dashboard = () => {
  const [firstLogin, showFirstLogin] = useState(true)

  return (
    <div className='text-[#edeff0] bg-[#00040c] w-full h-screen'>
      {firstLogin === true && <FirstLogin onClick={() => showFirstLogin(false)}/>}
    </div>
  )
}

export default Dashboard