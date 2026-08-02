import React, { useEffect, useState } from 'react';
import { facturasService, reservasService } from '../services/hotelService';

function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reserva: '',
    numero_factura: '',
    numero_noches: '',
    precio_noche: '',
    subtotal_hospedaje: '',
    servicios_adicionales: '',
    porcentaje_impuesto: '0',
    total: '',
    estado: 'pendiente',
    observaciones: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resFacturas, resReservas] = await Promise.all([
        facturasService.getAll(),
        reservasService.getAll()
      ]);
      setFacturas(resFacturas.data);
      setReservas(resReservas.data);
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
    let newFormData = {
      ...formData,
      [name]: value,
    };
    
    // Calcular total automáticamente
    if (['subtotal_hospedaje', 'servicios_adicionales', 'porcentaje_impuesto'].includes(name)) {
      const subtotal = parseFloat(newFormData.subtotal_hospedaje) || 0;
      const servicios = parseFloat(newFormData.servicios_adicionales) || 0;
      const porcentaje = parseFloat(newFormData.porcentaje_impuesto) || 0;
      const impuesto = (subtotal + servicios) * (porcentaje / 100);
      newFormData.total = (subtotal + servicios + impuesto).toFixed(2);
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        ...formData,
        reserva: parseInt(formData.reserva),
        numero_noches: parseInt(formData.numero_noches),
        precio_noche: parseFloat(formData.precio_noche),
        subtotal_hospedaje: parseFloat(formData.subtotal_hospedaje),
        servicios_adicionales: parseFloat(formData.servicios_adicionales),
        porcentaje_impuesto: parseFloat(formData.porcentaje_impuesto),
        total: parseFloat(formData.total),
      };
      
      if (editingId) {
        await facturasService.update(editingId, datos);
      } else {
        await facturasService.create(datos);
      }
      setFormData({
        reserva: '',
        numero_factura: '',
        numero_noches: '',
        precio_noche: '',
        subtotal_hospedaje: '',
        servicios_adicionales: '',
        porcentaje_impuesto: '0',
        total: '',
        estado: 'pendiente',
        observaciones: '',
      });
      setEditingId(null);
      setShowForm(false);
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Error al guardar la factura');
    }
  };

  const handleEdit = (factura) => {
    setFormData({
      reserva: factura.reserva,
      numero_factura: factura.numero_factura,
      numero_noches: factura.numero_noches,
      precio_noche: factura.precio_noche,
      subtotal_hospedaje: factura.subtotal_hospedaje,
      servicios_adicionales: factura.servicios_adicionales,
      porcentaje_impuesto: factura.porcentaje_impuesto,
      total: factura.total,
      estado: factura.estado,
      observaciones: factura.observaciones,
    });
    setEditingId(factura.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta factura?')) {
      try {
        await facturasService.delete(id);
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        setError('Error al eliminar la factura');
      }
    }
  };

  const handleMarcarPagada = async (id) => {
    const metodo = prompt('Método de pago (efectivo/tarjeta_credito/transferencia):');
    if (metodo) {
      try {
        await facturasService.marcarComoPagada(id, { metodo_pago: metodo });
        cargarDatos();
      } catch (error) {
        console.error('Error al marcar como pagada:', error);
        setError('Error al marcar como pagada');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      reserva: '',
      numero_factura: '',
      numero_noches: '',
      precio_noche: '',
      subtotal_hospedaje: '',
      servicios_adicionales: '',
      porcentaje_impuesto: '0',
      total: '',
      estado: 'pendiente',
      observaciones: '',
    });
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Facturas</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Nueva Factura
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nueva'} Factura</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Reserva</label>
                  <select 
                    className="form-control" 
                    name="reserva"
                    value={formData.reserva}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar reserva</option>
                    {reservas.map(r => (
                      <option key={r.id} value={r.id}>
                        ID {r.id} - {r.huesped_detalle.nombre_completo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Número Factura</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="numero_factura"
                    value={formData.numero_factura}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Número Noches</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="numero_noches"
                    value={formData.numero_noches}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Precio Noche</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="precio_noche"
                    value={formData.precio_noche}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Subtotal Hospedaje</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="subtotal_hospedaje"
                    value={formData.subtotal_hospedaje}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Servicios Adicionales</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="servicios_adicionales"
                    value={formData.servicios_adicionales}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Porcentaje Impuesto (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="porcentaje_impuesto"
                    value={formData.porcentaje_impuesto}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Total</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Estado</label>
                  <select 
                    className="form-control" 
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="pagada">Pagada</option>
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
              <th>Factura</th>
              <th>Huésped</th>
              <th>Subtotal</th>
              <th>Servicios</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td>{factura.numero_factura}</td>
                <td>{factura.reserva_detalle.huesped_detalle.nombre_completo}</td>
                <td>${factura.subtotal_hospedaje}</td>
                <td>${factura.servicios_adicionales}</td>
                <td className="fw-bold">${factura.total}</td>
                <td>
                  <span className={`badge bg-${
                    factura.estado === 'pendiente' ? 'warning' :
                    factura.estado === 'pagada' ? 'success' :
                    'danger'
                  }`}>
                    {factura.estado}
                  </span>
                </td>
                <td>
                  {factura.estado === 'pendiente' && (
                    <button 
                      className="btn btn-xs btn-success"
                      onClick={() => handleMarcarPagada(factura.id)}
                    >
                      Pagar
                    </button>
                  )}
                  <button 
                    className="btn btn-sm btn-info ms-1"
                    onClick={() => handleEdit(factura)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger ms-1"
                    onClick={() => handleDelete(factura.id)}
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

export default Facturas;
