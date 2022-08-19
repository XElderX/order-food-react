
import { Link } from 'react-router-dom';
import UserOrders from './UserOrders/UserOrders';



function Home({ logedIn, dishes, setNotification, notification, setShow, show}) {

    return (
        <>
            <div style={(logedIn) ? { display: 'none' } : { display: 'block' }} className="container">
                <p style={{ display: 'inline' }}>Welcome to restourant review App!</p>

                <div className="container">

                    <ul className="navbar-nav">
                        <p>Please Log in or register</p>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login in</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Sign up</Link></li>

                    </ul>
                </div>
            </div>
            <div style={(logedIn) ? { display: 'block' } : { display: 'none' }} className="container-fluid">
                <div>
                    <UserOrders
                        dishes={dishes} />
                </div>
            </div>
        </>
    )
};

export default Home;
