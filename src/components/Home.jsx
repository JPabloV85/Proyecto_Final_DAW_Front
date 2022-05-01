import React from 'react'
import { Link } from 'react-router-dom'
import LogoBlanco from './svg/LogoBlanco';

const Home = () => {
  return (
    <main className='flex flex-col flex-grow items-center bg-marron text-amarillo-claro font-montaga 
          xl:w-3/4 xl:items-start xl:bg-transparent xl:bg-gradient-to-r from-marron via-marron'>

      <Link to='/login' className='self-end mr-10 mt-10 text-2xl hover:underline 
                        lg:text-4xl 
                        xl:self-start xl:ml-10'>
          Sign in
      </Link>

      <div className='flex flex-col items-center'>
        <LogoBlanco aspect="w-full max-w-lg mt-16 lg:mt-8"/>

        <h1 className='px-5 -mt-6 font-cylburn text-amarillo-claro text-7xl 
          lg:text-8xl
          xl:ml-3 xl:-mt-8'>
            Winning Horse
        </h1>

        <p className='px-5 mt-6 text-center text-white text-xl 
          lg:text-2xl
          xl:ml-4'>
            Manage your horse racing bets the easiest way possible
        </p>
          
        <Link to="/register" className='mt-10 text-4xl hover:underline lg:text-5xl'>
          Join us
        </Link>
      </div>
    </main>
  )
}

export default Home