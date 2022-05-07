import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

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
            if (data.error) {
                setError(data.message);
                return
            }
            localStorage.setItem("access_token", data.access_token);
            alert("Login successful!");
            navigate("/main/my_bets");
        })
        .catch(e => {
            setError(e);
            alert(error);
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
    <main className='flex flex-grow items-center justify-center px-5 pb-5 bg-marron'>    
        <form method="post" onSubmit={login} className="flex flex-col items-center font-montaga text-white">
            <fieldset className='flex flex-col items-center text-xl lg:text-2xl'>
                <legend className="m-auto mb-14 text-5xl text-amarillo-claro">
                    Sign in
                </legend>
                {
                    error && (
                        <p className='-mt-6 mb-8 text-center text-xl text-amarillo-claro'>
                            {error}
                        </p>
                    )
                }
                <div className='flex flex-col items-end'>
                    <label htmlFor="username" className='mb-3'>
                        Username
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="custom-input lg:w-64"
                        />
                    </label> 
                    <label htmlFor="password">
                        Password
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input lg:w-64"
                        />
                    </label>
                    <button type="submit" className='self-end mt-10 text-3xl text-amarillo-claro hover:underline'>
                        Send
                    </button> 
                </div>
            </fieldset>
        </form>
    </main>
  )
}

export default Login