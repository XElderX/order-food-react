
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dishes from './Dishes/Dishes';
import Header from './Header/Header';
import Home from './Home/Home';
import Login from './Home/Login';
import Register from './Home/Register';
import Menus from './Menus/Menus';
import Orders from './Orders/Orders';
import Restourants from './Restourants/Restourants';

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [token, _] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  useEffect(() => {
    if (token) {
      setLogedIn(true);
      setUser(localStorage.getItem("username"));
      console.log('setted');
      console.log(user);
      console.log(typeof(logedIn))
    }
    (admin === false) ? setAdmin(false) : setAdmin(true);

  }, [token])
  
  return (
    
       <BrowserRouter>
      <Header
       logedIn={logedIn}
       setLogedIn={setLogedIn}
       token={token}
       user={user}
       admin={admin}
       setAdmin={setAdmin}
       />
      <Routes>
      <Route exact path='/login' element={<Login
          logedIn={logedIn}
          setLogedIn={setLogedIn}
          token={token}
          user={user}
        />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/home' element={<Home
          logedIn={logedIn}
        />} />
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/restourants' element={<Restourants
         />}/>
        <Route exact path='/menus' element={<Menus />}/>
        <Route exact path='/dishes' element={<Dishes />}/>
        <Route exact path='/orders' element={<Orders />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
