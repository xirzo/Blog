import {Link} from "react-router-dom";
import {useAuth} from "../features/auth/model/useAuth.ts";
import {navigationItems} from "../app/routes.tsx";
import {useEffect, useState} from "react";
import ThemeToggle from "./themeToggle.tsx";

function Navbar() {
    const {isAuthenticated, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoText = import.meta.env.VITE_LOGO_TEXT;

    if (logoText === undefined) {
        console.error("Failed to get logoText env");
    }

    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (visibleCount < logoText.length) {
            const timeout = setTimeout(() => {
                setVisibleCount(visibleCount + 1);
            }, 175);
            return () => clearTimeout(timeout);
        }
    }, [visibleCount, logoText.length]);

    return (
        <nav>
            <div>
                <div>
                    <Link to="/">
                        <span>
                            {logoText.slice(0, visibleCount)}
                            <span style={{visibility: visibleCount < logoText.length ? "visible" : "hidden"}}>|</span>
                        </span>
                    </Link>
                </div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         viewBox="0 0 16 16" style={{color: 'var(--color-link)'}}>
                        <path fillRule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
            </div>
            <ul style={{display: isMenuOpen ? undefined : 'none'}}>
                {navigationItems.filter(item => item.path === "/" || item.path === "/posts").map(({name, path}) => (
                    <li key={path}>
                        <Link
                            to={path}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
                {isAuthenticated &&
                    navigationItems
                        .filter(item =>
                            item.path !== "/" &&
                            item.path !== "/posts" &&
                            item.path !== "/login" &&
                            item.path !== "/register"
                        )
                        .map(({name, path}) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))
                }
                {isAuthenticated ? (
                    <li>
                        <button
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                            }}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
                <li>
                    <ThemeToggle/>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
