import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <Link to="/" className="nav-home">Home</Link>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/register" className="nav-register">Register</Link>
            <Link to="/categories" className="nav-categories">Categories</Link>
            <Link to="/questions" className="nav-questions">Questions</Link>
        </nav>
    );
}

export default Navbar;