import HomePage from './pages/home/homePage';
import BlogPage from './pages/blog/blogPage';
import LoginPage from './pages/login/loginPage';
import RegisterPage from './pages/register/registerPage';

export interface IPageRecord {
    name: string
    path: string
    page: React.ReactElement
}

export const pages: readonly IPageRecord[] = [
    { name: "Home", path: "/", page: <HomePage />},
    { name: "Blog", path: "/blog", page: <BlogPage />},
    { name: "Login", path: "/login", page: <LoginPage />},
    { name: "Register", path: "/register", page: <RegisterPage />},
];

