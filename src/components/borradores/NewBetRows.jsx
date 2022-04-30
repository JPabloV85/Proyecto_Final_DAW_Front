import React from 'react'

const NewBetRows = (props) => {
    return (
        props.response.length === 0 
        ? <tr className='h-80'><td colSpan={6}>You haven't placed any bets yet</td></tr>
        : (props.response.map(row => 
            (
            <tr key={row.race_tag} className='h-14 even:bg-amarillo-oscuro'>
                <td>{row.race_tag}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.payment_amount} Participants</td>
            </tr>
            ))
        )
    )
}

export default NewBetRows