import { Link } from 'react-router-dom';

const habitacionesDemo = [
  {
    id: 1,
    numero: '101',
    tipo: 'Sencilla',
    capacidad: 2,
    precio: 120,
    descripcion: 'Cómoda habitación individual con vista al jardín.',
  },
  {
    id: 2,
    numero: '205',
    tipo: 'Doble',
    capacidad: 4,
    precio: 220,
    descripcion: 'Amplia habitación para parejas o familias pequeñas.',
  },
  {
    id: 3,
    numero: '307',
    tipo: 'Suite',
    capacidad: 2,
    precio: 340,
    descripcion: 'Suite moderna con sala de estar y baño privado.',
  },
];

function PublicHabitaciones() {
  return (
    <div className="container py-5">
      <header className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h1 className="display-5">Habitaciones</h1>
          <p className="lead text-muted">Explora nuestras habitaciones y conoce sus características principales.</p>
        </div>
        <Link to="/login" className="btn btn-primary">
          Iniciar sesión
        </Link>
      </header>

      <div className="row g-4">
        {habitacionesDemo.map((habitacion) => (
          <div key={habitacion.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Habitación {habitacion.numero}</h5>
                <p className="card-text">{habitacion.tipo}</p>
                <p className="card-text">Capacidad: {habitacion.capacidad} personas</p>
                <p className="card-text">Precio: ${habitacion.precio} / noche</p>
                <p className="text-muted">{habitacion.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Link to="/" className="btn btn-outline-secondary me-3">
          Volver a Inicio
        </Link>
        <Link to="/login" className="btn btn-outline-primary">
          Acceder al login
        </Link>
      </div>
    </div>
  );
}

export default PublicHabitaciones;
