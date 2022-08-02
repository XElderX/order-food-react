
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dishes from './Dishes/Dishes';
import Header from './Header/Header';
import Home from './Home/Home';
import Menus from './Menus/Menus';
import Orders from './Orders/Orders';
import Restourants from './Restourants/Restourants';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/restourants' element={<Restourants />}/>
        <Route exact path='/menus' element={<Menus />}/>
        <Route exact path='/dishes' element={<Dishes />}/>
        <Route exact path='/orders' element={<Orders />}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
