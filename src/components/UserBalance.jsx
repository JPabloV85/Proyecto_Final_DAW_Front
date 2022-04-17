import React from 'react'
import foto from '../image/foto12.jpg'

const UserBalance = () => {
    /*
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/client/${username}`, {
            credentials: 'include',
            headers:{
                Authorization: 'Bearer ' + token,
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setResponse(data);
            setError(null);
        })
        .catch(error => {
            setError(error);
            alert(error);
        });
    }, [token, username])
    */

  return (
    <div className='custom-flex-col self-center flex flex-col items-center font-montaga text-xl
        xl:custom-flex-row xl:flex-row xl:mr-20 xl:mt-3'>
        <img src={/*response?.image*/    foto} alt="client_image"
            className='max-w-very-small mb-2 rounded-lg border-4 border-amarillo-claro 
            xl:mr-5'/>
        <p className='flex items-center text-center xl:flex-col'>
            Account&nbsp;Balance <br /> {/*response?.cash*/    500} €
        </p>
    </div>
  )
}

export default UserBalance