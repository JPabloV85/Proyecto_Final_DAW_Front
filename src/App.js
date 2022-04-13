import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className='bg-fondo_caballo bg-cover h-screen w-screen flex flex-col'>
      <Router>
        <Switch>
          <Route exact path="/"><Home/></Route>
        </Switch>

        <Footer/>
      </Router>
    </div>
  );
}

export default App;
