import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import {protectedRoutes, publicOnlyRoutes, publicRoutes} from './routes';
import {ProtectedRoute} from '../shared/ui/protectedRoute'
import {AuthProvider} from '../features/auth/ui/authProvider';
import {PublicOnlyRoute} from "../shared/ui/publicOnlyRoute.tsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar/>
                <main>
                    <Routes>
                        {publicRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}

                        {publicOnlyRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={<PublicOnlyRoute>{element}</PublicOnlyRoute>}/>
                        ))}

                        {protectedRoutes.map(({path, element}) => (
                            <Route
                                key={path}
                                path={path}
                                element={<ProtectedRoute>{element}</ProtectedRoute>}
                            />
                        ))}
                    </Routes>
                </main>
            </AuthProvider>
        </Router>
    );
}

export default App;
