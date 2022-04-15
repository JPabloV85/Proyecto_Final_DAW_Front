import React from 'react'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <main className='flex flex-col flex-grow items-center justify-center bg-marron'>
      <Header/>
      <LoginForm/>
    </main>
  )
}

export default Login