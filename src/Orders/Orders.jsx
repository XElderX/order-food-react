import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Orders = ({setNotification, notification, setShow, show}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [reRender, setReRender] = useState(false);


    useEffect(() => {
        // if (!token) return nav("/login");
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders")
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
                    setOrders(result); setIsLoaded(true);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender])

    const orderStatus = (id, action, e) => {
        let status;
        let statusInWord;

        switch (action) {
            case 2: status = 2; statusInWord = 'In Progress';
                break;
            case 3: status = 3; statusInWord = 'Completed';
                break;
            case 4: status = 4; statusInWord = 'Canceled';
                break;
            default: status = 1; statusInWord = 'Pending';
        }


        e.preventDefault();
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/orders/" + id, {
            method: 'PUT',
            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify(
                {
                    "status": status,

                }
            )
        }).then(response => {
            console.log(response)

            if (response.status === 200) {
                setReRender(!reRender);
                setShow(true);
                setNotification({text:'Order\'s No:' + id + ' status was set to ' + statusInWord, status:'success'})


            }
        })
            .catch(error => {
                setShow(true);
                setNotification({text:'Ops!! error occured', status:'danger'})
                console.log(error)
            })
    }


    if (!isLoaded) {
        return <div style={{ textAlign: 'center', margin: '20%' }}>Loading...<Loader /></div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {


        return (<>
            <div className="container-fluid">
                <h3 style={{ textAlign: 'center', margin: '1rem' }}>All Orders</h3>
                <div style={show ? {display:'block', margin:'0.5rem 1rem' } : {display:'none'}} className={'alert alert-' + notification.status}><span>{notification.text}</span></div>
                <table style={{ margin: '5% 3%' }} className="table">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Total Amount</th>
                            <th>Order submited</th>
                            <th>Last Order status Update</th>
                            <th>Order status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 ? (orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.name}</td>
                                <td>{order.surname}</td>
                                <td>{order.address}</td>
                                <td>{order.email} </td>
                                <td>{order.total_price} &euro;</td>
                                <td>{order.created_at.replace('T', " ",).slice(0, 16)}</td>
                                <td>{order.updated_at.replace('T', " ",).slice(0, 16)}</td>
                                <td>{(order.status == 0) || (order.status == 1)
                                    ? <span style={{ backgroundColor: '#ff8c00', padding: '1rem' }}>Pending</span>
                                    : (order.status == 2)
                                        ? <span style={{ backgroundColor: '#cae00d', padding: '1rem' }}>In Process</span>
                                        : (order.status == 3)
                                            ? <span style={{ backgroundColor: '#9dc209', padding: '1rem' }}>Completed</span>
                                            : <span style={{ backgroundColor: '#ab4e52', padding: '1rem' }}>Canceled</span>}</td>
                                <td><button onClick={(e) => orderStatus(order.id, 2, e)} className="btn btn-warning">Set In Process</button>
                                    <button onClick={(e) => orderStatus(order.id, 3, e)} className="btn btn-success">Complete</button>
                                    <button onClick={(e) => orderStatus(order.id, 4, e)} className="btn btn-danger">Cancel</button></td>

                            </tr>)
                        )) : (
                            <tr><td>You have not placed any order yet.</td></tr>
                        )}
                    </tbody>
                </table>
            

            </div>
        </>);
    }
}

export default Orders;