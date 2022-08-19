import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import styles from './cart.module.css';



const Cart = ({ setCart, cart, token, show, setShow, setNotification, notification }) => {
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);



    const count = {};
    let row = 0;
    let totalAmount = 0;
    const [itemCount, setItemCount] = useState();
    cart.forEach(element => {
        count[element] = (count[element] || 0) + 1;

    });  // count array's dublicates

    const cartArr = Object.entries(count); // convertin object to array



    useEffect(() => {
        // if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/dishes",)
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
                    // console.log(result)
                    setDishes(result); setIsLoaded(true);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])

    const placeOrder = event => {
        event.preventDefault();
        if (cartArr.length < 1) {

            setShow(true);
            setNotification({ text: 'You havn\'t had any dishes or drinks in your cart', status: 'danger' })
            // console.log('no items to order')
        }
        else if (!event.target.user_id.value || !event.target.name.value || !event.target.surname.value || !event.target.status.value ||
            !event.target.address.value || !event.target.email.value || !event.target.total_price.value) {
            setShow(true);
            setNotification({ text: 'One or more fillable fields is invalid or empty', status: 'danger' })
        }

        else {
            fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders", {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(
                    {
                        "user_id": event.target.user_id.value,
                        "name": event.target.name.value,
                        "surname": event.target.surname.value,
                        "status": event.target.status.value,
                        "address": event.target.address.value,
                        "email": event.target.email.value,
                        "total_price": event.target.total_price.value

                    }
                )
            }).then(response => {
                // console.log(response)

                if (response.status === 201) {
                    event.target.reset();

                    fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders/user/" + localStorage.getItem("user_id"), { method: 'GET', headers: h })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                // console.log(result);
                                if ((result.length) > 1) {
                                    for (let index = 0; index < result.length; index++) {
                                        if (result[index].status == 0) {
                                            let orderID = result[index].id
                                            console.log(">>nth Orders  OK")
                                            orderItems(orderID);
                                            break;
                                        }
                                    }
                                }
                                else {
                                    let orderID = result[0].id
                                    console.log(">>1st Order OK")
                                    orderItems(orderID);
                                }
                            });
                }
            })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const orderItems = (orderID) => {
        console.log('>>>>check orderItems')
        console.log(orderID);
        console.log(itemCount);


        for (let index = 0; index < cartArr.length; index++) {
            console.log('>>>>check orderItems in loop ok')
            let id = parseInt(cartArr[index][0]);
            let qty = cartArr[index][1];

            console.log(orderID);
            fetch("https://examorderfoodapp.herokuapp.com/api/v1/orderedItems", {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(
                    {
                        "order_id": orderID,
                        "dish_id": id,
                        "quantity": qty,
                        "price": 0

                    }
                )
            }).then(response => {
                // console.log(response)

                if (response.status === 201) {
                    console.log(">>OrdersItems OK")

                    fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders/" + orderID, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json ', "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(
                            {
                                "status": 1
                            }
                        )
                    }).then(response => {
                        console.log(response)

                        if (response.status === 200) {
                            console.log(">>Orders status OK")
                            setShow(true);
                            setNotification({ text: 'Your Order Was Succesfully placed', status: 'success' })
                            localStorage.removeItem('cart');
                            setCart([]);

                        }
                    })
                        .catch(error => {
                            setShow(true);
                            setNotification({ text: error.response.data.message, status: 'danger' })

                            console.log(error)
                        })
                }
            })
        }
        console.log('>>>>check orderItems after loop')

    }
    if (!isLoaded) {
        return <div style={{ textAlign: 'center', margin: '20%' }}>Loading...<Loader /></div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <div className="none">

                    <div className={styles.cartContainer} >
                        <form className={styles.cartItem} onSubmit={placeOrder}>

                            <div className={styles.rightCard}>
                                <h5 style={{ textAlign: 'center', margin: '1rem' }}>Your cart:</h5>

                                <div>{
                                    (cartArr.length < 1)
                                        ? <span>Your cart is empty</span>
                                        : <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Dish</th>
                                                    <th>Unit Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total price </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dishes.map((dish, index) => (
                                                    cartArr.map(([element, qty]) => (
                                                        (element == dish.id)
                                                            ? (totalAmount += (dish.price * qty)) &&
                                                            <tr key={index}>

                                                                <td className={styles.cartItemNo}>{++row}.</td><td>{dish.dish_name}</td><td>{dish.price} &euro;</td><td>{qty}</td><td>{(dish.price * qty).toFixed(2)} &euro;</td></tr>
                                                            : null
                                                    )
                                                    )
                                                ))}

                                            </tbody>
                                        </table>
                                }
                                    {(cartArr.length > 1) ? <div className={styles.totalAmount}><u>Total Amount to pay: </u>{(totalAmount).toFixed(2)} &euro;</div> : null}
                                </div>
                                <button style={{ margin: '0.5rem 2rem 1rem 0', alignSelf: 'flex-end' }} type="submit" className="btn btn-primary">Submit order</button>

                            </div>
                            <div className={styles.leftCard}>
                                <h4> Fill up contact details </h4>

                                <div className="form-group">
                                    <input type="hidden"
                                        defaultValue={localStorage.getItem("user_id") || ""} key={localStorage.getItem("user_id")}
                                        name="user_id"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input type="text"
                                        name="name"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Surname: </label>
                                    <input type="text"
                                        name="surname"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Address: </label>
                                    <input type="text"
                                        name="address"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="email"
                                        name="email"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="hidden"
                                        defaultValue={0}
                                        name="status"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="hidden"
                                        name="total_price"
                                        defaultValue={totalAmount.toFixed(2)}
                                        className="form-control" />
                                </div>
                            </div>

                        </form>
                        <div style={show ? { display: 'block', margin: '0.5rem 1rem' } : { display: 'none' }} className={'alert alert-' + notification.status}><span>{notification.text}</span></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Cart;