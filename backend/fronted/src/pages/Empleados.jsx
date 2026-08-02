import React, { useEffect, useState } from 'react';
import { empleadosService } from '../services/hotelService';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cargo: 'recepcionista',
    telefono: '',
    correo: '',
    numero_documento: '',
    fecha_ingreso: '',
    salario: '',
    estado: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const response = await empleadosService.getAll();
      setEmpleados(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      setError('Error al cargar los empleados');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await empleadosService.update(editingId, formData);
      } else {
        await empleadosService.create(formData);
      }
      setFormData({
        nombre: '',
        apellido: '',
        cargo: 'recepcionista',
        telefono: '',
        correo: '',
        numero_documento: '',
        fecha_ingreso: '',
        salario: '',
        estado: true,
      });
      setEditingId(null);
      setShowForm(false);
      cargarEmpleados();
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Error al guardar el empleado');
    }
  };

  const handleEdit = (empleado) => {
    setFormData(empleado);
    setEditingId(empleado.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await empleadosService.delete(id);
        cargarEmpleados();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar el empleado');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      apellido: '',
      cargo: 'recepcionista',
      telefono: '',
      correo: '',
      numero_documento: '',
      fecha_ingreso: '',
      salario: '',
      estado: true,
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Empleados</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Nuevo Empleado
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nuevo'} Empleado</h5>
            <form onSubmit={handleSubmit}>
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
                  <label className="form-label">Cargo</label>
                  <select 
                    className="form-control" 
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                  >
                    <option value="recepcionista">Recepcionista</option>
                    <option value="administrador">Administrador</option>
                    <option value="limpieza">Personal de Limpieza</option>
                    <option value="seguridad">Seguridad</option>
                    <option value="mantenimiento">Mantenimiento</option>
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
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
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
                  />
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
                  <label className="form-label">Salario</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="salario"
                    value={formData.salario}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    name="estado"
                    id="estado"
                    checked={formData.estado}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="estado">
                    Estado Activo
                  </label>
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
              <th>Cargo</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Salario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre_completo}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.correo}</td>
                <td>${empleado.salario}</td>
                <td>
                  <span className={`badge bg-${empleado.estado ? 'success' : 'danger'}`}>
                    {empleado.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(empleado)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleDelete(empleado.id)}
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

export default Empleados;
