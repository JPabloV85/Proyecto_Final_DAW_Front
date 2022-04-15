import React from 'react'
import Header from '../components/Header'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <main className='flex flex-col flex-grow items-center justify-center bg-marron'>
      <Header/>
      <RegisterForm/>
    </main>
  )
}

export default Register