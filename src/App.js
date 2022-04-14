import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import Main from './pages/Main';

function App() {
  return (
    <div className='bg-fondo_caballo bg-cover h-screen w-screen flex flex-col'>
      <BrowserRouter>
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
