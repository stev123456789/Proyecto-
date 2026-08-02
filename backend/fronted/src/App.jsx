import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Habitaciones from './pages/Habitaciones';
import Huespedes from './pages/Huespedes';
import Empleados from './pages/Empleados';
import Reservas from './pages/Reservas';
import Facturas from './pages/Facturas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/habitaciones" element={<Habitaciones />} />
        <Route path="/dashboard/huespedes" element={<Huespedes />} />
        <Route path="/dashboard/empleados" element={<Empleados />} />
        <Route path="/dashboard/reservas" element={<Reservas />} />
        <Route path="/dashboard/facturas" element={<Facturas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;