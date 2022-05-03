import React from 'react'
import { Link } from 'react-router-dom'

const NewBet = () => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  /*const [windowWidth, setWindowWidth] = React.useState(1280);*/
  const token = localStorage.getItem("access_token");

  /* Esto es para añadir columnas en función del tamaño del viewport
    como en el componente MyBets

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  */
  
  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/run/available`, {
      headers:{
        Authorization: 'Bearer ' + token,
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
  }, [token, error])
  

  return (
    <table className='w-full text-center text-sm text-marron bg-dorado
          sm:text-lg
          md:text-xl
          lg:rounded-md'>
      <caption className='hidden'>Races availables for betting</caption>
      <thead className='h-14'>
        <tr>
          <th scope='col'>RACE TAG</th>
          <th scope='col'>DATE</th>
          <th scope='col'>TIME</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          mounted === false 
          ? <tr className='h-80'><td colSpan={6}>Loading...</td></tr> 
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