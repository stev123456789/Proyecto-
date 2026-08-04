# 🏨 Configuración del Sistema de Gestión Hotelera en Red

## 📋 Resumen
- **Laptop 1 (TU LAPTOP):** Backend Django REST + Base de Datos
- **Laptops 2, 3, 4, 5:** Frontend React (conectadas al backend)
- **Móvil:** App Flutter (conectada al backend)

---

## 🔧 PASO 0: Obtener tu IP Local

Antes de empezar, necesitas saber la IP de tu laptop en la red local.

### En Windows (tu laptop):
```powershell
ipconfig
```
Busca la línea que dice `IPv4 Address:` en tu conexión de red (usualmente `192.168.x.x` o `10.0.x.x`)

**Anota tu IP:** `___________________________`

---

## 📱 LAPTOP 1: Backend Django REST (TU LAPTOP)

### 1. Asegúrate de tener PostgreSQL instalado
```bash
# En Windows, desde PowerShell:
# Si no tienes PostgreSQL, descárgalo desde: https://www.postgresql.org/download/windows/
```

### 2. Verifica que PostgreSQL está corriendo
```powershell
# Abre Services (services.msc) y verifica que postgresql-x64 está corriendo
```

### 3. Crea la base de datos (si no existe)
```powershell
# Abre pgAdmin o desde PowerShell:
psql -U postgres -c "CREATE DATABASE django_rest_bdd;"
```

### 4. Navega a la carpeta del backend
```powershell
cd c:\proyecto\DJANGOREST\backend
```

### 5. Instala las dependencias de Python
```powershell
pip install -r requirements.txt
```
Si no tienes `requirements.txt`, instala manualmente:
```powershell
pip install django djangorestframework django-cors-headers psycopg2-binary djangorestframework-simplejwt drf-spectacular
```

### 6. Realiza las migraciones
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 7. Crea un superusuario (solo si no tienes)
```powershell
python manage.py createsuperuser
```

### 8. Ejecuta el backend en Linux para la LAN
Si tu backend está en Linux y tus clientes son Windows, ejecuta el servidor en todas las interfaces:
```bash
python manage.py runserver 0.0.0.0:8000
```

> En una topología en estrella, el servidor Linux es el nodo central y Windows se conecta a él usando su IP.

### 9. Configura Windows para conectarse al backend Linux
En Windows, abre `backend/fronted/src/services/api.js` y reemplaza el valor de `localhost` con la IP del Linux:
```javascript
const backendIP = '192.168.1.100';
```

También puedes usar el formulario de login para introducir la IP del servidor backend.

### 10. Ejecuta el backend escuchando en tu IP local (opcional)
Si prefieres no usar `0.0.0.0`, ejecuta Django directamente en la IP del servidor Linux:
```powershell
# Reemplaza 192.168.1.100 con tu IP real
python manage.py runserver 192.168.1.100:8000
```

**Verifica que funciona:** Abre en tu navegador: `http://192.168.1.100:8000/api/`

Deberías ver un JSON o un panel de la API.

---

## 💻 LAPTOPS 2, 3, 4, 5: Frontend React

### 1. Clona o copia el proyecto
```bash
# Opción 1: Copia la carpeta fronted desde tu laptop
# Opción 2: Si tienes Git:
git clone https://github.com/USERNAME/REPO.git
cd REPO/backend/fronted
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. **Configura la IP del backend**
Edita el archivo `src/services/api.js` y reemplaza `localhost` por la IP de tu laptop:

```javascript
const getBaseURL = () => {
  const backendIP = '192.168.1.100';  // ← Reemplaza con tu IP
  return `http://${backendIP}:8000/api/`;
};
```

### 4. Ejecuta el servidor de desarrollo
```bash
npm run dev
```

**Verifica que funciona:** 
- Abre en tu navegador: `http://localhost:5173`
- Deberías ver la aplicación cargada correctamente

---

## 📱 MÓVIL: Flutter

### 1. Asegúrate de tener Flutter instalado
```bash
flutter --version
```

### 2. Navega a la carpeta del móvil
```bash
cd c:\proyecto\DJANGOREST\mobile
```

### 3. Instala las dependencias
```bash
flutter pub get
```

### 4. **Configura la IP del backend**
Edita el archivo `lib/services/api.dart` o donde esté configurada la API:

```dart
final String backendIP = '192.168.1.100:8000';  // ← Reemplaza con tu IP
final String baseURL = 'http://$backendIP/api/';
```

### 5. Ejecuta en emulador o dispositivo
```bash
# En emulador:
flutter emulators --launch android_emulator

# En dispositivo físico (conectado por USB):
flutter run
```

---

## ✅ Pruebas de Conectividad

### Desde cualquier laptop/móvil, verifica que todo funciona:

**1. Backend accesible:**
```bash
# Desde PowerShell o terminal:
curl http://192.168.1.100:8000/api/
```

**2. Base de datos accesible:**
- En PostgreSQL, asegúrate que escucha en todas las interfaces
- Edita `C:\Program Files\PostgreSQL\X\data\postgresql.conf`
- Busca `listen_addresses` y cámbialo a `'*'` (escucha en todas las IPs)

**3. Frontend se conecta:**
- Abre las DevTools del navegador (F12)
- En la pestaña Network, verifica que las llamadas a `http://192.168.1.100:8000/api/...` son exitosas

---

## 🚨 Problemas Comunes

### "No puedo acceder a http://192.168.1.100:8000"
- Verifica que Django está corriendo en esa IP: `python manage.py runserver 192.168.1.100:8000`
- Verifica el firewall de Windows: permite Python en el puerto 8000
- Verifica que estás en la misma red (wifi/ethernet)

### "CORS error"
- Django ya está configurado con `CORS_ALLOW_ALL_ORIGINS = True`
- Si sigue fallando, reinicia el servidor Django

### "No puede conectar a la base de datos"
- Verifica que PostgreSQL está corriendo
- Verifica usuario y contraseña en `settings.py`
- Verifica el HOST en `settings.py` (debería ser `127.0.0.1` si está en tu laptop)

### "Móvil no ve el backend"
- Usa la IP de tu laptop, no `localhost`
- Verifica que el móvil y tu laptop están en la misma red
- Si usas emulador Android, prueba con `10.0.2.2` en lugar de `192.168.x.x`

---

## 🎯 Flujo de Uso

1. **Tu laptop:** Ejecuta el backend
   ```powershell
   cd c:\proyecto\DJANGOREST\backend
   python manage.py runserver 192.168.1.100:8000
   ```

2. **Otras laptops:** Ejecutan el frontend
   ```bash
   cd ruta/fronted
   npm run dev
   ```

3. **Móvil:** Ejecuta la app
   ```bash
   flutter run
   ```

4. **Todos ven los mismos datos** porque todos consultan la misma base de datos

---

## 📝 Notas Importantes

- Cambia `192.168.1.100` por tu IP real en TODAS las instrucciones
- Asegúrate que el firewall permite conexiones en puerto 8000
- Si cambias de red wifi, la IP puede cambiar
- PostgreSQL debe estar accesible desde la red (edita `postgresql.conf` si es necesario)

