import React, { useState, useEffect } from 'react'
import FirstLogin from '../components/dashboard/first_login/FirstLogin'
import { auth, database } from '../components/utils/firebase.js'
import { set, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const navigate = useNavigate()
  const [firstLogin, showFirstLogin] = useState(true)
  const userId = localStorage.getItem('userId')
  const initialLogin = localStorage.getItem('initialLogin')

  useEffect(() => {
    if(!userId){
      navigate('/')
    }
    if(initialLogin){
      showFirstLogin(false)
    }
  },[auth, userId, initialLogin])

  const handleDatabase = (selectedLang, selectedArtists) => {
    try {
      set(ref(database, 'sparklines/users/' + userId + '/preferences/'), {
        'language': selectedLang,
        'following': selectedArtists,
        'initialLogin': true,
      })
    } catch (error) {
      console.log(error)
    }
    localStorage.setItem('initialLogin', true)
    showFirstLogin(false)
  }

  return (
    <div className='text-[#edeff0] bg-[#00040c] w-screen h-screen overflow-hidden'>
      <Helmet>
        <title>{'Sparklines'}</title>
        <meta name='description' content='A Music Streaming Platform' />
      </Helmet>
      {firstLogin === true 
        ? <FirstLogin closeMenu={() => showFirstLogin(false)} returnData={handleDatabase}/>
        : <div>
            Setting Up Things
          </div>
      }
    </div>
  )
}

export default Dashboard