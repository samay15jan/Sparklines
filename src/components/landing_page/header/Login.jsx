import React from 'react'
import { googleLogin } from '../../utils/auth'

const Login = () => {
  return (
    <>
        <button onClick={googleLogin}>Google Login</button>
    </>
  )
}

export default Login