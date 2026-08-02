import React, { useEffect, useState } from 'react';
import { reservasService, habitacionesService, huespedesService } from '../services/hotelService';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    habitacion: '',
    huesped: '',
    fecha_ingreso: '',
    fecha_salida: '',
    estado: 'pendiente',
    precio_noche: '',
    numero_personas: '',
    observaciones: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resReservas, resHabitaciones, resHuespedes] = await Promise.all([
        reservasService.getAll(),
        habitacionesService.getAll(),
        huespedesService.getAll()
      ]);
      setReservas(resReservas.data);
      setHabitaciones(resHabitaciones.data);
      setHuespedes(resHuespedes.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        ...formData,
        habitacion: parseInt(formData.habitacion),
        huesped: parseInt(formData.huesped),
        precio_noche: parseFloat(formData.precio_noche),
        numero_personas: parseInt(formData.numero_personas),
      };
      
      if (editingId) {
        await reservasService.update(editingId, datos);
      } else {
        await reservasService.create(datos);
      }
      setFormData({
        habitacion: '',
        huesped: '',
        fecha_ingreso: '',
        fecha_salida: '',
        estado: 'pendiente',
        precio_noche: '',
        numero_personas: '',
        observaciones: '',
      });
      setEditingId(null);
      setShowForm(false);
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Error al guardar la reserva');
    }
  };

  const handleEdit = (reserva) => {
    setFormData({
      habitacion: reserva.habitacion,
      huesped: reserva.huesped,
      fecha_ingreso: reserva.fecha_ingreso,
      fecha_salida: reserva.fecha_salida,
      estado: reserva.estado,
      precio_noche: reserva.precio_noche,
      numero_personas: reserva.numero_personas,
      observaciones: reserva.observaciones,
    });
    setEditingId(reserva.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
      try {
        await reservasService.delete(id);
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar la reserva');
      }
    }
  };

  const handleCheckin = async (id) => {
    try {
      await reservasService.hacerCheckin(id);
      cargarDatos();
    } catch (error) {
      console.error('Error al hacer check-in:', error);
      setError('Error al hacer check-in');
    }
  };

  const handleCheckout = async (id) => {
    try {
      await reservasService.hacerCheckout(id);
      cargarDatos();
    } catch (error) {
      console.error('Error al hacer check-out:', error);
      setError('Error al hacer check-out');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      habitacion: '',
      huesped: '',
      fecha_ingreso: '',
      fecha_salida: '',
      estado: 'pendiente',
      precio_noche: '',
      numero_personas: '',
      observaciones: '',
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Reservas</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Nueva Reserva
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nueva'} Reserva</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Huésped</label>
                  <select 
                    className="form-control" 
                    name="huesped"
                    value={formData.huesped}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar huésped</option>
                    {huespedes.map(h => (
                      <option key={h.id} value={h.id}>{h.nombre_completo}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Habitación</label>
                  <select 
                    className="form-control" 
                    name="habitacion"
                    value={formData.habitacion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar habitación</option>
                    {habitaciones.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.numero} - {h.tipo} - ${h.precio}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha Ingreso</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="fecha_ingreso"
                    value={formData.fecha_ingreso}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha Salida</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="fecha_salida"
                    value={formData.fecha_salida}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Precio Noche</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="precio_noche"
                    value={formData.precio_noche}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Número Personas</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="numero_personas"
                    value={formData.numero_personas}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Estado</label>
                  <select 
                    className="form-control" 
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="activa">Activa</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Observaciones</label>
                <textarea 
                  className="form-control" 
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>

              <button type="submit" className="btn btn-success">Guardar</button>
              <button 
                type="button" 
                className="btn btn-secondary ms-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center"><p>Cargando...</p></div>
      ) : (
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Huésped</th>
              <th>Habitación</th>
              <th>Ingreso</th>
              <th>Salida</th>
              <th>Noches</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.huesped_detalle.nombre_completo}</td>
                <td>{reserva.habitacion_detalle.numero}</td>
                <td>{reserva.fecha_ingreso}</td>
                <td>{reserva.fecha_salida}</td>
                <td>{reserva.numero_noches}</td>
                <td>${reserva.precio_total}</td>
                <td>
                  <span className={`badge bg-${
                    reserva.estado === 'pendiente' ? 'secondary' :
                    reserva.estado === 'confirmada' ? 'info' :
                    reserva.estado === 'activa' ? 'warning' :
                    reserva.estado === 'completada' ? 'success' :
                    'danger'
                  }`}>
                    {reserva.estado}
                  </span>
                </td>
                <td>
                  {reserva.estado === 'confirmada' && (
                    <button 
                      className="btn btn-xs btn-warning"
                      onClick={() => handleCheckin(reserva.id)}
                      title="Check-in"
                    >
                      Check-in
                    </button>
                  )}
                  {reserva.estado === 'activa' && (
                    <button 
                      className="btn btn-xs btn-info"
                      onClick={() => handleCheckout(reserva.id)}
                      title="Check-out"
                    >
                      Check-out
                    </button>
                  )}
                  <button 
                    className="btn btn-sm btn-info ms-1"
                    onClick={() => handleEdit(reserva)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-1"
                    onClick={() => handleDelete(reserva.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reservas;
