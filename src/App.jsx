import './App.css';
import React from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Main from './components/Main';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  //Creacion del observer que comprueba si hay cambios en el DOM y cambia el valor de currentPath
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
  

  return (
    <div id='page' className='bg-fondo_caballo bg-cover h-screen w-screen flex flex-col'>
      <BrowserRouter>
        <Header currentPath={currentPath}/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/main" element={<Main/>}/>
        </Routes>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
