import { NavLink, useNavigate } from "react-router-dom";
import cartLogo from '../assets/shopping-cart.svg';
import logoutSvg from '../assets/logout.svg';




const Header = ({ logedIn, setLogedIn, setAdmin, admin, setCart }) => {
    const nav = useNavigate();


    const logout = event => {
        event.preventDefault();
        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        // localStorage.removeItem('admin');

        localStorage.clear()
        setCart([]);
        setLogedIn(false);
        setAdmin(false);
        return nav("/home");

    }
    return (<nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light">
        <a style={{ margin: "1rem" }} className="navbar-brand" href="/home">Food Order App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav">

                <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/home">Home</NavLink></li>
                <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/restourants">Restourants List</NavLink></li>
                <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/menus">Menu</NavLink></li>
                <li style={(logedIn) && (localStorage.getItem("admin") == 1) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/dishes">Dishes</NavLink></li>
                <li style={(logedIn) && (localStorage.getItem("admin") == 1) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/orders">All Orders</NavLink></li>
            </ul>

        </div>
        <div style={(logedIn) ? { display: 'flex' } : { display: 'none' }}>

            <h3 style={{ margin: "0.1rem 1rem 0 0" }}>Welcome, {localStorage.getItem("username")}</h3>

            <ul className="navbar-nav">

                <li style={{ margin: "2rem 1rem 0 0" }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/cart"> <img style={{ width: '25px' }} src={cartLogo} alt='cart'></img> Your Cart </NavLink></li>
            </ul>
            <button style={{ margin: "1rem 1rem" }} className="logout" onClick={(e) => logout(e)}><img style={{ width: '25px' }} src={logoutSvg} alt='logout'></img> Logout </button>
        </div>

    </nav>);
}

export default Header;