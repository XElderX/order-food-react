import { NavLink } from "react-router-dom";


const Header = () => {
    return ( <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light">
    <a style={{ margin: "1rem" }} className="navbar-brand" href="/home">Food Order App</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse" id="navbarNav">
        <ul className="navbar-nav">

            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/home">Home</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/restourants">Restourants</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/menus">Menus</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/dishes">Dishes</NavLink></li>
            <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-danger active" : "nav-link ")} to="/orders">All Orders</NavLink></li>
        </ul>

    </div>
    
</nav> );
}
 
export default Header;