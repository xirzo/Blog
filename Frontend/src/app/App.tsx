import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { routes, publicRoutes } from './routes';
import { ProtectedRoute } from '../shared/ui/protectedRoute'
import { AuthProvider } from '../features/auth/ui/authProvider';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Navbar />
                    <main>
                        <Routes>
                            {publicRoutes.map(({ path, element }) => (
                                <Route key={path} path={path} element={element} />
                            ))}
                            
                            {routes.map(({ path, element }) => (
                                <Route 
                                    key={path} 
                                    path={path} 
                                    element={<ProtectedRoute>{element}</ProtectedRoute>} 
                                />
                            ))}
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
