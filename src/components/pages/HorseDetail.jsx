import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../helpers/MyContext';

const HorseDetail = (props) => {
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");
    const [mounted, setMounted] = React.useState(false);
    const [{clientBalance, setClientBalance}, {windowWidth, setWindowWidth}, {dark, setDark}] = React.useContext(MyContext);
    const horse_id = props.horse_id;
    const token = localStorage.getItem("access_token");

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/horse/detail/${horse_id}`, {
            headers:{
                Authorization: 'Bearer ' + token
            },
            method: "GET"
        })
        .then(response => response.json())
        .then(data => { 
            if (data.error) throw new Error(data.message);
            setResponse(data);          
            fetch(`http://127.0.0.1:5000/static/images/${data.image}`, {
                headers:{
                    Authorization: token
                },
                method: "GET"
            })
            .then(response => response.blob())
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImageURL(imageObjectURL);
                setMounted(true);
                setError(null);
            });
        })
        .catch(e => {
            setError(e.message);
            console.log(error);
        });
    }, [token, error, horse_id])

    return (
        !mounted
        ? (
            <div className=' text-center text-2xl text-dorado lg:text-3xl'>
                <FontAwesomeIcon icon={faCog} color='copper' spin/> Loading...
            </div>
        )
        : (
            windowWidth < 700
            ?(
                <div className={
                    !dark
                    ? 'flex flex-col items-center space-y-3 p-4 grow rounded-sm text-dorado bg-marron'
                    : 'flex flex-col items-center space-y-3 p-4 grow rounded-sm text-marron bg-dorado'
                }>
                    <img src={imageURL} alt="horse_image" className={windowWidth < 410 ?'max-w-mid rounded-md':'max-w-xmid rounded-md'}/>
                    <div className='w-full space-y-3 tablet:flex justify-evenly'>
                        <div className='flex flex-col items-center space-y-2'>                            
                            <p className='text-2xl'>{response.name}</p>
                            <div className='text-center text-sm tablet:text-left'>
                                <p>BREED: {response.breed}</p>
                                <p>AGE: {response.age} months</p>
                                <p>STUD: {response.stud.name}, {response.stud.location}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <p>Total races: {response.timesFirst + response.timesSecond + response.timesThird + response.timesOtherPosition}</p>
                            <div className='flex justify-between space-x-2 text-5xl'>                    
                                <div className='relative flex flex-col items-center mt-5'>
                                    <FontAwesomeIcon icon={faTrophy} color='silver' filter='drop-shadow(2px 2px 1px black)'/>
                                    <p className={!dark ? 'absolute text-2xl text-marron' : 'absolute text-2xl'}>{response.timesSecond}</p>
                                </div>
                                <div className='relative flex flex-col items-center mb-5'>
                                    <FontAwesomeIcon icon={faTrophy} color='yellow' filter='drop-shadow(2px 2px 1px black)'/>
                                    <p className={!dark ? 'absolute text-2xl text-marron' : 'absolute text-2xl'}>{response.timesFirst}</p>
                                </div>
                                <div className='relative flex flex-col items-center mt-8'>
                                    <FontAwesomeIcon icon={faTrophy} color='copper' filter='drop-shadow(2px 2px black)'/>
                                    <p className={!dark ? 'absolute text-2xl text-marron' : 'absolute text-2xl text-dorado'}>{response.timesThird}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            : (
                <div className='relative flex text-marron'>
                    <img src={imageURL} alt="horse_image" className='max-w-big rounded xl:max-w-xbig desktop_full:max-w-2xbig'/>                    
                    <p className='absolute ml-10 mt-5 text-4xl text-white'>{response.name}</p>
                    <div className='absolute bottom-0 right-0 flex flex-col items-center space-y-2 mb-3 mr-3 p-2 rounded-md bg-dorado/60'>
                        <div className='text-center text-black'>
                            <p>BREED: {response.breed}</p>
                            <p>AGE: {response.age} months</p>
                            <p>STUD: {response.stud.name}, {response.stud.location}</p>
                        </div>
                        <p>Total races: {response.timesFirst + response.timesSecond + response.timesThird + response.timesOtherPosition}</p>
                        <div className='flex justify-between space-x-2 text-6xl'>                    
                            <div className='relative flex flex-col items-center mt-5'>
                                <FontAwesomeIcon icon={faTrophy} color='silver' filter='drop-shadow(2px 2px 1px black)'/>
                                <p className='absolute mt-1 text-2xl'>{response.timesSecond}</p>
                            </div>
                            <div className='relative flex flex-col items-center mb-5'>
                                <FontAwesomeIcon icon={faTrophy} color='yellow' filter='drop-shadow(2px 2px 1px black)'/>
                                <p className='absolute mt-1 text-2xl'>{response.timesFirst}</p>
                            </div>
                            <div className='relative flex flex-col items-center mt-8'>
                                <FontAwesomeIcon icon={faTrophy} color='copper' filter='drop-shadow(2px 2px black)'/>
                                <p className='absolute mt-1 text-2xl text-dorado'>{response.timesThird}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    )
}

export default HorseDetail