import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import bingelord from '../assets/Logo.png'
import { firebaseLogin, firebaseRegister } from '../backend/auth'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Logo= styled.img`${tw`w-56 absolute ml-5 z-50 shadow-2xl`}`
const Container = styled.div`${tw`w-screen h-auto flex justify-center `}`
const Background= styled.img`${tw`w-screen h-screen fixed object-cover opacity-40 blur-sm`}`
const SubContainer = styled.div`${tw`px-10 pt-10 pb-20 w-96 my-32 lg:my-20 bg-black relative shadow-2xl bg-opacity-80`}`
const Heading = styled.div`${tw` py-5 text-4xl font-medium `}`
const Form = styled.form`${tw`grid grid-cols-1 my-5`}`
const Error = styled.div`${tw`flex justify-center text-sm text-red-400`}`
const Email = styled.input`${tw`bg-[#303030] text-xl p-2 my-5 h-12 rounded-sm`}
&:focus {
  outline: 1px solid #515151;
}`

const Password = styled.input`${tw`bg-[#303030] text-xl p-2 my-5 h-12 rounded-sm`}
&:focus {
  outline: 1px solid #515151;
}`
const Button = styled.input`${tw`mt-10 text-xl shadow-sm shadow-[#c20432] my-5 h-12 rounded-sm bg-[#cc021a]`}
transition: background 0.3s ease;
&:hover {
    background: #252525;
    color: #d9d4d5;
}
&:focus {
  outline: 1px solid #515151;
}`

const SwitchContainer = styled.div`${tw`flex`}`
const Text = styled.div`${tw`text-gray-400`}`
const SwitchButton = styled.button`${tw`ml-1 font-bold`}`

const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState("Login")
  const [error, setError] = useState('')

  // Auto Redirect
  const navigate = useNavigate()
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/movies')
      }
    })
  },[auth, navigate])

  const changeMenu = () => {
    type === "Login" 
      ? setType("Sign Up") 
      : setType("Login")
    setEmail('')
    setPassword('')
    setError('')
  } 

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Login
    if(type === 'Login') {
      try {
        await firebaseLogin(email, password)
      } catch (error) {
        setError(error)
        setEmail('')
        setPassword('')
      }
    }
    // Register
    else {
      try {
        await firebaseRegister(email, password)
      } catch (error) {
          setError(error)
          setEmail('')
          setPassword('')
      }
    }
  }
  
  return (
    <>
      <Logo src={bingelord} alt='logo' />
      <Container>
        <SubContainer>
            <Heading>{type}</Heading>
            <Form onSubmit={handleSubmit}>
                <Email placeholder='Email' type="email" value={email} onChange={handleEmail}/>
                <Password placeholder='Password' type="password" value={password} onChange={handlePassword} />
                <Error>{error}</Error>
                <Button type='submit' value={type} />
            </Form>
            <SwitchContainer>
              <Text>
                {type === 'Login' ? 'New to BingeLord?' : 'Existing User?'}
              </Text>
              <SwitchButton onClick={changeMenu}>
                {type === 'Login' ? 'Sign Up now' : 'Login'}
              </SwitchButton>
            </SwitchContainer>
        </SubContainer>
    </Container>
    </>
  )
}

export default Authentication