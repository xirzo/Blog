import PostsPage from "../pages/postsPage.tsx";
import PostPage from "../pages/postPage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import ProfilePage from "../pages/profilePage.tsx";
import RegisterPage from "../pages/registerPage.tsx";
import PostEditPage from "../pages/postEditPage.tsx";
import PostCreatePage from "../pages/postCreatePage.tsx";

export const publicRoutes = [
    {name: "Posts", path: "/", element: <PostsPage/>},
    {name: "Post", path: "/post/:id", element: <PostPage/>},
];

export const publicOnlyRoutes = [
    {name: "Login", path: "/login", element: <LoginPage/>},
    {name: "Register", path: "/register", element: <RegisterPage/>},
];

export const protectedRoutes = [
    {name: "Profile", path: "/profile", element: <ProfilePage/>},
    {name: "Post Edit", path: "/post/edit/:id", element: <PostEditPage/>},
    {name: "Post Create", path: "/post/create", element: <PostCreatePage/>},
];

export const allRoutes = [
    ...publicRoutes,
    ...publicOnlyRoutes,
    ...protectedRoutes
];

export const navigationItems = [
    {name: "Posts", path: "/"},
    {name: "Profile", path: "/profile"}
];
