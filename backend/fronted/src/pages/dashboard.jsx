import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../services/api';

function Dashboard(){
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuthToken();
        navigate('/login');
    };

    const menuItems = [
        { label: 'Habitaciones', path: '/dashboard/habitaciones', icon: '🛏️' },
        { label: 'Huéspedes', path: '/dashboard/huespedes', icon: '👥' },
        { label: 'Reservas', path: '/dashboard/reservas', icon: '📅' },
        { label: 'Empleados', path: '/dashboard/empleados', icon: '👔' },
        { label: 'Facturas', path: '/dashboard/facturas', icon: '📄' },
    ];

    return(
        <div className="container-fluid py-4 px-4">
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h3 className="h3 font-weight-bold text-dark">🏨 Gestión de Hotel</h3>
                            <p className="text-muted mb-0">Selecciona una opción para continuar.</p>
                        </div>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {menuItems.map((item) => (
                    <div key={item.path} className="col-md-6 col-lg-4">
                        <button
                            className="btn btn-outline-primary btn-lg w-100 py-4"
                            onClick={() => navigate(item.path)}
                            style={{ textAlign: 'left', fontSize: '1.1rem' }}
                        >
                            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                            <br />
                            {item.label}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Dashboard;