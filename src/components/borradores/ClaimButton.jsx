import React from 'react'

const ClaimButton = (props) => {
    const [newUserBalance, setNewUserBalance] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [isClaimed, setIsClaimed] = React.useState(false);
    const token = localStorage.getItem("access_token");

    props.funNewUserBalance(newUserBalance);

    const patchEntities = (amount, bet_id) => {
        patchBetClaimed(bet_id);
        patchClientCash(amount);
    }
    
    const patchBetClaimed = (bet_id) => {
        fetch('http://127.0.0.1:5000/api/bet/update_claimed', {
            headers:{
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                idBet: bet_id
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.message);
                return
            }
            setIsClaimed(true);
            setError(null);
        })
        .catch(e => {
            setError(e);
            alert(error);
        });
    }
    
    const patchClientCash = (amount) => {
        fetch('http://127.0.0.1:5000/api/client/update_cash', {
            headers:{
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                reward: amount
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.message);
                return
            }
            setNewUserBalance(data.new_cash);
            setError(null);
        })
        .catch(e => {
          setError(e);
          alert(error);
        });
    }

    
    return (
        !isClaimed
        ?(
            props.row.win
            ? (
                props.row.claimed
                ? (
                    <button onClick={() => patchEntities(props.row.payment_amount, props.row.id)} disabled
                        className='w-20 h-8 mb-1 rounded-lg text-slate-500 bg-slate-300 sm:w-24 sm:h-10 md:w-28 cursor-not-allowed'
                    >
                        CLAIMED
                    </button>
                )
                : (
                    <button onClick={() => patchEntities(props.row.payment_amount, props.row.id)}
                        className='w-16 h-8 mb-1 rounded-lg bg-dorado sm:w-20 sm:h-10'
                    >
                        CLAIM
                    </button>
                )
            )
            : (
                <button onClick={() => patchEntities(props.row.payment_amount, props.row.id)} disabled
                className='w-16 h-8 mb-1 rounded-lg text-slate-500 bg-slate-300 sm:w-20 sm:h-10 cursor-not-allowed'
                >
                CLAIM
                </button>
            )
        )
        : (
            <button onClick={() => patchEntities(props.row.payment_amount, props.row.id)} disabled
                className='w-20 h-8 mb-1 rounded-lg text-slate-500 bg-slate-300 sm:w-24 sm:h-10 md:w-28 cursor-not-allowed'
            >
                CLAIMED
            </button>
        )
    )
}

export default ClaimButton