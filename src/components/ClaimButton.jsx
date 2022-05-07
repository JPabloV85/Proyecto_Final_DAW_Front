import React from 'react'
import { MyContext } from './helpers/MyContext';

const ClaimButton = (props) => {
  const [error, setError] = React.useState(null);
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}] = React.useContext(MyContext);
  const token = localStorage.getItem("access_token");

  const claimBet = (amount, bet_id) => {
    fetch('http://127.0.0.1:5000/api/client/claim', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        reward: amount,
        idBet: bet_id
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.message);
        return
      }
      setClientBalance(data.new_cash);
      setError(null);
    })
    .catch(e => {
      setError(e);
      alert(error);
    });
  }

  
  return (
    props.row.win
    ? (props.row.claimed
      ? (
        <button disabled
          className='w-20 h-8 mb-1 rounded button-shadow text-slate-500 bg-slate-300 cursor-not-allowed
          sm:w-24 sm:h-10 
          md:w-28'
        >
          CLAIMED
        </button>
      )
      : (
        <button onClick={() => claimBet(props.row.payment_amount, props.row.id)}
          className='w-16 h-8 mb-1 rounded button-shadow bg-dorado 
          sm:w-20 sm:h-10'
        >
          CLAIM
        </button>
      )
    )
    : (
      <button disabled
      className='w-16 h-8 mb-1 rounded button-shadow text-slate-500 bg-slate-300 cursor-not-allowed
      sm:w-20 sm:h-10'
      >
      CLAIM
      </button>
    )
  )
}

export default ClaimButton