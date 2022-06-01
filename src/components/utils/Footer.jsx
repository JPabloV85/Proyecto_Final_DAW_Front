import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { MyContext } from '../helpers/MyContext'

const Footer = () => {
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

  return (
    <footer className={
      !dark
      ? "flex flex-col items-center bg-marron desktop_full:flex-row justify-between desktop_full:px-16"
      : "flex flex-col items-center bg-amarillo-claro desktop_full:flex-row justify-between desktop_full:px-16"
    }>
      <ul className={
        !dark
        ? 'flex space-x-6 text-2xl text-amarillo-claro'
        : 'flex space-x-6 text-2xl text-marron'
      }>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebookSquare} /></a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagramSquare} /></a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitterSquare} /></a>
        </li>
      </ul>

      <ul className={
          !dark
          ? "grid grid-cols-3 gap-x-4 place-items-center text-center font-montaga text-lg text-amarillo-claro lg:gap-x-20 xl:flex xl:space-x-12 xl:gap-x-0 desktop_full:space-x-20"
          : "grid grid-cols-3 gap-x-4 place-items-center text-center font-montaga text-lg text-marron lg:gap-x-20 xl:flex xl:space-x-12 xl:gap-x-0 desktop_full:space-x-20"
        }>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">Contact</a></li>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">Terms of use</a></li>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">Legal advice</a></li>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">About us</a></li>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">Privacy policy</a></li>
        <li className='hover:underline'><a target="_blank" rel="noreferrer" href="https://www.twitter.com">Cookie policy</a></li>
      </ul>
    </footer>
  )
}

export default Footer