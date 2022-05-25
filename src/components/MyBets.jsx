import React from 'react'
import { faCheck, faCog, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyContext } from './helpers/MyContext';
import ClaimButton from './ClaimButton';

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
      if (data.error) throw new Error(data.message);
      setResponse(data);
      setError(null);
      setMounted(true);
    })
    .catch(e => {
      setError(e.message);
      console.log(error);
    });
  }, [token, error, clientBalance])


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
          { windowWidth >= 1250 && (<th scope='col'>TIME</th>) }
          { windowWidth >= 500 && (<th scope='col'>BET</th>) }          
          <th scope='col'>WIN</th>
          <th scope='col'>REWARD</th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          !mounted
          ? <tr className='h-80'>
              <td colSpan={7}><FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...</td>
            </tr> 
          : (response.length === 0 
            ? <tr className='h-80'><td colSpan={7}>You haven't placed any bets yet</td></tr>
            : (response.map(row =>{
              return(
                <tr key={row.id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{row.race_tag}</td>
                  <td>{row.horse_name}</td>
                  <td>{row.date}</td>
                  {windowWidth >= 1250 && <td>{row.time}</td>}
                  {windowWidth >= 500 && <td>{row.bet_amount} €</td>}                  
                  <td>
                  {
                    row.win === null
                    ? <FontAwesomeIcon icon={faMinus} size="xl" color='black' />
                    : (
                      row.win
                      ? <FontAwesomeIcon icon={faCheck} size="xl" color='green' />
                      : <FontAwesomeIcon icon={faXmark} size="xl" color='red' />
                    )
                  }
                  </td>
                  <td className='flex flex-col items-center'>
                    {row.payment_amount} €
                    <ClaimButton row={row}/>
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