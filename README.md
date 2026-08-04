# 🏨 Sistema de Gestión Hotelera

Un sistema completo de gestión hotelera con backend Django REST, frontend React y aplicación móvil Flutter.

## 📋 Características

- **Gestión de Habitaciones** - Control de disponibilidad, tipos y precios
- **Gestión de Huéspedes** - Registro completo de clientes
- **Gestión de Empleados** - Control de personal y cargos
- **Sistema de Reservas** - Reservaciones con check-in y check-out automático
- **Facturación** - Generación de facturas con cálculo automático de impuestos

## 🚀 Requisitos

- Python 3.12+
- Node.js 16+
- Flutter 3.44+
- Git

## 🛠️ Instalación

### Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

### Frontend (React)

```bash
cd backend/fronted
npm install
npm run dev
```

### Móvil (Flutter)

```bash
cd backend/mobile
flutter pub get
flutter run -d <device_id>
```

## 📚 Documentación API

Una vez que el backend esté corriendo, accede a:

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Admin Django**: http://localhost:8000/admin/

## 🌐 Acceso en Red Distribuida

Para acceder desde otra máquina, reemplaza `localhost` con la IP local del servidor Linux que ejecuta el backend.

### Topología LAN en Estrella

En una red LAN en estrella, el servidor Linux actúa como nodo central. Los clientes Windows y móviles se conectan directamente al servidor central a través de su IP.

- El backend debe ejecutarse en el host Linux con `0.0.0.0:8000`.
- Los clientes Windows usan la IP del Linux, por ejemplo `192.168.1.100`.
- El firewall del servidor debe permitir conexiones entrantes al puerto `8000`.

### React

Edita `fronted/src/services/api.js` o usa el login del frontend para establecer la IP del servidor Linux:
```javascript
const backendIP = '192.168.1.100';  // IP de Linux
```

### Flutter

Edita `mobile/lib/services/hotel_api_service.dart` o el archivo de API equivalente:
```dart
static const String baseUrl = 'http://192.168.1.100:8000/api';  // IP de Linux
```

### Windows -> Linux

1. En el servidor Linux:
```bash
cd /ruta/al/proyecto/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```
2. En el cliente Windows:
```powershell
cd \ruta\al\proyecto\backend\fronted
npm install
npm run dev
```
3. En el login del frontend, usa la IP del servidor Linux y tus credenciales.

## 📁 Estructura del Proyecto

```
DJANGOREST/
├── backend/
│   ├── habitaciones/        # App: Gestión de habitaciones
│   ├── huespedes/           # App: Gestión de huéspedes
│   ├── empleados/           # App: Gestión de empleados
│   ├── reservas/            # App: Sistema de reservas
│   ├── facturacion/         # App: Facturación
│   ├── fronted/             # Frontend React (Vite)
│   ├── mobile/              # App Flutter
│   └── manage.py
├── venv/                    # Entorno virtual Python
└── .gitignore
```

## 🔧 Endpoints API

### Habitaciones
- `GET /api/habitaciones/` - Listar habitaciones
- `POST /api/habitaciones/` - Crear habitación
- `GET /api/habitaciones/{id}/` - Obtener habitación
- `PUT /api/habitaciones/{id}/` - Actualizar habitación
- `DELETE /api/habitaciones/{id}/` - Eliminar habitación

### Huéspedes
- `GET /api/huespedes/` - Listar huéspedes
- `POST /api/huespedes/` - Crear huésped
- `GET /api/huespedes/{id}/` - Obtener huésped
- `PUT /api/huespedes/{id}/` - Actualizar huésped
- `DELETE /api/huespedes/{id}/` - Eliminar huésped

### Empleados
- `GET /api/empleados/` - Listar empleados
- `POST /api/empleados/` - Crear empleado
- `GET /api/empleados/{id}/` - Obtener empleado
- `PUT /api/empleados/{id}/` - Actualizar empleado
- `DELETE /api/empleados/{id}/` - Eliminar empleado

### Reservas
- `GET /api/reservas/` - Listar reservas
- `POST /api/reservas/` - Crear reserva
- `GET /api/reservas/{id}/` - Obtener reserva
- `PUT /api/reservas/{id}/` - Actualizar reserva
- `DELETE /api/reservas/{id}/` - Eliminar reserva
- `POST /api/reservas/{id}/hacer_checkin/` - Check-in
- `POST /api/reservas/{id}/hacer_checkout/` - Check-out

### Facturas
- `GET /api/facturas/` - Listar facturas
- `POST /api/facturas/` - Crear factura
- `GET /api/facturas/{id}/` - Obtener factura
- `PUT /api/facturas/{id}/` - Actualizar factura
- `DELETE /api/facturas/{id}/` - Eliminar factura
- `POST /api/facturas/{id}/marcar_como_pagada/` - Marcar como pagada

## 👥 Autores

- Steven - Desarrollo Full Stack

## 📄 Licencia

MIT License

---

**Nota**: Este es un proyecto de desarrollo. Para producción, se recomienda usar HTTPS, una base de datos PostgreSQL y un servidor WSGI/ASGI adecuado.
