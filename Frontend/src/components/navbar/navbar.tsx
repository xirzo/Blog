import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/model/useAuth";
import { navigationItems } from "../../app/routes"
import "./navbar.scss";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">MyBlog</Link>
            </div>
            
            <ul className="nav-links">
                {navigationItems.filter(item => item.path === "/" || item.path === "/blog").map(({ name, path }) => (
                    <li key={path}>
                        <Link to={path}>{name}</Link>
                    </li>
                ))}
                
                {isAuthenticated && 
                    navigationItems
                        .filter(item => item.path !== "/" && item.path !== "/blog" && item.path !== "/login" && item.path !== "/register")
                        .map(({ name, path }) => (
                            <li key={path}>
                                <Link to={path}>{name}</Link>
                            </li>
                        ))
                }
                
                {isAuthenticated ? (
                    <>
                        <li className="user-info">
                            <span>Hello, {user?.name}</span>
                        </li>
                        <li>
                            <button 
                                className="logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
