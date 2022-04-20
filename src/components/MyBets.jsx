import React from 'react'
import MyBetsRows from './MyBetsRows';

const MyBets = () => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1280);
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const client_id = 1;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
  
  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/client/${client_id}/bets`, {
    headers:{
      Authorization: 'Bearer ' + token,
    },
    method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      setResponse(data);
      setError(null);
      setMounted(true);
    })
    .catch(e => {
      setError(e);
      alert(error);
    });
  }, [token, error, client_id, mounted])
  

  return (
    <table className='w-full border-collapse text-center text-sm text-marron bg-dorado
          sm:text-lg
          md:text-xl
          lg:rounded-md'>
      <caption>Client bets</caption>
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
          : <MyBetsRows response={response} windowWidth={windowWidth}/>          
        }
      </tbody>
    </table>
  )
}

export default MyBets