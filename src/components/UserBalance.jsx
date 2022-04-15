import React from 'react'
import foto from '../image/foto12.jpg'

const UserBalance = () => {

    const [image, setImage] = React.useState(foto);
    const [balance, setBalance] = React.useState("500");    

    /* const fetchData = () => {
        const token = localStorage.getItem("access_token");
        const username = localStorage.getItem("username");

        fetch(`http://127.0.0.1:5000/client/${username}`, {
            credentials: 'include',
            headers:{
                Authorization: 'Bearer ' + token,
            },
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            setImage (data.image);
            setBalance(data.cash);
        })
    }
    
    React.useEffect(() => {
        fetchData()
    }, []) */


  return (
    <div className='custom-flex-col self-center flex flex-col items-center 
        xl:custom-flex-row xl:flex-row xl:mr-20 xl:mt-3'>
        <img src={image} alt="client_foto" 
            className='max-w-very-small mb-2 rounded-lg border-4 border-amarillo-claro 
            xl:mr-5'/>
        <p className='flex items-center text-center xl:flex-col'>
            Account&nbsp;Balance <br /> {balance} €
        </p>
    </div>
  )
}

export default UserBalance