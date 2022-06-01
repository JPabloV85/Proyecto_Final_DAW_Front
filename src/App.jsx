import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyContextProvider } from './components/helpers/MyContext';
import Header from './components/utils/Header';
import Footer from './components/utils/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Main from './components/pages/Main';
import videoMp4 from './video/many.mp4';
import videoWebm from './video/many_webm.webm';

function App() {
  const [mounted, setMounted] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    //Creacion de un observer que comprueba si hay cambios en el DOM y cambia el valor de currentPath
    const mutationObserver = new MutationObserver(function(mutations) {
      if (mutations) {
        setCurrentPath(window.location.pathname);
      }
    });

    //Implementacion del observer
    function addObserver() {
      const page = document.querySelector('#page');
      if(!page) {
        //Si el nodo aún no se ha cargado, espera 500 ms y vuelve a comprobar
        window.setTimeout(addObserver,500);
        return;
      }
      mutationObserver.observe(page, {
        childList: true,
        subtree: true
      });
    }
    addObserver();
    setMounted(true);
  }, []);
  

  return (
    !mounted
    ? <div>Loading...</div>
    : <div id='page' className='flex flex-col w-screen h-screen'>
      {
        currentPath == "/" && (
          <div className='rotateY -z-10 absolute w-full h-full overflow-hidden'>        
            <video autoPlay loop muted className="min-w-max min-h-max absolute right-20 bottom-1">/
              <source src={videoMp4} type="video/mp4" />
              <source src={videoWebm} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      }
      <MyContextProvider>
        <BrowserRouter>
          <Header path={currentPath}/>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/main/my_bets" element={<Main section={"/my_bets"} />}/>
            <Route path="/main/new_bet" element={<Main section={"/new_bet"} />}/>
            <Route path="/main/horses" element={<Main section={"/horses"} />}/>
            <Route path="/main/horse_detail" element={<Main section={"/horse_detail"} />}/>
            <Route path="/main/profile" element={<Main section={"/profile"} />}/>
          </Routes>

          <Footer/>
        </BrowserRouter>
      </MyContextProvider>
      </div>
  );
}

export default App;
