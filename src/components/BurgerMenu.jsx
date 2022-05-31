import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faClose, faFileLines, faIdCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import DarkModeButton from './DarkModeButton';
import { MyContext } from './helpers/MyContext'

const BurgerMenu = (props) => {
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
  const [active, setActive] = React.useState(false);

  const showMenu = () => {
    setActive(!active);
  }
  const logout = () => {
    localStorage.removeItem("access_token");
  }
 
  return (
    <div className='text-3xl lg:hidden'>
      <FontAwesomeIcon icon={faBars} onClick={showMenu}
        className='mr-5 cursor-pointer'
      />
      <nav className={
        active 
        ? (!dark
          ? 'flex flex-col items-center z-10 fixed right-0 top-0 w-60 pt-5 h-full menu-shadow bg-dorado transition-all ease-in duration-500'
          : 'flex flex-col items-center z-10 fixed right-0 top-0 w-60 pt-5 h-full menu-shadow bg-marron transition-all ease-in duration-500'
          )
        : 'flex flex-col items-center fixed -right-full top-0 w-60 h-full bg-marron transition-all ease-in duration-500'
      }>

        <h1 className='self-start flex items-center ml-5 font-cylburn text-7xl'>
          <FontAwesomeIcon icon={faClose} onClick={showMenu} className='mr-2 cursor-pointer' size='2xs'/> 
          Menu
        </h1>

        <DarkModeButton className={
          !dark ? 'flex items-center space-x-1 text-marron' : 'flex items-center space-x-1 text-white'
        }/>

        <ul className={
          !dark
          ?'flex flex-col items-end mt-10 font-montaga text-marron'
          :'flex flex-col items-end mt-10 font-montaga text-white'
        }>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/my_bets" className={
              props.path.endsWith("/my_bets") ? (!dark ? 'text-marron-claro stroke' : 'text-amarillo-claro') : undefined
            }>
              My Bets <FontAwesomeIcon icon={faFileLines}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/new_bet" className={
              props.path.endsWith("/new_bet") 
              || props.path.endsWith("/horses") 
              || props.path.endsWith("/horse_detail") ? (!dark ? 'text-marron-claro stroke' : 'text-amarillo-claro') : undefined
            }>
              New Bet <FontAwesomeIcon icon={faMoneyBillTransfer}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/profile" className={
              props.path.endsWith("/profile") ? (!dark ? 'text-marron-claro stroke' : 'text-amarillo-claro') : undefined
            }>
              Profile <FontAwesomeIcon icon={faIdCard}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={logout}>
            <Link to="/login">
              Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default BurgerMenu