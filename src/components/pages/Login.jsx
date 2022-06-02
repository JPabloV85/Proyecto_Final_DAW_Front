import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../helpers/MyContext';

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

    const login = (e) => {
        e.preventDefault();
        if (!validate()) return;

        fetch("http://127.0.0.1:5000/login", {
            headers:{
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.message);
            localStorage.setItem("access_token", data.access_token);
            alert("Login successful!");
            setError(null);
            navigate("/main/my_bets");
        })
        .catch(e => {
            setError(e.message);
        });
    }

    function validate() {
        if (!username.trim()) {
          setError("Field username cannot be empty.");
          return false;
        }
        if (!password.trim()) {
          setError("Field password cannot be empty.");
          return false;
        }
        setError(null);
        return true;
    }

  return (
    <main className={
        !dark
        ?'flex flex-grow items-center justify-center px-5 pb-5 bg-amarillo-claro'
        :'flex flex-grow items-center justify-center px-5 pb-5 bg-marron'
    }>    
        <form method="post" onSubmit={login} 
            className={
                !dark
                ? "flex flex-col items-center font-montaga text-marron"
                : "flex flex-col items-center font-montaga text-white"
            }>
            <fieldset className='flex flex-col items-center text-xl lg:text-2xl'>
                <legend className={!dark ? "m-auto mb-14 text-5xl text-marron": "m-auto mb-14 text-5xl text-amarillo-claro"}>
                    Sign in
                </legend>
                {
                    error && (
                        <p className={
                            !dark
                            ? '-mt-6 mb-8 text-center text-xl text-red-600'
                            : '-mt-6 mb-8 text-center text-xl text-amarillo-claro'
                        }>
                            {error}
                        </p>
                    )
                }
                <div className='flex flex-col items-end'>
                    <label htmlFor="username" className='mb-3'>
                        Username*
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label> 
                    <label htmlFor="password">
                        Password*
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <p className='self-center mt-5 text-sm'>required*</p>
                    <button type="submit" className={!dark ? 'self-end mt-5 text-3xl text-marron hover:underline' : 'self-end mt-5 text-3xl text-amarillo-claro hover:underline'}>
                        Send
                    </button>                    
                </div>
            </fieldset>            
        </form>
    </main>
  )
}

export default Login