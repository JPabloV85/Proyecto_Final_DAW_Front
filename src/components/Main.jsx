import React from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopMenu from './DesktopMenu';
import MyBets from './MyBets';
import NewBet from './NewBet';
import Horses from './Horses';

const Main = (props) => {
  const [mounted, setMounted] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  React.useEffect(() => {
    if (token === "undefined" || token === null) {
      alert("You are not logged in");
      navigate("/login");
    }
    setMounted(true);
  }, [token, navigate]);

  return (
    <main className='flex h-full items-center py-6 overflow-auto font-montaga bg-marron
          lg:pr-5
          xl:pr-10'>
      <DesktopMenu section={props.section}/>
      
      <section className='h-full grow overflow-auto'>
        {!mounted 
          ?(
            <div className='flex flex-col w-full h-full text-2xl text-marron bg-dorado
              lg:rounded-md lg:text-3xl'>
              <p className='m-auto'>Loading...</p>
            </div>
          )
          :(
            props.section === "/my_bets" ? <MyBets/>
            : props.section === "/new_bet" ? <NewBet/>
            : props.section === "/horses" ? <Horses/>
            : null
          )
        }
      </section>
    </main>
    
  )
}

export default Main