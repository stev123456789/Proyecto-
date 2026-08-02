import React, { useEffect, useState } from 'react';
import { habitacionesService } from '../services/hotelService';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    numero: '',
    tipo: 'sencilla',
    precio: '',
    estado: 'disponible',
    capacidad: '',
    descripcion: '',
    amenidades: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const cargarHabitaciones = async () => {
    setLoading(true);
    try {
      const response = await habitacionesService.getAll();
      setHabitaciones(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar habitaciones:', error);
      setError('Error al cargar las habitaciones');
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
      if (editingId) {
        await habitacionesService.update(editingId, formData);
      } else {
        await habitacionesService.create(formData);
      }
      setFormData({
        numero: '',
        tipo: 'sencilla',
        precio: '',
        estado: 'disponible',
        capacidad: '',
        descripcion: '',
        amenidades: '',
      });
      setEditingId(null);
      setShowForm(false);
      cargarHabitaciones();
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Error al guardar la habitación');
    }
  };

  const handleEdit = (habitacion) => {
    setFormData(habitacion);
    setEditingId(habitacion.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta habitación?')) {
      try {
        await habitacionesService.delete(id);
        cargarHabitaciones();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar la habitación');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      numero: '',
      tipo: 'sencilla',
      precio: '',
      estado: 'disponible',
      capacidad: '',
      descripcion: '',
      amenidades: '',
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Habitaciones</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Nueva Habitación
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nueva'} Habitación</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Número</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tipo</label>
                  <select 
                    className="form-control" 
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                  >
                    <option value="sencilla">Sencilla</option>
                    <option value="doble">Doble</option>
                    <option value="suite">Suite</option>
                    <option value="presidencial">Presidencial</option>
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Capacidad</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="capacidad"
                    value={formData.capacidad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select 
                  className="form-control" 
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                >
                  <option value="disponible">Disponible</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="reservada">Reservada</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control" 
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Amenidades</label>
                <textarea 
                  className="form-control" 
                  name="amenidades"
                  value={formData.amenidades}
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Número</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Capacidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion) => (
              <tr key={habitacion.id}>
                <td>{habitacion.numero}</td>
                <td>{habitacion.tipo}</td>
                <td>${habitacion.precio}</td>
                <td>
                  <span className={`badge bg-${
                    habitacion.estado === 'disponible' ? 'success' :
                    habitacion.estado === 'ocupada' ? 'danger' :
                    habitacion.estado === 'reservada' ? 'warning' :
                    'secondary'
                  }`}>
                    {habitacion.estado}
                  </span>
                </td>
                <td>{habitacion.capacidad}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(habitacion)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleDelete(habitacion.id)}
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

export default Habitaciones;
