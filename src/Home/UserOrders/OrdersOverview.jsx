

const OrdersOverview = ({ userOrders, setShowOrderDiv, setOrderDetails }) => {

    function showOrder(id, e) {
        fetch("https://examorderfoodapp.herokuapp.com/api/v1/orderedItems/order/" + id, { method: 'GET' })
            .then(res => {
                if (!res.ok) {
                    console.log(res);

                } else {
                    return res.json()
                }
            }).then(
                (result) => {

                    console.log(result);
                    setShowOrderDiv(true);
                    setOrderDetails(result);
                }
            )

    }
    return (

        <table className="table">
            <thead>
                <tr>
                    <th>Order Id</th>
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
                {userOrders?.length > 0 ? (userOrders.map(userOrder => (
                    <tr key={userOrder.id}>
                        <td>{userOrder.id}</td>
                        <td>{userOrder.name}</td>
                        <td>{userOrder.surname}</td>
                        <td>{userOrder.address}</td>
                        <td>{userOrder.email} </td>
                        <td>{userOrder.total_price} &euro;</td>
                        <td>{userOrder.created_at.replace('T', " ",).slice(0, 16)}</td>
                        <td>{userOrder.updated_at.replace('T', " ",).slice(0, 16)}</td>
                        <td>{(userOrder.status == 0) || (userOrder.status == 1)
                            ? <span style={{ backgroundColor: '#ff8c00', padding: '1rem' }}>Pending</span>
                            : (userOrder.status == 2)
                                ? <span style={{ backgroundColor: '#cae00d', padding: '1rem' }}>In Process</span>
                                : (userOrder.status == 3)
                                    ? <span style={{ backgroundColor: '#9dc209', padding: '1rem' }}>Completed</span>
                                    : <span style={{ backgroundColor: '#ab4e52', padding: '1rem' }}>Canceled</span>}</td>
                        <td><button onClick={(e) => showOrder(userOrder.id, e)} className="btn btn-dark">Details</button></td>

                    </tr>)
                )) : (
                    <tr><td>You have not placed any order yet.</td></tr>
                )}
            </tbody>
        </table>


    );
}

export default OrdersOverview;