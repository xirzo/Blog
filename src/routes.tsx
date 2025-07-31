import HomePage from './pages/home/homePage';
import BlogPage from './pages/blog/blogPage';

export interface IPageRecord {
    name: string
    path: string
    page: React.ReactElement
}

export const pages: readonly IPageRecord[] = [
    { name: "Home", path: "/", page: <HomePage />},
    { name: "Blog", path: "/blog", page: <BlogPage />}
];

