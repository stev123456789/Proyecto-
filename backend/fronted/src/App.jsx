import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Habitaciones from './pages/Habitaciones';
import Huespedes from './pages/Huespedes';
import Empleados from './pages/Empleados';
import Reservas from './pages/Reservas';
import Facturas from './pages/Facturas';
import { isLoggedIn } from './services/api';

const RequireAuth = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/habitaciones" element={<RequireAuth><Habitaciones /></RequireAuth>} />
        <Route path="/dashboard/huespedes" element={<RequireAuth><Huespedes /></RequireAuth>} />
        <Route path="/dashboard/empleados" element={<RequireAuth><Empleados /></RequireAuth>} />
        <Route path="/dashboard/reservas" element={<RequireAuth><Reservas /></RequireAuth>} />
        <Route path="/dashboard/facturas" element={<RequireAuth><Facturas /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
