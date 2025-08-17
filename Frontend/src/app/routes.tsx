import BlogsPage from "../pages/blogsPage.tsx";
import BlogPage from "../pages/blogPage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import ProfilePage from "../pages/profilePage.tsx";
import RegisterPage from "../pages/registerPage.tsx";
import BlogEditPage from "../pages/blogEditPage.tsx";
import BlogCreatePage from "../pages/blogCreatePage.tsx";

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
    {name: "Blog Create", path: "/blog/create", element: <BlogCreatePage/>},
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
