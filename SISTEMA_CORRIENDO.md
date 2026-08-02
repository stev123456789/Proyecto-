# 🏨 Sistema de Gestión Hotelera - EJECUTÁNDOSE

## 🚀 Servicios Activos

### Backend Django (API REST)
- **URL Base**: `http://localhost:8000/api/`
- **IP Local**: `http://0.0.0.0:8000/` (para acceso desde otras máquinas)
- **Puerto**: 8000

**Endpoints Disponibles:**
- `/habitaciones/` - Gestión de habitaciones
- `/huespedes/` - Gestión de huéspedes
- `/empleados/` - Gestión de empleados
- `/reservas/` - Gestión de reservas
- `/facturacion/` - Gestión de facturas

### Documentación API (Swagger)
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Schema OpenAPI**: http://localhost:8000/api/schema/

### Frontend React (Vite)
- **URL**: `http://localhost:5173/`
- **Puerto**: 5173

**Páginas Disponibles:**
- `/dashboard` - Menú principal
- `/dashboard/habitaciones` - CRUD de habitaciones
- `/dashboard/huespedes` - CRUD de huéspedes
- `/dashboard/empleados` - CRUD de empleados
- `/dashboard/reservas` - CRUD de reservas con check-in/check-out
- `/dashboard/facturas` - CRUD de facturas con cálculo automático

### Base de Datos
- **Sistema**: SQLite (db.sqlite3)
- **Ubicación**: `c:\proyecto\DJANGOREST\backend\db.sqlite3`

---

## 🔧 Configuración de IP para Red Distribuida

### Para acceder desde otra máquina:

1. **Obtén tu IP local**:
   ```powershell
   ipconfig
   ```
   Busca "IPv4 Address" (ejemplo: 192.168.1.100)

2. **React (fronted)** - Edita el archivo `src/services/api.js`:
   ```javascript
   const backendIP = localStorage.getItem('backendIP') || '192.168.1.100';
   ```

3. **Flutter (mobile)** - Edita el archivo `lib/services/hotel_api_service.dart`:
   ```dart
   static const String baseUrl = 'http://192.168.1.100:8000/api';
   ```

---

## 📋 Estructura de Carpetas

```
c:\proyecto\DJANGOREST\
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── backend/ (configuración Django)
│   ├── habitaciones/ (app)
│   ├── huespedes/ (app)
│   ├── empleados/ (app)
│   ├── reservas/ (app)
│   ├── facturacion/ (app)
│   ├── fronted/ (React)
│   └── mobile/ (Flutter)
└── venv/ (entorno virtual Python)
```

---

## 🛠️ Comandos Útiles

### Django
```bash
# Crear superusuario
python manage.py createsuperuser

# Acceder a admin
http://localhost:8000/admin/

# Ver migraciones
python manage.py showmigrations

# Crear datos de prueba
python manage.py shell
```

### React
```bash
# Instalar dependencias
npm install

# Compilar para producción
npm run build

# Preview de build
npm run preview
```

### Flutter
```bash
# Instalar dependencias
flutter pub get

# Correr en Android
flutter run -d android

# Correr en iOS
flutter run -d ios

# Compilar APK
flutter build apk
```

---

## ✅ Siguiente Paso

Para agregar datos de prueba, accede al admin en:
- http://localhost:8000/admin/

Usuario/Contraseña: (debes crear con createsuperuser)

