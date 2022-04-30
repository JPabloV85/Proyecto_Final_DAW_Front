import React from 'react'

const UserBalance = (props) => {
    const [error, setError] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");
    const [accountBalance, setAccountBalance] = React.useState(null);
    const token = localStorage.getItem("access_token");

    React.useEffect(() => {
        if (props.balanceUpdated !== 0) setAccountBalance(props.balanceUpdated)
    }, [props.balanceUpdated]);

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/client/my_balance', {
            headers:{
                Authorization: 'Bearer ' + token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setAccountBalance(data.cash);            
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
            })
            .catch(e => {
                setError(e);
            });
        })
        .catch(e => {
            setError(e);
        });
    }, [token, error])
    

  return (
    <div className='custom-flex-col self-center flex flex-col items-center font-montaga text-xl
        lg:custom-flex-row lg:flex-row lg:mr-20 lg:mt-3'>
        <img src={imageURL} alt="client_image"
            className='max-w-very-small mb-2 rounded-lg border-4 border-amarillo-claro 
            lg:mr-5'/>

        <p className='flex items-center text-center xl:flex-col'>
            Account&nbsp;Balance: {accountBalance} €
        </p>
    </div>
  )
}

export default UserBalance