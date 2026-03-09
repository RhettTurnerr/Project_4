import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <Link to="/" className="nav-home">Home</Link>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/register" className="nav-register">Register</Link>
            <Link to="/dashboard" className="nav-dash">Dashboard</Link>
        </nav>
    );
}

export default Navbar;