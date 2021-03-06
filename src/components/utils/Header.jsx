import React from 'react'
import LogoBlanco from '../svg/LogoBlanco'
import LogoOscuro from '../svg/LogoOscuro'
import ClientBalance from './ClientBalance'
import { Link } from 'react-router-dom'
import BurgerMenu from './BurgerMenu'
import { MyContext } from '../helpers/MyContext'
import DarkModeButton from './DarkModeButton'

const Header = (props) => {
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('resize', onResize);
        }
    }, [windowWidth]);

    return ( 
        props.path !== "/" 
        ? (
            <header className={
                !dark
                ? 'flex flex-wrap justify-between items-center bg-amarillo-claro text-marron'
                : 'flex flex-wrap justify-between items-center bg-marron text-amarillo-claro'
              }>
                <Link to='/' className='flex justify-between items-center'>
                    {!dark
                    ? <LogoOscuro aspect="w-full max-w-small -ml-12 lg:max-w-small lg:-ml-6 xl:ml-0"/>
                    : <LogoBlanco aspect="w-full max-w-small -ml-12 lg:max-w-small lg:-ml-6 xl:ml-0"/>
                    }          
                    <p className='-ml-14 font-cylburn text-4xl lg:-ml-12 lg:text-5xl xl:text-5xl'>
                        Winning Horse
                    </p>
                </Link>               

                {props.path.includes("/main") && <BurgerMenu path={props.path}/>}                
                
                {
                    (props.path !== "/login" && props.path !== "/register") && 
                    <DarkModeButton id="darkButton" className={
                        !dark
                        ? 'hidden lg:flex items-center space-x-1 text-marron'
                        : 'hidden lg:flex items-center space-x-1 text-white'
                      }/> 
                }
                
                {
                    props.path === "/login" ? 
                    <Link to='/register' className='self-center mr-5 text-xl font-montaga hover:underline 
                                lg:text-3xl lg:mr-20'>
                            Sign up
                    </Link> 
                    :
                    props.path === "/register" ? 
                    <Link to='/login' className='self-center mr-5 text-xl font-montaga hover:underline 
                                lg:text-3xl lg:mr-20'>
                            Sign in
                    </Link> 
                    :
                    ((props.path !== "/main/horse_detail" && props.path !== "/main/profile") || windowWidth >= 1024) && <ClientBalance/>
                }
            </header>
        )
        : null
    )
}

export default Header