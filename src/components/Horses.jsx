import React from 'react'
import { ClientBalanceContext } from './helpers/Context';

const Horses = (props) => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const {clientBalance, setClientBalance} = React.useContext(ClientBalanceContext);
  const token = localStorage.getItem("access_token");
  
  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/api/run_horse/getHorses', {
      headers:{
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        race_id: props.race_id
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.message);
        return
      }
      setResponse(data);
      setError(null);
      setMounted(true);
    })
    .catch(e => {
      setError(e);
      console.log(error);
    });
  }, [token, error, clientBalance])

  const makeBet = (index, horse_id) => {
    const amount = document.getElementById("amount"+index).value;
    const position = document.getElementById("position"+index).value;
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
        race_id: props.race_id,
        horse_id: horse_id
      })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.message);
          return
        }
        setClientBalance(data.new_cash);
      })
      .catch(e => {
        setError(e);
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
  

  return (
    <table className='w-full text-center text-sm text-marron bg-dorado
          sm:text-lg
          md:text-xl
          lg:rounded-md'>
      <caption className='hidden'>Signed horses to compete</caption>
      <thead className='h-14'>
        <tr>
          <th scope='col'>HORSE<br />NAME</th>
          <th scope='col'>WIN<br />RATIO</th>
          <th scope='col'>POSITION</th>
          <th scope='col'>AMOUNT</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody className='bg-amarillo-claro'>
        {
          mounted === false 
          ? <tr className='h-80'><td colSpan={6}>Loading...</td></tr> 
          : (
            response.length === 0 
            ? <tr className='h-80'><td colSpan={6}>There are no races available for betting. Try again later.</td></tr>
            : (response.map( (horseRow, index) => (
                <tr key={horseRow.horse_id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{horseRow.horse_name}</td>
                  <td>{horseRow.win_ratio}%</td>
                  <td>
                    <select name={"postion"+index} id={"position"+index} 
                      className='w-12 border-2 border-marron md:w-1/3'>
                      {
                        response.map( (x, i) => (
                          <option key={i} value={i+1}>{i+1}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td>
                    <input type="text" name={"amount" + index} id={"amount"+index} 
                      className='w-14 ml-3 border-2 border-marron sm:w-20' />€
                  </td>
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