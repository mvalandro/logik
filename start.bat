@echo off
title Logik Dashboard - Install & Run
color 0A

echo.
echo ========================================
echo  Logik Dashboard - Setup
echo ========================================
echo.
echo Versione Node.js:
node -v
echo.
echo Installazione dipendenze...
echo.

cd /d "%~dp0"

REM Installa dipendenze
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRORE] Installazione fallita!
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ Installazione completata!
echo ========================================
echo.
echo Avvio server...
echo.
echo URL: http://localhost:3000
echo.
echo Credenziali:
echo   Admin: admin / admin
echo   Operatore: operatore / 1234
echo.
echo Premi Ctrl+C per fermare il server
echo.

REM Avvia il server
call npm start
