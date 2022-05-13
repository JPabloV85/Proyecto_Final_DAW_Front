import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './helpers/MyContext';

const ClientProfile = () => {
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");
    const [mounted, setMounted] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nif, setNif] = React.useState("");
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}] = React.useContext(MyContext);
    const token = localStorage.getItem("access_token");

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/client/profile', {
            headers:{
                Authorization: 'Bearer ' + token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setResponse(data);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setNif(data.cif);
            fetch(`http://127.0.0.1:5000/static/images/${data.image}`, {
                headers:{
                    Authorization: 'Bearer ' + token
                },
                method: "GET"
            })
            .then(response => response.blob())
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImageURL(imageObjectURL);
                setMounted(true);
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

    const submit = (e) => {        
        e.preventDefault();        
        if (!validate()) return;

        fetch("http://127.0.0.1:5000/api/user/update_profile", {
            headers:{
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                username: username,
                email: email,
                cif: nif
            })
        })
        .then(response => {
            if(response.ok) alert("Changes saved!");
            if(response.json()?.error) {
                setError(response.json()?.message);
                return
            }
        })
        .catch(e => {
            setError(e.message);
            console.log(error);
        });
    }

    function validate() {
        const nifImage = document.querySelector("input[type=file]").files[0];
        if (!username.trim()) {
            setError("Field Username cannot be empty.");
            return false;
        }
        if (!nif.trim()) {
            setError("Field NIF cannot be empty.");
            return false;
        }
        if (!email.trim()) {
            setError("Field Email cannot be empty.");
            return false;
        }
        setError(null);
        return true;
    }


  
    return (
        !mounted
        ? (
            <div className=' text-center text-2xl text-amarillo-claro lg:text-3xl'>
                <FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...
            </div>
        )
        : (
            windowWidth < 700
            ?(
                <form className='flex flex-col items-center space-y-3 py-3 grow rounded-sm text-marron bg-amarillo-claro'>
                    <fieldset>
                        <label htmlFor="image">
                            <img src={imageURL} alt="horse_image" className='max-w-small rounded-sm border-8 border-dorado'/>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="custom-input border-b-0 text-lg text-slate-500 lg:w-64"
                            />
                        </label>
                    </fieldset>

                    <div className='w-full flex justify-center bg-dorado'>
                        <div className='flex flex-col items-end w-1/2'>
                            <h3>TOTAL BETS:</h3>
                            <h3>WON BETS:</h3>
                            <h3>MONEY EARNED:</h3>
                            <h3>BALANCE:</h3>
                        </div>
                        <div className='flex flex-col items-start w-1/2'>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.runs_horses.length}</p>
                            {
                                response.wonBets !== 0
                                ?   <p>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{response.wonBets} 
                                        &nbsp;({(response.wonBets / response.runs_horses.length * 100).toFixed(2)}%)
                                    </p>
                                : <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.wonBets}</p>
                            }
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.moneyEarned} €</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.cash} €</p>
                        </div>
                    </div>

                    <fieldset className='flex flex-col items-end mx-3'>
                        <label htmlFor="username" className='mb-3'>
                            Username
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="custom-input invert-0 lg:w-64"
                            />
                        </label>
                        <label htmlFor="email" className='mb-3'>
                            E-mail
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="custom-input invert-0 lg:w-64"
                            />
                        </label>
                        <label htmlFor="nif" className='mb-3'>
                            NIF
                            <input
                                type="text"
                                id="nif"
                                name="nif"
                                value={nif}
                                onChange={(e) => setNif(e.target.value)}
                                className="custom-input invert-0 lg:w-64"
                            />
                        </label>
                        
                    </fieldset>

                    <button type="submit" className='self-end mr-5 hover:underline'>
                        Save changes
                    </button>
                </form>
            )
            : (
                <form method="post" onSubmit={submit} className='flex flex-col space-y-10 p-5 grow rounded-sm text-marron bg-amarillo-claro lg:mb-24 lg:mr-10'>
                    <div className='flex justify-evenly items-center'>
                        <fieldset>
                            <label htmlFor="image">
                                <img src={imageURL} alt="horse_image" className='max-w-mid rounded-sm border-8 border-dorado'/>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="custom-input border-b-0 text-lg text-slate-500 lg:w-64"
                                />
                            </label>
                        </fieldset>
                        

                        <fieldset className='flex flex-col items-end'>
                            <label htmlFor="username" className='mb-3'>
                                Username
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="custom-input invert-0 lg:w-64"
                                />
                            </label>
                            <label htmlFor="email" className='mb-3'>
                                E-mail
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="custom-input invert-0 lg:w-64"
                                />
                            </label>
                            <label htmlFor="nif" className='mb-3'>
                                NIF
                                <input
                                    type="text"
                                    id="nif"
                                    name="nif"
                                    value={nif}
                                    onChange={(e) => setNif(e.target.value)}
                                    className="custom-input invert-0 lg:w-64"
                                />
                            </label>

                            <div className='w-full flex justify-center mt-5 rounded-sm drop-shadow-[2px_2px_1px] bg-dorado'>
                                <div className='flex flex-col items-end w-1/2'>
                                    <h3>TOTAL BETS:</h3>
                                    <h3>WON BETS:</h3>
                                    <h3>MONEY EARNED:</h3>
                                    <h3>BALANCE:</h3>
                                </div>
                                <div className='flex flex-col items-start w-1/2'>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.runs_horses.length}</p>
                                    {
                                        response.wonBets !== 0 
                                        ?   <p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;{response.wonBets} 
                                                &nbsp;({(response.wonBets / response.runs_horses.length * 100).toFixed(2)}%)
                                            </p>
                                        : <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.wonBets}</p>
                                    }
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.moneyEarned} €</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{response.cash} €</p>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <button type="submit" className='self-end mr-6 hover:underline'>
                        Save changes
                    </button>
                </form>
            )
        )
    )
}

export default ClientProfile