import React from 'react'
import { MyContext } from './helpers/MyContext';

const ClientBalance = () => {
    const [error, setError] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
    const token = localStorage.getItem("access_token");

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/client/my_balance', {
            headers:{
                Authorization: 'Bearer ' + token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.message);
            setClientBalance(data.cash);            
            fetch(`http://127.0.0.1:5000/static/images/${data.image}`, {
                headers:{
                    Authorization: token
                },
                method: "GET"
            })
            .then(response => response.blob())
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImageURL(imageObjectURL);
                setError(null);
            });
        })
        .catch(e => {
            setError(e.message);
            console.log(error);
        });
    }, [token, error, clientBalance, setClientBalance])
    

  return (
    <div className='custom-flex-col self-center flex flex-col items-center font-montaga text-xl
        lg:custom-flex-row lg:flex-row lg:mr-20 lg:mt-3'>
        <img src={imageURL} alt="client_image"
            className={
                !dark
                ?'max-w-very-small mb-2 rounded-lg border-4 border-marron lg:mr-5'
                :'max-w-very-small mb-2 rounded-lg border-4 border-amarillo-claro lg:mr-5'
            }/>

        <p className='flex items-center text-center xl:flex-col'>
            Account&nbsp;Balance: {clientBalance} €
        </p>
    </div>
  )
}

export default ClientBalance