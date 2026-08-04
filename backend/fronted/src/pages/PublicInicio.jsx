import { Link } from 'react-router-dom';

function PublicInicio() {
  return (
    <div className="public-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Hotel Los Álamos</span>
          <h1>Encuentra la habitación perfecta para tu próxima estancia</h1>
          <p className="hero-text">
            Explora nuestras habitaciones públicas, revisa disponibilidad y accede fácilmente al login para gestionar tu reserva.
          </p>
          <div className="hero-actions">
            <Link to="/habitaciones" className="btn btn-outline-primary">
              Ver habitaciones
            </Link>
            <Link to="/login" className="btn btn-primary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🏨</div>
          <h3>Reservas sin complicaciones</h3>
          <p>Consulta disponibilidad y elige la mejor habitación antes de iniciar sesión.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌟</div>
          <h3>Diseño moderno</h3>
          <p>Interfaz clara, tipografías suaves y botones con estilo para una navegación más intuitiva.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Acceso seguro</h3>
          <p>Inicia sesión para acceder al dashboard y continuar con tu gestión de reservas.</p>
        </div>
      </section>
    </div>
  );
}

export default PublicInicio;
