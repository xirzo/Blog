import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/model/useAuth";
import { navigationItems } from "../../app/routes"

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav
            className="
                w-full
                bg-[#1a1a1a]
                dark:bg-[#1a1a1a]
                rounded-[15px]
                shadow-[0_2px_4px_rgba(0,0,0,0.1)]
                flex
                justify-between
                items-center
                px-8
                py-4
                mb-5
                z-[100]
                static
                top-0
                dark:shadow-[0_2px_4px_rgba(0,0,0,0.1)]
                bg-[#ebebeb] dark:bg-[#1a1a1a]
                dark:shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            "
        >
            <div>
                <Link to="/" className="text-xl font-bold text-white dark:text-white dark:hover:text-white hover:text-[#2a2a35]">
                    MyBlog
                </Link>
            </div>

            <ul className="flex gap-6 items-center m-0 px-8 list-none">
                {navigationItems.filter(item => item.path === "/" || item.path === "/blog").map(({ name, path }) => (
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
                                text-white
                                dark:text-white
                                hover:bg-[#2a2a35]
                                hover:text-white
                                active:bg-[#2a2a35]
                                active:text-white
                                dark:hover:bg-[#2a2a35]
                                dark:hover:text-white
                                dark:active:bg-[#2a2a35]
                                dark:active:text-white
                                bg-transparent
                                dark:bg-transparent
                                dark:hover:bg-[#e4e7fa]
                                dark:hover:text-[#213547]
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
                            item.path !== "/blog" &&
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
                                        text-white
                                        dark:text-white
                                        hover:bg-[#2a2a35]
                                        hover:text-white
                                        active:bg-[#2a2a35]
                                        active:text-white
                                        dark:hover:bg-[#2a2a35]
                                        dark:hover:text-white
                                        dark:active:bg-[#2a2a35]
                                        dark:active:text-white
                                        bg-transparent
                                        dark:bg-transparent
                                        dark:hover:bg-[#e4e7fa]
                                        dark:hover:text-[#213547]
                                    "
                                >
                                    {name}
                                </Link>
                            </li>
                        ))
                }

                {isAuthenticated ? (
                    <>
                        <li className="user-info m-0 p-0 text-white dark:text-white">
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
                                    text-white
                                    dark:text-white
                                    bg-transparent
                                    hover:bg-[#2a2a35]
                                    hover:text-white
                                    dark:hover:bg-[#2a2a35]
                                    dark:hover:text-white
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
                                    text-white
                                    dark:text-white
                                    hover:bg-[#2a2a35]
                                    hover:text-white
                                    dark:hover:bg-[#2a2a35]
                                    dark:hover:text-white
                                    bg-transparent
                                    dark:bg-transparent
                                    dark:hover:bg-[#e4e7fa]
                                    dark:hover:text-[#213547]
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
                                    text-white
                                    dark:text-white
                                    hover:bg-[#2a2a35]
                                    hover:text-white
                                    dark:hover:bg-[#2a2a35]
                                    dark:hover:text-white
                                    bg-transparent
                                    dark:bg-transparent
                                    dark:hover:bg-[#e4e7fa]
                                    dark:hover:text-[#213547]
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
