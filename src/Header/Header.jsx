import { NavLink, useNavigate } from "react-router-dom";


const Header = ({logedIn, setLogedIn, setAdmin}) => {
    const nav = useNavigate();


    const logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('admin');
        setLogedIn(false);
        setAdmin(false);
        return nav("/home");

    }
    return ( <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light">
    <a style={{ margin: "1rem" }} className="navbar-brand" href="/home">Food Order App</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse" id="navbarNav">
        <ul className="navbar-nav">

            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/home">Home</NavLink></li>
            <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/restourants">Restourants</NavLink></li>
            <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/menus">Menus</NavLink></li>
            <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/dishes">Dishes</NavLink></li>
            <li style={(logedIn) ? { display: "inline" } : { display: 'none' }} className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/orders">All Orders</NavLink></li>
        </ul>

    </div>
    <div style={(logedIn) ? { display: 'block' } : { display: 'none' }}>

                <h3 style={{ margin: "1rem" }}>Welcome, {localStorage.getItem("username")}</h3>

                <button style={{ float: "right", marginRight: "1rem" }} className="logout" onClick={(e) => logout(e)}>Logout </button>
            </div>
    
</nav> );
}
 
export default Header;