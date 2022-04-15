import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter, Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dorado fixed inset-x-0 bottom-0 flex flex-col items-center 
          desktop_full:flex-row justify-between desktop_full:px-16">
      <ul className='text-marron text-2xl flex space-x-6'>
        <li>
          <a target="_blank" href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebookSquare} /></a>
        </li>
        <li>
          <a target="_blank" href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagramSquare} /></a>
        </li>
        <li>
          <a target="_blank" href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitterSquare} /></a>
        </li>
      </ul>

      <ul className='text-marron font-montaga text-lg grid grid-cols-3 gap-x-4 text-center place-items-center
          lg:gap-x-20 
          xl:flex xl:space-x-12 xl:gap-x-0
          desktop_full:space-x-20'>
        <li className='hover:underline'><Link to="/notfound">Contact</Link></li>
        <li className='hover:underline'><Link to="/notfound">Terms of use</Link></li>
        <li className='hover:underline'><Link to="/notfound">Legal advice</Link></li>
        <li className='hover:underline'><Link to="/notfound">About us</Link></li>
        <li className='hover:underline'><Link to="/notfound">Privacy policy</Link></li>
        <li className='hover:underline'><Link to="/notfound">Cookie policy</Link></li>
      </ul>
    </footer>
  )
}

export default Footer