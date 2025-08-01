import BlogPage from "../pages/blog/blogPage";
import BlogDetailPage from "../pages/blogDetail/blogDetailPage";
import HomePage from "../pages/home/homePage";
import LoginPage from "../pages/login/loginPage";
import ProfilePage from "../pages/profile/profilePage";
import RegisterPage from "../pages/register/registerPage";

export const publicRoutes = [
    { name: "Home", path: "/", element: <HomePage /> },
    { name: "Blog", path: "/blog", element: <BlogPage /> },
    { name: "BlogDetail", path: "/blog/:id", element: <BlogDetailPage /> },
    { name: "Login", path: "/login", element: <LoginPage /> },
    { name: "Register", path: "/register", element: <RegisterPage /> },
];

export const routes = [
    { name: "Profile", path: "/profile", element: <ProfilePage /> },
];

export const allRoutes = [
    ...publicRoutes,
    ...routes
];

export const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Profile", path: "/profile" }
];
