import React from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopMenu from './DesktopMenu';
import MyBets from './MyBets';

const Main = (props) => {
  const [newUserBalance, setNewUserBalance] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const pullNewUserBalance = (amount) => {
    setNewUserBalance(amount);
  }
  props.reciveNewUserBalance(newUserBalance);

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
          {mounted 
            ?(
              props.section === "/my_bets" ? <MyBets funPullData={pullNewUserBalance}/>
              : null
            )
            :(
              <div className='flex flex-col w-full h-full text-2xl text-marron bg-dorado
              lg:rounded-md lg:text-3xl'>
                <p className='m-auto'>Loading...</p>
              </div>
            )
          }
      </section>
    </main>
    
  )
}

export default Main