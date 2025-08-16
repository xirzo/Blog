import BlogsPage from "../pages/blogs/blogsPage";
import BlogPage from "../pages/blog/blogPage";
import HomePage from "../pages/home/homePage";
import LoginPage from "../pages/login/loginPage";
import ProfilePage from "../pages/profile/profilePage";
import RegisterPage from "../pages/register/registerPage";

export const publicRoutes = [
    {name: "Home", path: "/", element: <HomePage/>},
    {name: "Blogs", path: "/blogs", element: <BlogsPage/>},
    {name: "Blog", path: "/blog/:id", element: <BlogPage/>},
    {name: "Login", path: "/login", element: <LoginPage/>},
    {name: "Register", path: "/register", element: <RegisterPage/>},
];

export const routes = [
    {name: "Profile", path: "/profile", element: <ProfilePage/>},
];

export const allRoutes = [
    ...publicRoutes,
    ...routes
];

export const navigationItems = [
    {name: "Home", path: "/"},
    {name: "Blogs", path: "/blogs"},
    {name: "Profile", path: "/profile"}
];
