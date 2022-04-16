import React from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  
  /* Esto sirve para cuando entras en /main sin estar logeado te devuelve a /login
  React.useEffect(() => {
    if (token === "undefined") {
      alert("You are not logged in");
      navigate("/login");
    }
      
  }, [token, navigate]);
  */


  /*  TODO 
    meter rutas para los links del menu
    que metan en main las tablas
  */
  return (
    <main className='flex flex-grow items-center justify-center bg-marron font-montaga text-xl text-amarillo-claro'>
    </main>
  )
}

export default Main