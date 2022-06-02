import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../helpers/MyContext';

const ClientProfile = () => {
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");
    const [mounted, setMounted] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
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
            if (data.error) throw new Error(data.message);
            setResponse(data);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setPassword(data.user.password);
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
            })
        })
        .catch(e => {
            setError(e.message);
            console.log(error);
        });
    }, [token, submitted])

    const submit = (e) => {
        e.preventDefault();
        const formData  = new FormData(document.querySelector("form"));
        if (!validate(formData)) return;

        fetch("http://127.0.0.1:5000/api/user/update", {
            headers:{
                Authorization: 'Bearer ' + token
            },
            method: "PATCH",
            body: formData
        })
        .then(response => {
            if (!response.ok) return response.json().then(error => { throw new Error(error) })
            alert("Changes saved!");
            setSubmitted(!submitted);
            setError(null);
        })
        .catch(e => {
            if (e.message === "UNIQUE constraint failed: user.username") {
                setError("USERNAME ALREADY IN USE.");
            }
            if (e.message === "UNIQUE constraint failed: user.email") {
                setError("E-MAIL ALREADY IN USE.");
            }
        });
    }

    function validate(data) {
        if (!data.get("username").trim()) {
            setError("Field Username cannot be empty.");
            return false;
        }
        if (!data.get("email").trim()) {
            setError("Field Email cannot be empty.");
            return false;
        }
        if (!data.get("password").trim()) {
            setError("Field Password cannot be empty.");
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
                <form method="post" onSubmit={submit} 
                    className={
                        !dark
                        ? 'grow flex flex-col items-center space-y-3 py-3 rounded-sm text-marron bg-dorado border-4 border-marron'
                        : 'grow flex flex-col items-center space-y-3 py-3 rounded-sm text-marron bg-amarillo-claro'
                    }>
                    <fieldset>
                        <label htmlFor="image">
                            <img src={imageURL} alt="client_image" className='max-w-small rounded-sm border-8 border-dorado'/>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="custom-input border-b-0 text-lg text-slate-500 lg:w-64"
                            />
                        </label>
                    </fieldset>

                    <div className={!dark ? 'w-full flex bg-marron text-amarillo-claro' : 'w-full flex bg-dorado'}>
                        <div className='flex flex-col items-end w-2/3'>
                            <h3>TOTAL BETS:</h3>
                            <h3>WON BETS:</h3>
                            <h3>MONEY EARNED:</h3>
                            <h3>BALANCE:</h3>
                        </div>
                        <div className='flex flex-col items-start w-1/2 ml-3'>
                            <p>{response.number_of_bets}</p>
                            {
                                response.wonBets !== 0
                                ? <p>{response.wonBets} ({(response.wonBets / response.number_of_bets * 100).toFixed(2)}%)</p>
                                : <p>{response.wonBets}</p>
                            }
                            <p>{response.moneyEarned} €</p>
                            <p>{response.cash} €</p>
                        </div>
                    </div>

                    { error && ( <p> {error} </p> ) }

                    <fieldset className='flex flex-col items-end space-y-3 mx-3'>
                        <label htmlFor="username">
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
                        <label htmlFor="email">
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
                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                <form method="post" onSubmit={submit}                
                className={
                    !dark
                    ? 'grow flex flex-col space-y-10 p-5 rounded-sm text-marron bg-dorado border-4 border-marron lg:mb-24 lg:mr-10'
                    : 'grow flex flex-col space-y-10 p-5 rounded-sm text-marron bg-amarillo-claro lg:mb-24 lg:mr-10'
                }>
                    <div className='flex justify-evenly items-center'>
                        <fieldset>
                            <label htmlFor="image">
                                <img src={imageURL} alt="client_image" className='max-w-mid rounded-sm border-8 border-dorado'/>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="custom-input border-b-0 text-lg text-slate-500 lg:w-64"
                                />
                            </label>
                        </fieldset>

                        <fieldset className='flex flex-col items-end space-y-3'>
                            { error && ( <p className='self-center'> {error} </p> ) }
                            <label htmlFor="username">
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
                            <label htmlFor="email">
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
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="custom-input invert-0 lg:w-64"
                                />
                            </label>

                            <div className={
                                !dark
                                ? 'w-full flex rounded-sm pr-5 drop-shadow-[2px_2px_1px] bg-marron text-amarillo-claro'
                                : 'w-full flex rounded-sm pr-5 drop-shadow-[2px_2px_1px] bg-dorado'
                            }>
                                <div className='flex flex-col items-end w-2/3 pr-4'>
                                    <h3>TOTAL BETS:</h3>
                                    <h3>WON BETS:</h3>
                                    <h3>MONEY EARNED:</h3>
                                    <h3>BALANCE:</h3>
                                </div>
                                <div className='flex flex-col items-start w-1/3'>
                                    <p>{response.number_of_bets}</p>
                                    {
                                        response.wonBets !== 0 
                                        ? <p>{response.wonBets} ({(response.wonBets / response.number_of_bets * 100).toFixed(2)}%)</p>
                                        : <p>{response.wonBets}</p>
                                    }
                                    <p>{response.moneyEarned} €</p>
                                    <p>{response.cash} €</p>
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