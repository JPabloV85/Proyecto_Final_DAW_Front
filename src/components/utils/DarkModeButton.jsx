import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { MyContext } from '../helpers/MyContext'

const DarkModeButton = (props) => {
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

    const darkMode = () => {
        setDark(!dark);
    }

    return (
        <div className={props.className}>
            <FontAwesomeIcon icon={faMoon}/>
            <label className="switch">
                <input type="checkbox" onClick={darkMode}/>
                <span className="slider round"/>
            </label>
            <FontAwesomeIcon icon={faSun}/>
        </div>
  )
}

export default DarkModeButton