import React from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopMenu from './DesktopMenu';
import MyBets from './MyBets';
import NewBet from './NewBet';

const Main = (props) => {  
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  React.useEffect(() => {
    if (token === "undefined" || token === null) {
      alert("You are not logged in");
      navigate("/login");
    }
      
  }, [token, navigate]);

  return (
    <main className='flex h-full items-center py-6 overflow-auto font-montaga bg-marron
          lg:pr-5
          xl:pr-10'>
      <DesktopMenu section={props.section}/>
      
      <section className='h-full grow overflow-auto'>
          {
            props.section === "/my_bets" ? <MyBets/>
            : props.section === "/new_bet" ? <NewBet/>
            : null
          }
      </section>
    </main>
  )
}

export default Main