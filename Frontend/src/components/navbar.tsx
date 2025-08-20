import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/model/useAuth.ts";
import { navigationItems } from "../app/routes.tsx";
import { useEffect, useState } from "react";
import ThemeToggle from "./themeToggle.tsx";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
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
        <nav
            className="
                w-full
                bg-[var(--color-secondary)]
                rounded-[15px]
                shadow-[0_2px_4px_rgba(0,0,0,0.1)]
                flex
                flex-col
                md:flex-row
                md:justify-between
                md:items-center
                px-5
                md:px-8
                py-4
                mb-8
                z-[100]
                static
                top-0
            "
        >
            <div className="flex justify-between items-center w-full md:w-auto">
                <div>
                    <Link to="/"
                        className="text-xl font-bold text-[var(--color-primary-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        <span>
                            {logoText.slice(0, visibleCount)}
                            <span style={{ visibility: visibleCount < logoText.length ? "visible" : "hidden" }}>|</span>
                        </span>
                    </Link>
                </div>

                <button
                    className="md:hidden flex flex-col gap-1 p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        className={`bi bi-list transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                        viewBox="0 0 16 16" style={{ color: 'var(--color-link)' }}>
                        <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </button>
            </div>

            {/* Navigation menu */}
            <ul className={`
                ${isMenuOpen ? 'flex' : 'hidden'}
                md:flex
                flex-col
                md:flex-row
                gap-2
                md:gap-6
                items-stretch
                md:items-center
                mt-4
                md:mt-0
                m-0
                px-0
                md:px-8
                list-none
                w-full
                md:w-auto
            `}>
                {navigationItems.filter(item => item.path === "/" || item.path === "/posts").map(({ name, path }) => (
                    <li key={path} className="m-0 p-0">
                        <Link
                            to={path}
                            className="
                                block
                                py-2
                                px-4
                                rounded-md
                                font-medium
                                transition-colors
                                duration-150
                                no-underline
                                text-[var(--color-primary-text)]
                                bg-transparent
                                hover:text-[var(--color-secondary)]
                                active:bg-[var(--color-primary-text)]
                                active:text-[var(--color-secondary)]
                                text-center
                                md:text-left
                            "
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
                        .map(({ name, path }) => (
                            <li key={path} className="m-0 p-0">
                                <Link
                                    to={path}
                                    className="
                                        block
                                        py-2
                                        px-4
                                        rounded-md
                                        font-medium
                                        transition-colors
                                        duration-150
                                        no-underline
                                        text-[var(--color-primary-text)]
                                        bg-transparent
                                        hover:text-[var(--color-secondary)]
                                        active:bg-[var(--color-primary-text)]
                                        active:text-[var(--color-secondary)]
                                        text-center
                                        md:text-left
                                    "
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))
                }

                {isAuthenticated ? (
                    <>
                        <li className="m-0 p-0">
                            <button
                                className="
                                    w-full
                                    py-2
                                    px-4
                                    rounded-md
                                    font-medium
                                    transition-colors
                                    duration-150
                                    text-[var(--color-link)]
                                    bg-transparent
                                    hover:cursor-pointer
                                    hover:text-[var(--color-link-hover)]
                                    border-none
                                    outline-none
                                    text-center
                                    md:text-left
                                    md:w-auto
                                "
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="m-0 p-0">
                            <Link
                                to="/login"
                                className="
                                    block
                                    py-2
                                    px-4
                                    rounded-md
                                    font-medium
                                    transition-colors
                                    duration-150
                                    no-underline
                                    text-[var(--color-primary-text)]
                                    bg-transparent
                                    hover:text-[var(--color-secondary)]
                                    text-center
                                    md:text-left
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                        <li className="m-0 p-0">
                            <Link
                                to="/register"
                                className="
                                    block
                                    py-2
                                    px-4
                                    rounded-md
                                    font-medium
                                    transition-colors
                                    duration-150
                                    no-underline
                                    text-[var(--color-primary-text)]
                                    bg-transparent
                                    hover:text-[var(--color-secondary)]
                                    text-center
                                    md:text-left
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}

                <li className="m-0 p-0 flex justify-center md:justify-start">
                    <ThemeToggle />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
