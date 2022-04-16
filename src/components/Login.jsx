import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        
        //TODO provisional prueba navigate
        navigate("/main");

        if (!validate()) return;
        
        fetch("http://127.0.0.1:5000/login", {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
              })
        })
        .then((response) => {
            if(response.ok){
                localStorage.setItem("access_token", response.json().access_token);
                localStorage.setItem("username", username);
                navigate("/main");
            }
        })
        .catch((error) => alert(error));
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
    <main className='flex flex-col flex-grow items-center justify-center bg-marron'>    
        <form
            method="post"
            onSubmit={login}
            className="flex flex-col items-end text-white font-montaga">

            <h1 className="self-center mb-16 text-5xl text-amarillo-claro ">
                Sign in
            </h1>
            {
                error && (
                    <div className='self-center -mt-5 mb-7 text-xl text-amarillo-claro'>
                        {error}
                    </div>
                )
            } 
            <fieldset className='mb-4'>
                <label htmlFor="username" className='text-xl lg:text-2xl'>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="custom-input lg:w-64"
                />
            </fieldset>
            <fieldset className='mb-4'>
                <label htmlFor="password" className='text-xl lg:text-2xl'>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input lg:w-64"
                />
            </fieldset>
            <button type="submit" className='mt-10 text-3xl text-amarillo-claro hover:underline'>
                Send
            </button>        
        </form>
    </main>
  )
}

export default Login