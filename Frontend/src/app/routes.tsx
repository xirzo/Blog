import BlogsPage from "../pages/blogs/blogsPage";
import BlogPage from "../pages/blog/blogPage";
import LoginPage from "../pages/login/loginPage";
import ProfilePage from "../pages/profile/profilePage";
import RegisterPage from "../pages/register/registerPage";
import BlogEditPage from "../pages/blogEdit/blogEditPage";

export const publicRoutes = [
    {name: "Blogs", path: "/", element: <BlogsPage/>},
    {name: "Blog", path: "/blog/:id", element: <BlogPage/>},
];

export const publicOnlyRoutes = [
    {name: "Login", path: "/login", element: <LoginPage/>},
    {name: "Register", path: "/register", element: <RegisterPage/>},
];

export const protectedRoutes = [
    {name: "Profile", path: "/profile", element: <ProfilePage/>},
    {name: "Blog Edit", path: "/blog/edit/:id", element: <BlogEditPage/>},
];

export const allRoutes = [
    ...publicRoutes,
    ...publicOnlyRoutes,
    ...protectedRoutes
];

export const navigationItems = [
    {name: "Blogs", path: "/"},
    {name: "Profile", path: "/profile"}
];
