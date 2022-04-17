import React from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopMenu from './DesktopMenu';
import MyBets from './MyBets';
import NewBet from './NewBet';

const Main = (props) => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  
  /* Esto sirve para cuando entras en /main sin estar logeado te devuelve a /login
  React.useEffect(() => {
    if (token === "undefined" || token === null) {
      alert("You are not logged in");
      navigate("/login");
    }
      
  }, [token, navigate]);
  */

  return (
    <main className='flex-grow bg-marron font-montaga'>
      <DesktopMenu section={props.section}/>
      
      <section>
        <table>
          {
            props.section === "/my_bets" ? <MyBets/>
            : props.section === "/new_bet" ? <NewBet/>
            : null
          }
          
        </table>
      </section>
    </main>
  )
}

export default Main