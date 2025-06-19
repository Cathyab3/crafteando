import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

/*  Páginas  */
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Mobs from './pages/Mobs';
import Recursos from './pages/Recursos';
import Coordenadas from "./pages/Coordenadas";
import MobDetail from "./pages/MobDetail";

import './App.css';


function App() {
   return (
       <AuthProvider>
      <Router>
        <Navbar />
      
        <main className="container-main">
          <Routes>
            <Route path="/"           element={<Landing />} />
            <Route path="/login"      element={<Login />}  />
            <Route path="/recursos"   element={<Recursos />} />
            <Route path="/profile/coordenadas" element={<Coordenadas />} />
            <Route path="/mobs"       element={<Mobs />} />
            <Route path="/mobs/:mobName" element={<MobDetail />} />

            {/* Rutas protegidas  */}
            <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;