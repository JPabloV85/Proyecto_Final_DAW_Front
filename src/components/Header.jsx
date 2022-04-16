import React from 'react'
import LogoBlanco from './LogoBlanco'
import UserBalance from './UserBalance'
import { Link } from 'react-router-dom'
import BurgerMenu from './BurgerMenu'

const Header = (props) => {
    if (props.currentPath !== "/") {
        return (
            <header className='flex flex-wrap justify-between items-center fixed inset-x-0 top-0 text-amarillo-claro'>
                <div className='flex justify-between items-center'>
                    <LogoBlanco aspect="w-full max-w-small -ml-12 
                                        lg:max-w-small lg:-ml-6
                                        xl:ml-0"/>
                    <p className='-ml-14 font-cylburn text-4xl 
                                lg:-ml-12 lg:text-5xl
                                xl:text-5xl'>
                            Winning Horse
                    </p>
                </div>
                {
                    props.currentPath === "/main" && (
                        <BurgerMenu/>
                    )
                }
                {
                    props.currentPath === "/login" ? 
                    <Link to='/register' className='self-center mr-5 text-xl font-montaga hover:underline 
                                lg:text-3xl lg:mr-20'>
                            Sign up
                    </Link> 
                    : 
                    props.currentPath === "/register" ? 
                    <Link to='/login' className='self-center mr-5 text-xl font-montaga hover:underline 
                                lg:text-3xl lg:mr-20'>
                            Sign in
                    </Link> 
                    :     
                    <UserBalance/>
                }
            </header>
        )
    }
    return null;
}

export default Header