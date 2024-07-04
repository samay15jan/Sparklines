import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userData from './userData'

const AutoNavigate = ({ location }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userdata = userData()
    if (
      userdata.userId &&
      userdata.email &&
      userdata.username &&
      userdata.profilePic
    ) {
      navigate(location)
    }
  }, [navigate])

  return null
}

export default AutoNavigate
