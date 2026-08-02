import api from '../api';

// Habitaciones
export const habitacionesService = {
  getAll: () => api.get('habitaciones/'),
  getById: (id) => api.get(`habitaciones/${id}/`),
  create: (data) => api.post('habitaciones/', data),
  update: (id, data) => api.put(`habitaciones/${id}/`, data),
  delete: (id) => api.delete(`habitaciones/${id}/`),
  search: (query) => api.get(`habitaciones/?search=${query}`),
  filterByEstado: (estado) => api.get(`habitaciones/?estado=${estado}`),
};

// Huéspedes
export const huespedesService = {
  getAll: () => api.get('huespedes/'),
  getById: (id) => api.get(`huespedes/${id}/`),
  create: (data) => api.post('huespedes/', data),
  update: (id, data) => api.put(`huespedes/${id}/`, data),
  delete: (id) => api.delete(`huespedes/${id}/`),
  search: (query) => api.get(`huespedes/?search=${query}`),
};

// Empleados
export const empleadosService = {
  getAll: () => api.get('empleados/'),
  getById: (id) => api.get(`empleados/${id}/`),
  create: (data) => api.post('empleados/', data),
  update: (id, data) => api.put(`empleados/${id}/`, data),
  delete: (id) => api.delete(`empleados/${id}/`),
  search: (query) => api.get(`empleados/?search=${query}`),
  filterByCargo: (cargo) => api.get(`empleados/?cargo=${cargo}`),
};

// Reservas
export const reservasService = {
  getAll: () => api.get('reservas/'),
  getById: (id) => api.get(`reservas/${id}/`),
  create: (data) => api.post('reservas/', data),
  update: (id, data) => api.put(`reservas/${id}/`, data),
  delete: (id) => api.delete(`reservas/${id}/`),
  search: (query) => api.get(`reservas/?search=${query}`),
  hacerCheckin: (id) => api.post(`reservas/${id}/hacer_checkin/`),
  hacerCheckout: (id) => api.post(`reservas/${id}/hacer_checkout/`),
};

// Facturas
export const facturasService = {
  getAll: () => api.get('facturas/'),
  getById: (id) => api.get(`facturas/${id}/`),
  create: (data) => api.post('facturas/', data),
  update: (id, data) => api.put(`facturas/${id}/`, data),
  delete: (id) => api.delete(`facturas/${id}/`),
  search: (query) => api.get(`facturas/?search=${query}`),
  marcarComoPagada: (id, datos) => api.post(`facturas/${id}/marcar_como_pagada/`, datos),
};
