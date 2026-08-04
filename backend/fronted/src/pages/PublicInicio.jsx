import { Link } from 'react-router-dom';

function PublicInicio() {
  return (
    <div className="container py-5">
      <header className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h1 className="display-5">Bienvenido a Hotel Los Àlamos</h1>
          <p className="lead text-muted">Descubre las habitaciones disponibles y comienza tu experiencia.</p>
        </div>
        <Link to="/login" className="btn btn-primary">
          Iniciar sesión
        </Link>
      </header>

      <div className="card shadow-sm p-4 mb-4">
        <h2>Inicio</h2>
        <p>
          Esta es la vista pública del proyecto. Desde aquí puedes navegar a las habitaciones disponibles y acceder al área privada mediante el login.
        </p>
        <div className="mt-4">
          <Link to="/habitaciones" className="btn btn-outline-primary me-3">
            Ver habitaciones
          </Link>
          <Link to="/login" className="btn btn-outline-secondary">
            Ir al login
          </Link>
        </div>
      </div>

      <div className="row gx-4 gy-4">
        <div className="col-md-6">
          <div className="card border-primary h-100 p-4">
            <h3>Reservas sencillas</h3>
            <p className="text-muted">
              Consulta habitaciones disponibles y obtén información básica antes de iniciar sesión.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-success h-100 p-4">
            <h3>¿A dónde deseas ir?</h3>
            <p className="text-muted">
              Navega a la sección de habitaciones públicas para ver los tipos y características principales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicInicio;
