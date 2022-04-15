import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Main = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  
  /*
  React.useEffect(() => {
    if (token === "undefined") {
      alert("You are not logged in");
      navigate("/login");
    }
      
  }, [token, navigate]);
  */

  return (
    <main className='flex flex-col flex-grow items-center justify-center bg-marron font-montaga text-xl text-amarillo-claro'>

      <Header/>

    </main>
  )
}

export default Main