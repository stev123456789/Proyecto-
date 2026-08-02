import React, { useEffect, useState } from 'react';
import { huespedesService } from '../services/hotelService';

function Huespedes() {
  const [huespedes, setHuespedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo_documento: 'cedula',
    numero_documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    direccion: '',
    ciudad: '',
    pais: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarHuespedes();
  }, []);

  const cargarHuespedes = async () => {
    setLoading(true);
    try {
      const response = await huespedesService.getAll();
      setHuespedes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar huéspedes:', error);
      setError('Error al cargar los huéspedes');
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
        await huespedesService.update(editingId, formData);
      } else {
        await huespedesService.create(formData);
      }
      setFormData({
        tipo_documento: 'cedula',
        numero_documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        direccion: '',
        ciudad: '',
        pais: '',
      });
      setEditingId(null);
      setShowForm(false);
      cargarHuespedes();
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Error al guardar el huésped');
    }
  };

  const handleEdit = (huesped) => {
    setFormData(huesped);
    setEditingId(huesped.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este huésped?')) {
      try {
        await huespedesService.delete(id);
        cargarHuespedes();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar el huésped');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      tipo_documento: 'cedula',
      numero_documento: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      direccion: '',
      ciudad: '',
      pais: '',
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Huéspedes</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Nuevo Huésped
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nuevo'} Huésped</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tipo Documento</label>
                  <select 
                    className="form-control" 
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleInputChange}
                  >
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="licencia">Licencia</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Número Documento</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="numero_documento"
                    value={formData.numero_documento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Correo</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <textarea 
                  className="form-control" 
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  rows="2"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ciudad</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">País</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="pais"
                    value={formData.pais}
                    onChange={handleInputChange}
                  />
                </div>
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
              <th>Nombre</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {huespedes.map((huesped) => (
              <tr key={huesped.id}>
                <td>{huesped.nombre_completo}</td>
                <td>{huesped.numero_documento}</td>
                <td>{huesped.telefono}</td>
                <td>{huesped.correo}</td>
                <td>{huesped.ciudad}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(huesped)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleDelete(huesped.id)}
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

export default Huespedes;
