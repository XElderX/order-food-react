import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import OrdersOverview from './OrdersOverview';
import ViewOrder from './ViewOrder';

const UserOrders = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [showOrderDiv, setShowOrderDiv] = useState(false);

    useEffect(() => {
        // if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders/user/" + (localStorage.getItem("user_id")),)
            .then(res => {
                if (!res.ok) {
                    console.log(res);
                    setError(res);
                    setIsLoaded(true);
                } else {
                    return res.json()
                }
            }).then(
                (result) => {
                    console.log(result)
                    setUserOrders(result); setIsLoaded(true);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])

    if (!isLoaded) {
        return <div style={{ textAlign: 'center', margin: '20%' }}>Loading...<Loader /></div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (


            <div style={{ margin: '5% 10%' }}>
                <div style={showOrderDiv === true ? { display: 'none' } : { display: 'block' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Orders </h4>
                    <OrdersOverview
                        userOrders={userOrders}
                        setShowOrderDiv={setShowOrderDiv}
                        setOrderDetails={setOrderDetails}
                    />
                </div>


                <div style={showOrderDiv !== true ? { display: 'none' } : { display: 'block' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>Order Details </h4>
                    <ViewOrder
                        setIsLoaded={setIsLoaded}
                        orderDetails={orderDetails}
                        userOrders={userOrders}
                        setError={setError}
                        setShowOrderDiv={setShowOrderDiv}
                    />
                </div>
            </div>
        );
    }
}

export default UserOrders;