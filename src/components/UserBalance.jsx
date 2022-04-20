import React from 'react'

const UserBalance = () => {
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);    
    const [imageURL, setImageURL] = React.useState("");
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    const client_id = 1;

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/client/${client_id}`, {
            headers:{
                Authorization: 'Bearer ' + token,
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setResponse(data);
            fetch(`http://127.0.0.1:5000/static/images/${data.image}`, {
                headers:{
                    Authorization: 'Bearer ' + token,
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
                alert(error);
            });
        })
        .catch(e => {
            setError(e);
            alert(error);
        });
    }, [token, error, client_id])
    

  return (
    <div className='custom-flex-col self-center flex flex-col items-center font-montaga text-xl
        lg:custom-flex-row lg:flex-row lg:mr-20 lg:mt-3'>
        <img src={imageURL} alt="client_image"
            className='max-w-very-small mb-2 rounded-lg border-4 border-amarillo-claro 
            lg:mr-5'/>
        <p className='flex items-center text-center xl:flex-col'>
            Account&nbsp;Balance <br /> {response?.cash} €
        </p>
    </div>
  )
}

export default UserBalance