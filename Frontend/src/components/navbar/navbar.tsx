import {Link} from "react-router-dom";
import {useAuth} from "../../features/auth/model/useAuth";
import {navigationItems} from "../../app/routes";

function Navbar() {
    const {user, isAuthenticated, logout} = useAuth();

    return (
        <nav
            className="
                w-full
                bg-[var(--color-secondary)]
                rounded-[15px]
                shadow-[0_2px_4px_rgba(0,0,0,0.1)]
                flex
                justify-between
                items-center
                px-8
                py-4
                mb-8
                z-[100]
                static
                top-0
                transition-colors
                duration-200
            "
        >
            <div>
                <Link to="/"
                      className="text-xl font-bold text-[var(--color-primary-text)] hover:text-[var(--color-primary)] transition-colors">
                    MyBlog
                </Link>
            </div>

            <ul className="flex gap-6 items-center m-0 px-8 list-none">
                {navigationItems.filter(item => item.path === "/" || item.path === "/blogs").map(({name, path}) => (
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
                                hover:bg-[var(--color-primary-text)]
                                hover:text-[var(--color-secondary)]
                                active:bg-[var(--color-primary-text)]
                                active:text-[var(--color-secondary)]
                            "
                        >
                            {name}
                        </Link>
                    </li>
                ))}

                {isAuthenticated &&
                    navigationItems
                        .filter(item =>
                            item.path !== "/" &&
                            item.path !== "/blogs" &&
                            item.path !== "/login" &&
                            item.path !== "/register"
                        )
                        .map(({name, path}) => (
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
                                        hover:bg-[var(--color-primary-text)]
                                        hover:text-[var(--color-secondary)]
                                        active:bg-[var(--color-primary-text)]
                                        active:text-[var(--color-secondary)]
                                    "
                                >
                                    {name}
                                </Link>
                            </li>
                        ))
                }

                {isAuthenticated ? (
                    <>
                        <li className="user-info m-0 p-0 text-[var(--color-primary-text)]">
                            <span>Hello, {user?.name}</span>
                        </li>
                        <li className="m-0 p-0">
                            <button
                                className="
                                    py-2
                                    px-4
                                    rounded-md
                                    font-medium
                                    transition-colors
                                    duration-150
                                    text-[var(--color-primary-text)]
                                    bg-transparent
                                    hover:bg-[var(--color-primary-text)]
                                    hover:text-[var(--color-secondary)]
                                    border-none
                                    outline-none
                                "
                                onClick={logout}
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
                                    hover:bg-[var(--color-primary-text)]
                                    hover:text-[var(--color-secondary)]
                                "
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
                                    hover:bg-[var(--color-primary-text)]
                                    hover:text-[var(--color-secondary)]
                                "
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
