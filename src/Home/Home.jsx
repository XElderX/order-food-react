
import { Link } from 'react-router-dom';



function Home({ logedIn }) {

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

        </>
    )
};

export default Home;
