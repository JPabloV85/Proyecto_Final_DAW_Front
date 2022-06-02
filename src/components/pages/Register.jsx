import React from 'react'
import { MyContext } from '../helpers/MyContext';

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nif, setNif] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [birth, setBirthDate] = React.useState("");
    const [error, setError] = React.useState(null);
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

    const submit = (e) => {
        e.preventDefault();
        const formData  = new FormData(document.querySelector("form"));
        if (!validate(formData)) return;
        
        fetch("http://127.0.0.1:5000/api/user/register", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) return response.json().then(error => { throw new Error(error) })
            alert("Registration successful!");
            setUsername("");
            setNif("");
            setEmail("");
            setPassword("");
            setConfirm("");
            setBirthDate("");
            setError(null);
        })
        .catch(e => {
            if (e.message === "UNIQUE constraint failed: user.username") {
                setError("Username already in use.");
            }
            if (e.message === "UNIQUE constraint failed: client.cif") {
                setError("NIF already in use.");
            }
            if (e.message === "UNIQUE constraint failed: user.email") {
                setError("E-mail already in use.");
            }
        });
    }

    function validate(data) {
        if (!data.get("username").trim()) {
            setError("Field Username cannot be empty.");
            return false;
        }
        if (!data.get("nif").trim()) {
            setError("Field NIF cannot be empty.");
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
        if (data.get("password").length < 6) {
            setError("Your password must contain 6 or more characters.");
            return
          }
        if (data.get("password") !== data.get("confirm")) {
            setError("Fields Password and Confirm do not match.");
            return false;
        }
        if (!data.get("birth").trim()) {
            setError("Field Birth date cannot be empty.");
            return false;
        }
        if (getAge(data.get("birth")) < 18) {
            setError("You have to be over 18 years old to register.");
            return false;
        }
        if (data.get("image").size === 0) {
            setError("Please, upload an image of your ID card.");
            return false;
        }
        setError(null);
        return true;
    }

    function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

  return (
    <main className={
        !dark
        ?'flex flex-grow items-center justify-center px-5 pb-5 bg-amarillo-claro'
        :'flex flex-grow items-center justify-center px-5 pb-5 bg-marron'
    }>
        <form method="post" onSubmit={submit} 
            className={
                !dark
                ? "flex flex-col items-center font-montaga text-marron"
                : "flex flex-col items-center font-montaga text-white"
            }>
            <fieldset className='flex flex-col items-center text-xl lg:text-2xl'>
                <legend className={!dark ? "m-auto mb-14 text-5xl text-marron" : "m-auto mb-14 text-5xl text-amarillo-claro"}>
                    Sign up
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <label htmlFor="nif" className='mb-3'>
                        NIF*
                        <input
                            type="text"
                            id="nif"
                            name="nif"
                            value={nif}
                            onChange={(e) => setNif(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <label htmlFor="email" className='mb-3'>
                        Email*
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <label htmlFor="password" className='mb-3'>
                        Password*
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <label htmlFor="confirm" className='mb-3'>
                        Confirm*
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className={!dark ? "custom-input-dark lg:w-64" : "custom-input lg:w-64"}
                        />
                    </label>
                    <label htmlFor="birth" className='mb-3'>
                        Birth date*
                        <input
                            type="date"
                            id="birth"
                            name="birth"
                            value={birth}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className={!dark ? "custom-input-dark text-lg lg:w-64" : "custom-input text-lg lg:w-64"}
                        />
                    </label>
                    <label htmlFor="image">
                        NIF Image*
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className={
                                !dark
                                ? "custom-input border-b-0 invert-0 text-lg text-marron lg:w-64"
                                : "custom-input border-b-0 invert-0 text-lg text-white lg:w-64"
                            }
                        />
                    </label>
                    <p className='self-center mt-5 text-sm'>required*</p>
                    <button type="submit" className={
                        !dark
                        ? 'self-end mt-5 text-3xl text-marron hover:underline'
                        : 'self-end mt-5 text-3xl text-amarillo-claro hover:underline'
                    }>
                        Send
                    </button>
                </div>                
            </fieldset>
        </form>
    </main>
  )
}

export default Register