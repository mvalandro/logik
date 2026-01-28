#!/bin/bash
# Script di pulizia per il repo

# Rimuovi file duplicati dalla root (ora sono in /public)
rm -f dashboard_admin.html
rm -f dashboard_operatore.html
rm -f index.html
rm -f login.html
rm -f script.js
rm -f style.css

# Mantieni i vecchi file di documentazione per riferimento
# rm -f DEPLOY_RENDER.md

echo "✅ Cleanup completato - Struttura pronta per Render"
