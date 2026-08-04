import { Link } from 'react-router-dom';
import { useState } from 'react';

const habitacionesDemo = [
  {
    id: 1,
    numero: '101',
    tipo: 'Deluxe',
    capacidad: 2,
    precio: 120,
    descripcion: 'Habitación suave y luminosa, ideal para parejas en busca de confort.',
  },
  {
    id: 2,
    numero: '205',
    tipo: 'Standard',
    capacidad: 4,
    precio: 220,
    descripcion: 'Espacio amplio con estilo contemporáneo, perfecto para familias pequeñas.',
  },
  {
    id: 3,
    numero: '307',
    tipo: 'Suite',
    capacidad: 2,
    precio: 340,
    descripcion: 'Suite premium con sala de estar privada y servicios exclusivos.',
  },
];

const filtros = ['Todas', 'Deluxe', 'Standard', 'Suite'];

function PublicHabitaciones() {
  const [filtro, setFiltro] = useState('Todas');
  const habitacionesFiltradas = filtro === 'Todas'
    ? habitacionesDemo
    : habitacionesDemo.filter((habitacion) => habitacion.tipo === filtro);

  return (
    <div className="public-page">
      <section className="rooms-hero">
        <div className="rooms-hero__copy">
          <span className="hero-badge">Explora nuestras habitaciones</span>
          <h1>Habitaciones cómodas y sofisticadas para cada tipo de viaje</h1>
          <p className="hero-text">
            Elige entre Deluxe, Standard y Suite. Conoce precios, capacidad y características desde un solo lugar.
          </p>
          <div className="hero-actions">
            <Link to="/" className="btn btn-secondary">
              Volver a Inicio
            </Link>
            <Link to="/login" className="btn btn-primary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <div className="rooms-filter">
        {filtros.map((opcion) => (
          <button
            key={opcion}
            type="button"
            className={`rooms-filter__pill ${filtro === opcion ? 'active' : ''}`}
            onClick={() => setFiltro(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      <section className="rooms-grid">
        {habitacionesFiltradas.map((habitacion) => (
          <article key={habitacion.id} className="room-card">
            <div className="room-card__image">Habitación {habitacion.numero}</div>
            <div className="room-card__content">
              <h3 className="room-card__title">{habitacion.tipo}</h3>
              <div className="room-card__meta">
                <span>Capacidad: {habitacion.capacidad}</span>
                <span>Precio: ${habitacion.precio}/noche</span>
              </div>
              <p className="room-card__description">{habitacion.descripcion}</p>
            </div>
            <div className="room-card__footer">
              <div className="room-card__price">${habitacion.precio}</div>
              <Link to="/login" className="btn room-card__button">
                Reservar
              </Link>
            </div>
          </article>
        ))}
      </section>

      {habitacionesFiltradas.length === 0 && (
        <div className="room-card room-card--empty">
          <h3>No se encontraron habitaciones</h3>
          <p>Prueba otro filtro o regresa a la página de inicio.</p>
        </div>
      )}
    </div>
  );
}

export default PublicHabitaciones;
