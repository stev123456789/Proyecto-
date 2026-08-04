import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken, setBackendIP } from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backendIP, setBackendIPState] = useState(localStorage.getItem('backendIP') || 'localhost');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setBackendIP(backendIP);
      const response = await api.post('token/', {
        username,
        password,
      });

      setAuthToken(response.data.access, response.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error', err);
      setError('Usuario o contraseña inválidos. Verifica tus credenciales y servidor.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-panel auth-panel--brand">
          <div className="auth-panel__content">
            <span className="auth-panel__tag">Bienvenido de nuevo.</span>
            <h1>Accede a tu cuenta</h1>
            <p>Ingresa tus credenciales para continuar.</p>
          </div>
        </div>

        <div className="auth-panel auth-panel--form">
          <div className="auth-header">
            <div>
              <h2>Iniciar sesión</h2>
              <p>Accede con tu usuario y contraseña.</p>
            </div>
            <div className="auth-tabs">
              <span className="auth-tab auth-tab--active">Iniciar sesión</span>
              <Link to="/register" className="auth-tab auth-tab--inactive">
                Registrarse
              </Link>
            </div>
          </div>

          {error && <div className="auth-alert auth-alert--error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label">Usuario</label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />

            <label className="auth-label">Contraseña</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />

            <label className="auth-label">IP del backend</label>
            <input
              className="auth-input"
              type="text"
              value={backendIP}
              onChange={(e) => setBackendIPState(e.target.value)}
              placeholder="localhost o 192.168.1.100"
              required
            />

            <button type="submit" className="auth-button auth-button--primary">
              Iniciar sesión
            </button>
          </form>

          <div className="auth-footer">
            ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
