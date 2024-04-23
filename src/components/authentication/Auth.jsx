import React, { useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import { register, login } from '../../utils/authMethods'
const SendButton = lazy(() => import('./SendButton'))

const Heading = styled.div`${tw`text-4xl mb-2 font-bold`}`
const SubHeading = styled.div`${tw`text-lg mb-5 font-medium opacity-50`}`
const Form = styled.form`${tw`text-black grid grid-cols-1`}`
const Error = styled.div`${tw`flex justify-center text-lg font-medium`}`
const Input = styled.input`${tw`text-lg p-2 my-2 h-12 rounded-md`}
  outline: 1px solid #ccced0;
  &:focus {
    outline: 2px solid grey;
}`
const SwitchContainer = styled.div`${tw`flex justify-center mt-5`}`
const Text = styled.div`${tw`font-medium opacity-50 text-center`}`
const SwitchButton = styled.button`${tw`font-bold ml-1`}
transition: color 0.3s ease;
&:hover {
    color: #db916a;
}
&:focus {
    outline: none;
    color: #db916a;
}`

const Auth = ({ data }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('Login')
  const [response, setResponse] = useState('')

  const navigate = useNavigate()

  const changeMenu = () => {
    type === 'Login'
      ? setType('Sign Up')
      : setType('Login')
    setEmail('')
    setPassword('')
    setResponse('')
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      if (!email.length > 0 || !password.length > 0) {
        setResponse('Fields cannot be empty')
        return
      }
      const userData = { 'email': email, 'password': password }
      const registeredUser = await register(userData)
      if (registeredUser.status === 'SUCCESS') {
        const loggedInUser = await login(userData)
        if (loggedInUser.status === 'SUCCESS') {
          setResponse(loggedInUser.message)
          data(loggedInUser.data)
        } else {
          setResponse(loggedInUser.error)
        }
      } else {
        setResponse(registeredUser.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (!email.length > 0 || !password.length > 0) {
        setResponse('Fields cannot be empty')
        return
      }
      const userData = { "email": email, "password": password }
      const loggedInUser = await login(userData)
      if (loggedInUser && loggedInUser.data) {
        setResponse('Successfully Logged In')
        setDataLocally(loggedInUser.data)
        navigate('/dashboard')
      } else {
        setResponse(loggedInUser.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setDataLocally = (data) => {
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('email', data.email)
    localStorage.setItem('username', data.username)
    localStorage.setItem('profilePic', data.profilePic)
    localStorage.setItem('languages', data.languages)
  }

  return (
    <div>
      <Heading>Welcome to Sparklines !</Heading>
      <SubHeading>Embrace the Rhythm of Your Soul</SubHeading>
      <Form onSubmit={type === 'Login' ? handleLogin : handleRegistration}>
        <Input autoFocus={true} placeholder='Email' type='email' value={email} onChange={handleEmail} autoComplete='off' />
        <Input placeholder='Password' type='password' value={password} onChange={handlePassword} autoComplete='off' />
        <Error>{response}</Error>
        <SendButton value={type}/>
      </Form>
      <SwitchContainer>
        <Text>
          {type === 'Login' ? 'New to Sparklines?' : 'Existing User?'}
        </Text>
        <SwitchButton onClick={changeMenu}>
          {type === 'Login' ? 'Sign Up now' : 'Login'}
        </SwitchButton>
      </SwitchContainer>
    </div>
  )
}

export default Auth