import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nif, setNif] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [birth, setBirthDate] = React.useState("");
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const submit = (e) => {        
        e.preventDefault();        
        if (!validate()) return;

        fetch("http://127.0.0.1:5000/api/client", {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                cif: nif,
                password: password,
              })
        })
        .then((response) => {
            if(response.ok){
                alert("Registration successful!");
                navigate("/main");
            }
        })
        .catch((error) => alert(error));
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
        if (!password.trim()) {
            setError("Field Password cannot be empty.");
            return false;
        }
        if (password.length < 6) {
            setError("Your password must contain 6 or more characters.");
            return
          }
        if (password !== confirm) {
            setError("Fields Password and Confirm do not match.");
            return false;
        }
        if (!birth.trim()) {
            setError("Field Birth date cannot be empty.");
            return false;
        }
        if (getAge(birth) < 18) {
            setError("You have to be over 18 years old to register.");
            return false;
        }
        if (nifImage == null) {
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
    <main className='flex flex-col flex-grow items-center justify-center bg-marron'>
        <form 
            method="post"
            onSubmit={submit}
            className="flex flex-col items-end text-white font-montaga">

            <h1 className="self-center mb-10 text-5xl text-amarillo-claro ">
                Sign up
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
                <label htmlFor="nif" className='text-xl lg:text-2xl'>
                    NIF
                </label>
                <input
                    type="text"
                    id="nif"
                    name="nif"
                    onChange={(e) => setNif(e.target.value)}
                    className="custom-input lg:w-64"
                />
            </fieldset>
            <fieldset className='mb-4'>
                <label htmlFor="email" className='text-xl lg:text-2xl'>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
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
            <fieldset className='mb-4'>
                <label htmlFor="confirm" className='text-xl lg:text-2xl'>
                    Confirm
                </label>
                <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    onChange={(e) => setConfirm(e.target.value)}
                    className="custom-input lg:w-64"
                />
            </fieldset>
            <fieldset className='mb-4'>
                <label htmlFor="birth" className='text-xl lg:text-2xl'>
                    Birth date
                </label>
                <input
                    type="date"
                    id="birth"
                    name="birth"
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="custom-input lg:w-64"
                />
            </fieldset>
            <fieldset className='mb-4'>
                <label htmlFor="image" className='text-xl lg:text-2xl'>
                    NIF Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="biimagerth"
                    className="custom-input border-b-0 invert-0 text-white lg:w-64"
                />
            </fieldset>
            <button type="submit" className='mt-4 text-3xl text-amarillo-claro hover:underline'>
                Send
            </button>
        </form>
    </main>
  )
}

export default Register