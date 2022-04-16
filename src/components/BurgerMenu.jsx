import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faClose, faFileLines, faIdCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const BurgerMenu = () => {

  const [active, setActive] = React.useState(false);
  const [section, setSection] = React.useState("my_bets");

  const showMenu = () => {
    setActive(!active);
  }
  const changeSection = (section) => {
    setSection(section);
    showMenu();
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
          <li className="mb-7 hover:underline" onClick={() => changeSection('my_bets')}>
            <Link to="/main" className={
              section === "my_bets" ? 'text-amarillo-claro' : undefined
            }>
              My Bets <FontAwesomeIcon icon={faFileLines}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={() => changeSection('new_bet')}>
            <Link to="/main" className={
              section === "new_bet" ? 'text-amarillo-claro' : undefined
            }>
              New Bet <FontAwesomeIcon icon={faMoneyBillTransfer}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={() => changeSection('profile')}>
            <Link to="/main" className={
              section === "profile" ? 'text-amarillo-claro' : undefined
            }>
              Profile <FontAwesomeIcon icon={faIdCard}/>
            </Link>
          </li>
          <li className="mb-7 hover:underline" onClick={() => logout()}>
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