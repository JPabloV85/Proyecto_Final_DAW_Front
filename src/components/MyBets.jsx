import React from 'react'
import { faCheck, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyBets = (props) => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1280);
  const [newUserBalance, setNewUserBalance] = React.useState(0);
  const token = localStorage.getItem("access_token");
  
  props.funPullData(newUserBalance);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
  
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
      alert(e);
    });
  }, [token, error])




  const patchEntities = (amount, bet_id) => {
    patchBetClaimed(bet_id);
    patchClientCash(amount); 
  }

  const patchBetClaimed = (bet_id) => {
    fetch('http://127.0.0.1:5000/api/bet/update_claimed', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        idBet: bet_id
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.message);
        return
      }
      this.forceUpdate();
    })
    .catch(e => {
      console.log(e);
      setError(e);
    });
    
  }

  const patchClientCash = (amount) => {
    fetch('http://127.0.0.1:5000/api/client/update_cash', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        reward: amount
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.message);
        return
      }
      setNewUserBalance(data.new_cash);
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
          <th scope='col'>RACE TAG</th>
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
          ? <tr className='h-80'><td colSpan={6}>Loading...</td></tr> 
          : (response.length === 0 
            ? <tr className='h-80'><td colSpan={6}>You haven't placed any bets yet</td></tr>
            : (response.map(row =>{
              return(
                <tr key={row.id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{row.race_tag}</td>
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
                          <button onClick={() => patchEntities(row.payment_amount, row.id)} disabled
                            className='w-20 h-8 mb-1 rounded-lg text-slate-500 bg-slate-300 sm:w-24 sm:h-10 md:w-28 cursor-not-allowed'
                          >
                            CLAIMED
                          </button>
                        )
                        : (
                          <button onClick={() => patchEntities(row.payment_amount, row.id)}
                            className='w-16 h-8 mb-1 rounded-lg bg-dorado sm:w-20 sm:h-10'
                          >
                            CLAIM
                          </button>
                        )
                      )
                      : (
                        <button onClick={() => patchEntities(row.payment_amount, row.id)} disabled
                          className='w-16 h-8 mb-1 rounded-lg text-slate-500 bg-slate-300 sm:w-20 sm:h-10 cursor-not-allowed'
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