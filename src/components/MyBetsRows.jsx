import React from 'react'
import { faCheck, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyBetsRows = (props) => {
    return (
        props.response.length === 0 
        ? <tr className='h-80'><td colSpan={6}>You haven't placed any bets yet</td></tr>
        : (props.response.map(row => 
            (
            <tr key={row.race_tag} className='h-14 even:bg-amarillo-oscuro'>
                <td>{row.race_tag}</td>
                <td>{row.date}</td>
                {props.windowWidth >= 1400 && <td>{row.time}</td>}
                <td>{row.bet_amount} €</td>
                <td>
                {
                    row.win === "null"
                    ? <FontAwesomeIcon icon={faMinus} size="2xl" color='black' />
                    : (
                    row.win === 'true'
                    ? <FontAwesomeIcon icon={faXmark} size="2xl" color='red' />
                    : <FontAwesomeIcon icon={faCheck} size="2xl" color='green' />
                    )
                }
                </td>
                <td>{row.payment_amount} €</td>
            </tr>
            ))
        )
    )
}

export default MyBetsRows