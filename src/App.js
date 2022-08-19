
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Cart/Cart';
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
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);


  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    text: '',
    status: ''
})


  useEffect(() => {

    setTimeout(() => {
      setShow(false);
      console.log('timeout')
    }, 5000);
  }, [show]);



  useEffect(() => {
    if (token) {
      let localStoreItems = JSON.parse(localStorage.getItem("cart"));
      setCart(localStoreItems || []);
      setLogedIn(true);
      setUser(localStorage.getItem("username"));
      console.log('setted');
      console.log(user);
      console.log(typeof (logedIn))
    }
    (admin === false) ? setAdmin(false) : setAdmin(true);

  }, [token])




  const addIntoCart = (id) => {

    let cartUpdate = JSON.stringify([...cart, id]);
    localStorage.setItem('cart', cartUpdate);
    setCart([...cart, id])
    // localStorage.setItem("cart", JSON.stringify(cart));
    // addToCart((cart) => [...cart, id])
    console.log(cart);
  };

  return (

    <BrowserRouter>
      <Header
        logedIn={logedIn}
        setLogedIn={setLogedIn}
        token={token}
        user={user}
        admin={admin}
        setAdmin={setAdmin}
        setCart={setCart}
      />
      <Routes>
        <Route exact path='/login' element={<Login
          logedIn={logedIn}
          setLogedIn={setLogedIn}
          token={token}
          user={user}
          setNotification={setNotification}
          notification={notification}
         show={show}
          setShow={setShow}
        />} />
        <Route exact path='/register' element={<Register 
        setNotification={setNotification}
        notification={notification}
         show={show}
          setShow={setShow}

        />} />
        <Route exact path='/home' element={<Home
          setNotification={setNotification}
          notification={notification}
          show={show}
          setShow={setShow}
          logedIn={logedIn}
        />} />
        <Route exact path='/restourants' element={<Restourants
         setNotification={setNotification}
         notification={notification}
         show={show}
        setShow={setShow}
        />} />
        <Route exact path='/menus' element={<Menus
         setNotification={setNotification}
         notification={notification}
         show={show}
          setShow={setShow}
          addIntoCart={addIntoCart}

        />} />
        <Route exact path='/dishes' element={<Dishes
         setNotification={setNotification}
         notification={notification}
         show={show}
          setShow={setShow}
          dishes={dishes}
          setDishes={setDishes}

        />} />
        <Route exact path='/orders' element={<Orders
         setNotification={setNotification}
         notification={notification}
         show={show}
          setShow={setShow} />} />

        <Route exact path='/cart' element={<Cart
          cart={cart}
          setCart={setCart}
          token={token}
          setNotification={setNotification}
          notification={notification}
          show={show}
          setShow={setShow}


        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
