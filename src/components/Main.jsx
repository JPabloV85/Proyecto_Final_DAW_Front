import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DesktopMenu from './DesktopMenu';
import MyBets from './MyBets';
import NewBet from './NewBet';
import Horses from './Horses';
import HorseDetail from './HorseDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ClientProfile from './ClientProfile';
import { MyContext } from './helpers/MyContext'

const Main = (props) => {
  const [mounted, setMounted] = React.useState(false);  
  const location = useLocation();
  const {race_id} = location.state !== null ? location.state : 0;
  const {horse_id} = location.state !== null ? location.state : 0;
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);

  React.useEffect(() => {
    if (token === "undefined" || token === null) {
      alert("You are not logged in");
      navigate("/login");
    }
    setMounted(true);
  }, [token, navigate]);

  return (
    <main className={
      props.section !== "/horse_detail" && props.section !== "/profile"
      ? (
          !dark
          ? 'flex h-full items-center py-5 overflow-auto font-montaga bg-amarillo-claro lg:pr-5 xl:pr-10'
          : 'flex h-full items-center py-5 overflow-auto font-montaga bg-marron lg:pr-5 xl:pr-10'
        )
      : (
          !dark
          ? 'flex h-full items-center overflow-auto font-montaga bg-amarillo-claro'
          : 'flex h-full items-center overflow-auto font-montaga bg-marron'
        )
    }>
      { props.section !== "/horse_detail" && <DesktopMenu section={props.section}/>}
      
      <section className={
        props.section !== "/horse_detail" && props.section !== "/profile"
        ? 'h-full grow overflow-auto'
        : 'flex justify-center grow p-3'
      }>
        {!mounted 
          ?(
            <div className='flex flex-col w-full h-full text-2xl text-marron bg-dorado
              lg:rounded-md lg:text-3xl'>
              <p className='m-auto'><FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...</p>
            </div>
          )
          :(
            props.section === "/my_bets" ? <MyBets/>
            : props.section === "/new_bet" ? <NewBet/>
            : props.section === "/horses" ? <Horses race_id={race_id}/>
            : props.section === "/horse_detail" ? <HorseDetail horse_id={horse_id}/>
            : props.section === "/profile" ? <ClientProfile/>
            : null
          )
        }
      </section>
    </main>
  )
}

export default Main