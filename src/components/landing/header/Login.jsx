import React from 'react'
import { googleLogin } from '../../utils/auth'

const Login = () => {
  return (
    <div>
        <button onClick={googleLogin}>Google Login</button>
    </div>
  )
}

export default Login