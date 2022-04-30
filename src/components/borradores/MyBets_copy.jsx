import React from 'react'
import { faCheck, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClaimButton from './ClaimButton';

const MyBets_copy = (props) => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1280);
  const [newUserBalance, setNewUserBalance] = React.useState(null);
  const token = localStorage.getItem("access_token");

  const funNewUserBalance = (amount) => {
    setNewUserBalance(amount);
  }
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
      alert(error);
    });
  }, [token, error, mounted])

  
  

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
          mounted === false 
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
                    <ClaimButton row={row} funNewUserBalance={funNewUserBalance}/>
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

export default MyBets_copy