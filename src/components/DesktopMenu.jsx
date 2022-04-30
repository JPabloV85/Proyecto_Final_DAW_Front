import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faFileLines, faIdCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

const Menu = (props) => {

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  }

  return (
    <aside className='hidden items-center mx-10 lg:flex xl:mx-20'>
        <ul className='flex flex-col items-end text-3xl text-white'>
            <li className="mb-20 hover:underline">
                <Link to="/main/my_bets" className={
                    props.section === "/my_bets" ? 'text-amarillo-claro' : undefined
                }>
                    My Bets <FontAwesomeIcon icon={faFileLines}/>
                </Link>
            </li>
            <li className="mb-20 hover:underline">
                <Link to="/main/new_bet" className={
                    props.section === "/new_bet" || props.section === "/horses" ? 'text-amarillo-claro' : undefined
                }>
                    New Bet <FontAwesomeIcon icon={faMoneyBillTransfer}/>
                </Link>
            </li>
            <li className="mb-20 hover:underline">
                <Link to="/main/profile" className={
                    props.section === "/profile" ? 'text-amarillo-claro' : undefined
                }>
                    Profile <FontAwesomeIcon icon={faIdCard}/>
                </Link>
            </li>
            <li className="mb-20 hover:underline" onClick={() => logout()}>
                <Link to="/login">
                    Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Menu