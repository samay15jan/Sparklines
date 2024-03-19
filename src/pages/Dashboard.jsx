import React, { lazy, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Search = lazy(() => import('../components/dashboard/SearchMenu/Search'))

const Dashboard = () => {
  var userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if(!userId){
      navigate('/')    
    }
  }, [userId])

  return (
    <div>
      <Search />
    </div>
  )
}

export default Dashboard