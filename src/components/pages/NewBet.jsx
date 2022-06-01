import { faCog } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyContext } from '../helpers/MyContext';

const NewBet = () => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
  const token = localStorage.getItem("access_token");
  
  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/run/available`, {
      headers:{
        Authorization: 'Bearer ' + token,
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
  }, [token, error])
  

  return (
    <table className={
      !dark
      ? 'w-full text-center text-sm text-marron bg-dorado sm:text-lg md:text-xl lg:rounded-md border-2 border-amarillo-oscuro'
      : 'w-full text-center text-sm text-marron bg-dorado sm:text-lg md:text-xl lg:rounded-md'
    }>
      <caption className='hidden'>Races availables for betting</caption>
      <thead className={!dark ? 'h-14 text-dorado bg-marron' : 'h-14'}>
        <tr>
          <th scope='col'>RACE</th>
          <th scope='col'>DATE</th>
          <th scope='col'>TIME</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          mounted === false 
          ? <tr className='h-80'>
              <td colSpan={6}><FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...</td>
            </tr> 
          : (
            response.length === 0 
            ? <tr className='h-80'><td colSpan={6}>There are no races available for betting. Try again later.</td></tr>
            : (response.map( row => (
                <tr key={row.id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{row.race_tag}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>
                    <Link to="/main/horses" state={{ race_id: row.id }} className='cursor-pointer hover:underline'>
                      Participants
                    </Link>
                  </td>
                </tr>
                ))
              )
            )
        }
      </tbody>
    </table>
  )
}

export default NewBet