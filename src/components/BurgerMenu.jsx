import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faClose, faFileLines, faIdCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const BurgerMenu = (props) => {

  const [active, setActive] = React.useState(false);

  const showMenu = () => {
    setActive(!active);
  }
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  }

  /* TODO
    meter en los links del menu los paths a las tablas
    /main/my_bets
    /main/new_bet
    /main/profile o directamente /profile
  */
 
  return (
    <div className='text-3xl xl:hidden'>
      <FontAwesomeIcon icon={faBars} onClick={showMenu}
        className='mr-5 cursor-pointer'
      />
      <nav className={
        active 
        ? 'fixed right-0 top-0 w-60 h-full bg-marron transition-all ease-in duration-500'
        : 'fixed -right-full top-0 w-60 h-full bg-marron transition-all ease-in duration-500'
      }>
        <h1 className='self-start ml-5 mt-5 mb-8 font-cylburn text-7xl'>
          <FontAwesomeIcon icon={faClose} onClick={showMenu}
          className='cursor-pointer'
          size='2xs'/> Menu
        </h1>

        <ul className='flex flex-col items-end mr-10 font-montaga text-white'>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/my_bets" className={
              props.path.endsWith("/my_bets") ? 'text-amarillo-claro' : undefined
            }>
              My Bets <FontAwesomeIcon icon={faFileLines}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/new_bet" className={
              props.path.endsWith("/new_bet") ? 'text-amarillo-claro' : undefined
            }>
              New Bet <FontAwesomeIcon icon={faMoneyBillTransfer}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={showMenu}>
            <Link to="/main/profile" className={
              props.path.endsWith("/profile") ? 'text-amarillo-claro' : undefined
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