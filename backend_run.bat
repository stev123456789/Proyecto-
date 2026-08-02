@echo off
REM Script para ejecutar Django en red local
REM Uso: backend_run.bat

echo.
echo ============================================
echo   Servidor Backend Django - Red Local
echo ============================================
echo.

REM Obtener la IP local
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R "IPv4 Address"') do (
    for /f "tokens=1-4 delims=. " %%b in ("%%a") do (
        if "%%b" neq "" if "%%b" neq " " (
            set IP=%%b.%%c.%%d.%%e
        )
    )
)

REM Buscar la IP correcta (la que no es 127.0.0.1)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R "IPv4 Address"') do (
    set TEMP_IP=%%a
    if not "!TEMP_IP:~1,9!"=="127.0.0.1" (
        for /f "tokens=1-4 delims=. " %%b in ("!TEMP_IP!") do (
            set IP=%%b.%%c.%%d.%%e
        )
    )
)

echo Tu IP local es: %IP%
echo.
echo Iniciando Django en: http://%IP%:8000/api/
echo.

cd /d "c:\proyecto\DJANGOREST\backend"
python manage.py runserver %IP%:8000

pause
