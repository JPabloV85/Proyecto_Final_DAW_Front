import React from 'react'

const Horses = () => {
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const token = localStorage.getItem("access_token");
  const race_id = 1;
  
  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/run/${race_id}`, {
      headers:{
        Authorization: 'Bearer ' + token,
      },
      method: "GET"
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
    });
  }, [token, error])

  const makeBet = () => {
      /*Hacer fetch a create bet
      nacesito la id del cliente, la id del run y la id del acballo
      ademas de capturar la amount y la position introducida en la tabla*/
    return null
  }
  

  return (
    <table className='w-full text-center text-sm text-marron bg-dorado
          sm:text-lg
          md:text-xl
          lg:rounded-md'>
      <caption className='hidden'>Signed horses to compete</caption>
      <thead className='h-14'>
        <tr>
          <th scope='col'>HORSE NAME</th>
          <th scope='col'>WIN RATIO</th>
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
            : (response.horses.map( horseRow => (
                <tr key={horseRow.id} className='h-14 even:bg-amarillo-oscuro'>
                  <td>{horseRow.name}</td>
                  <td>{horseRow.win_ratio}%</td>
                  <td>
                    <select name="postion" id="position" className='w-1/2 border-2 border-marron'>
                    {(() => {
                        for (let i = 1; i <response.horses.length; i++) {
                            <option value={i}>{i}</option>
                        }
                    })()}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" name="amount" id="amount" className='w-1/2 border-2 border-marron' /> €
                  </td>
                  <td>
                    <button onClick={() => makeBet()}
                      className='w-16 h-8 mb-1 rounded button-shadow bg-dorado sm:w-20 sm:h-10'
                      >
                      BET
                    </button>
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