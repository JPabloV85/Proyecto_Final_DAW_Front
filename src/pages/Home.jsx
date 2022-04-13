import React from 'react'
import { Link } from 'react-router-dom'
import LogoBlanco from '../components/LogoBlanco';

const Main = () => {
  return (
    <div className='flex flex-col flex-grow items-center bg-marron text-amarillo-claro font-montaga 
          xl:w-1/2 xl:bg-transparent xl:bg-gradient-to-r from-marron via-marron'>

      <Link to='/login' className='self-end pr-10 pt-10 text-2xl hover:underline 
                      lg:text-4xl 
                      xl:self-start xl:pl-10'>Sign in</Link>

      <LogoBlanco aspect="w-full max-w-xl mt-10 lg:mt-0"/>

      <h1 className='px-5 font-cylburn text-amarillo-claro text-7xl 
        lg:text-8xl lg:-mt-14 
        xl:ml-3'>Winning Horse</h1>

      <p className='px-5 mt-6 text-center text-white text-xl 
        lg:text-2xl
        xl:'>Manage your horse racing bets the easiest way possible</p>
        
      <Link to="/register" className='mt-10 text-4xl hover:underline lg:text-5xl'>Join us</Link>
    </div>
  )
}

export default Main