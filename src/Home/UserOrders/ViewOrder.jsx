import { useEffect, useState } from "react";

const ViewOrder = ({ orderDetails, setError, setIsLoaded, setShowOrderDiv }) => {
    const [dishes, setDishes] = useState([]);
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
                    console.log(result)
                    setDishes(result); setIsLoaded(true);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [orderDetails])


    return (

        <div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Dish</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>

                    </tr>
                </thead>
                <tbody>
                    {orderDetails?.length > 0 ? (orderDetails.map(order => (
                        dishes.map(dish => ((dish.id === order.dish_id) ?
                            <tr key={order.id}>
                                <td>{order.order_id}</td>
                                <td>{dish.dish_name}</td>
                                <td>{dish.description}</td>
                                <td>{dish.price} &euro;</td>
                                <td>{order.quantity}</td>
                                <td>{(dish.price * order.quantity).toFixed(2)} &euro;</td>
                            </tr> : null
                        )))
                    )) : (
                        <tr><td>There is no any ordered items</td></tr>
                    )}
                </tbody>
            </table>
            <button onClick={(e) => setShowOrderDiv(false)} className="btn btn-dark">Go back</button>

        </div>
    );
}


export default ViewOrder;