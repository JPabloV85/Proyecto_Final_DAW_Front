import React from 'react'
import { faCheck, faCog, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyContext } from './helpers/MyContext';

const MyBets = () => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}] = React.useContext(MyContext);
  const token = localStorage.getItem("access_token");
  
  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/api/bet/my_bets', {
      headers:{
        Authorization: 'Bearer ' + token
      },
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.message);
        return
      }
      setResponse(data);
      setError(null);
      setMounted(true);
    })
    .catch(e => {
      setError(e);
    });
  }, [token, error, clientBalance])


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
    });
  }


  return (
    <table className='w-full text-center text-sm text-marron bg-dorado
        sm:text-lg
        md:text-xl
        lg:rounded-md'>
      <caption className='hidden'>Client bets</caption>
      <thead className='h-14'>
        <tr>
          <th scope='col'>RACE</th>
          <th scope='col'>HORSE</th>
          <th scope='col'>DATE</th>
          { windowWidth >= 1400 && (<th scope='col'>TIME</th>) }
          <th scope='col'>BET</th>
          <th scope='col'>WIN</th>
          <th scope='col'>REWARD</th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          !mounted
          ? <tr className='h-80'>
              <td colSpan={6}><FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...</td>
            </tr> 
          : (response.length === 0 
            ? <tr className='h-80'><td colSpan={6}>You haven't placed any bets yet</td></tr>
            : (response.map(row =>{
              return(
                <tr key={row.id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{row.race_tag}</td>
                  <td>{row.horse_name}</td>
                  <td>{row.date}</td>
                  {windowWidth >= 1400 && <td>{row.time}</td>}
                  <td>{row.bet_amount} €</td>
                  <td>
                  {
                    row.win === null
                    ? <FontAwesomeIcon icon={faMinus} size="2xl" color='black' />
                    : (
                      row.win
                      ? <FontAwesomeIcon icon={faCheck} size="2xl" color='green' />
                      : <FontAwesomeIcon icon={faXmark} size="2xl" color='red' />
                    )
                  }
                  </td>
                  <td className='flex flex-col items-center'>
                    {row.payment_amount} €
                    {row.win
                      ? (row.claimed
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
                          <button onClick={() => claimBet(row.payment_amount, row.id)}
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
                    }
                  </td>
                </tr>
              )})
            )
          )
        }
      </tbody>
    </table>
  )
}

export default MyBets