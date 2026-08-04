import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      setError('Usuario o contraseña inválidos. Verifica tu servidor y credenciales.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-center">Iniciar sesión</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">IP del backend</label>
                  <input
                    type="text"
                    className="form-control"
                    value={backendIP}
                    onChange={(e) => setBackendIPState(e.target.value)}
                    placeholder="localhost o 192.168.1.100"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
