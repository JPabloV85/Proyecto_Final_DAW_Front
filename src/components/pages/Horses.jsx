import React from 'react'
import { MyContext } from '../helpers/MyContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Horses = (props) => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
  const race_id = props.race_id;
  const token = localStorage.getItem("access_token");
  
  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/api/run_horse/getParticipants', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        race_id: race_id
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.message);
      setResponse(data);
      setError(null);
      setMounted(true);
    })
    .catch(e => {
      setError(e.message);
      console.log(error);
    });
  }, [token, error, clientBalance, race_id])

  const makeBet = (index, horse_id) => {
    const amount = document.getElementById("amount"+index).value;
    const position = document.getElementById("position"+index).value;
    const profit = document.getElementById("profit"+index).innerHTML.substring(1);

    if (position == '0') return alert("You must set your guessed position.");
    if (!validateAmount(amount)) return;

    if (window.confirm("Do you really want to make a new bet?")) {
      fetch('http://127.0.0.1:5000/api/bet/client_new_bet', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        bet_amount: amount,
        bet_position: position,
        benefit_ratio: profit,
        race_id: props.race_id,
        horse_id: horse_id
      })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) throw new Error(data.message);
        setClientBalance(data.new_cash);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
      });
    }
  }

  const validateAmount = (amount) => {
    if (amount === '' || isNaN(amount) || parseFloat(amount) <= 0){
      alert("That is not a valid amount");
      return false;
    } 
    if (parseFloat(amount) > parseFloat(clientBalance)) {
      alert("You don´t have enough cash");
      return false;
    }
    return true;
  }

  const calculateProfit = (resp, pos, horse_id) => {
    var horseRatio = 0;
    var totalPosition = 0;
    var times = 0;
    if (pos != 0) {
      resp.forEach(horse => {
        if (pos == 1) {times = horse.timesFirst} 
        else if (pos == 2) {times = horse.timesSecond} 
        else if (pos == 3) {times = horse.timesThird} 
        else {times = horse.timesOtherPosition};
        horse.runs_completed != 0 ? totalPosition += ((times/horse.runs_completed).toFixed(2)*100) : totalPosition += 0;
      });
      resp.forEach(horse => {
        let individualPosition = 0;
        if (pos == 1) {times = horse.timesFirst} 
        else if (pos == 2) {times = horse.timesSecond} 
        else if (pos == 3) {times = horse.timesThird} 
        else {times = horse.timesOtherPosition};

        if(horse_id === horse.horse_id){
          horse.runs_completed != 0 && (individualPosition = ((times/horse.runs_completed).toFixed(2)*100));
          horseRatio = (100 /((individualPosition*100)/totalPosition)).toFixed(2);
          if (individualPosition < 1) horseRatio = 100;
        }
      });
    }
    return horseRatio
  }

  return (
    <table className={
      !dark
      ? 'w-full text-center text-sm text-marron bg-dorado sm:text-lg md:text-xl lg:rounded-md border-2 border-amarillo-oscuro'
      : 'w-full text-center text-sm text-marron bg-dorado sm:text-lg md:text-xl lg:rounded-md'
    }>
      <caption className='hidden'>Signed horses to compete</caption>
      <thead className={!dark ? 'h-14 text-dorado bg-marron' : 'h-14'}>
        <tr>
          <th scope='col'>HORSE<br />NAME</th>
          { windowWidth >= 600 && (<th scope='col'>WIN<br />RATIO</th>) }
          <th scope='col'>POSITION</th>
          <th scope='col'>AMOUNT</th>
          <th scope='col'>PROFIT</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          mounted === false 
          ? <tr className='h-80'>
              <td colSpan={6}><FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...</td>
            </tr> 
          : (
            response.length === 0 
            ? <tr className='h-80'><td colSpan={6}>There are no races available for betting. Try again later.</td></tr>
            : (response.map( (horseRow, index) => (
                <tr key={horseRow.horse_id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>
                    <Link to="/main/horse_detail" state={{ horse_id: horseRow.horse_id }} className='cursor-pointer hover:underline'>
                      {horseRow.horse_name}
                    </Link>
                  </td>
                  { windowWidth >= 600 && (<td>{horseRow.win_ratio}%</td>) }
                  <td>
                    <select  id={"position"+index} className='w-12 border-2 border-marron md:w-1/3'
                      onChange={function () {
                        let position = document.querySelector("#position"+index).value;
                        let tdProfit = document.querySelector("#profit"+index);
                        tdProfit.innerHTML = "x" + calculateProfit(response, position, horseRow.horse_id);
                    }}>
                      <option value='0'>--</option>
                      {
                        response.map((x, i) => (
                          <option key={i} value={i+1}>{i+1}</option>
                        ))
                      }
                    </select>
                  </td>                  
                  <td>
                    <input type="text" name={"amount" + index} id={"amount"+index} 
                      className='w-14 ml-3 border-2 border-marron sm:w-20' />€
                  </td>
                  <td id={'profit'+index}>x0</td>
                  <td>
                    {
                      horseRow.bet_done
                      ? (
                        <button disabled
                          className='w-14 h-8 mr-2 rounded button-shadow text-slate-500 bg-slate-300 cursor-not-allowed
                          sm:w-20 sm:h-10'
                        >
                          DONE
                        </button>
                      )
                      : (
                        <button onClick={() => makeBet(index, horseRow.horse_id)}
                          className='w-12 h-8 mr-2 rounded button-shadow bg-dorado sm:w-20 sm:h-10'
                          >
                          BET
                        </button>
                      )
                    }
                  </td>
                </tr>
                ))
              )
            )
        }
      </tbody>
    </table>
  )
}

export default Horses