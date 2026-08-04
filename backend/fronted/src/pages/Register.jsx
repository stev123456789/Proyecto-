import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!acceptedTerms) {
      setError('Debes aceptar los términos de servicio y la política de privacidad.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setSuccess('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAcceptedTerms(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-panel auth-panel--brand">
          <div className="auth-panel__content">
            <span className="auth-panel__tag">Registro</span>
            <h1>Registro de un nuevo usuario.</h1>
            <p>Completa el formulario para comenzar.</p>
          </div>
        </div>

        <div className="auth-panel auth-panel--form">
          <div className="auth-header">
            <div>
              <h2>Crea tu cuenta</h2>
              <p>Completa el formulario para comenzar.</p>
            </div>
            <div className="auth-tabs">
              <Link to="/login" className="auth-tab auth-tab--inactive">
                Iniciar sesión
              </Link>
              <span className="auth-tab auth-tab--active">Registrarse</span>
            </div>
          </div>

          {error && <div className="auth-alert auth-alert--error">{error}</div>}
          {success && <div className="auth-alert auth-alert--success">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label">Nombre completo</label>
            <input
              className="auth-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="María García"
              required
            />

            <label className="auth-label">Correo electrónico</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />

            <label className="auth-label">Contraseña</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />

            <label className="auth-label">Confirmar contraseña</label>
            <input
              className="auth-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />

            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span>Acepto los <strong>Términos de servicio</strong> y la <strong>Política de privacidad</strong></span>
            </label>

            <button type="submit" className="auth-button auth-button--primary">
              Crear cuenta
            </button>
          </form>

          <div className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
