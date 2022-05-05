import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-dorado  
          desktop_full:flex-row justify-between desktop_full:px-16">
      <ul className='flex space-x-6 text-2xl text-marron '>
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

      <ul className='grid grid-cols-3 gap-x-4 place-items-center text-center font-montaga text-lg text-marron 
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