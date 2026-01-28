@echo off
REM Script di pulizia per Windows

REM Rimuovi file duplicati dalla root (ora sono in /public)
del dashboard_admin.html
del dashboard_operatore.html
del index.html
del login.html
del script.js
del style.css

echo ✅ Cleanup completato - Struttura pronta per Render
pause
