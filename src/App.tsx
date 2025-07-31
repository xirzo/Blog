import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { pages } from './routes';
import Navbar from './components/navbar/navbar';

function App() {
    return (
        <Router>
            <Navbar records={pages} />

            <Routes>
                {pages.map(({ path, page }) => (
                    <Route key={path} path={path} element={page} />
                ))}
            </Routes>
        </Router>
    );
}

export default App
