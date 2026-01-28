# 📊 Logik Dashboard

Applicazione web per il monitoraggio e controllo di dispositivi Arduino con dashboard in tempo reale.

## ✨ Features

- 🔐 **Login con 2 ruoli**: Admin e Operatore
- 📊 **Dashboard Real-time**: Lettura sensori Arduino in tempo reale
- 🌀 **Controllo Ventole**: ON/OFF da remoto
- 📱 **Responsive Design**: Funziona su desktop, tablet e mobile
- 🔒 **Sicurezza**: Session management e logout automatico
- 🚀 **Pronto per Render**: Configurato per deploy su cloud

## 🔑 Credenziali Demo

| Ruolo | Username | Password |
|-------|----------|----------|
| Admin | `admin` | `admin` |
| Operatore | `operatore` | `1234` |

## 📁 Struttura

```
logik-dashboard/
├── public/                    # File statici
│   ├── index.html            # Login page
│   ├── dashboard_admin.html   # Admin panel
│   ├── dashboard_operatore.html # Operatore panel
│   ├── style.css             # Styling
│   └── script.js             # Client logic
├── server.js                 # Express server
├── package.json              # Dependencies
├── .env.example              # Template variabili ambiente
├── render.yaml               # Config Render
└── README.md                 # This file
```

## 🚀 Avvio Locale

### Prerequisiti
- Node.js 18+
- npm o yarn

### Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm start

# App disponibile su http://localhost:3000
```

## ☁️ Deploy su Render (Piano Gratis)

### Quick Start

1. **Push su GitHub**
   ```bash
   git push origin main
   ```

2. **Su Render Dashboard**
   - Nuovo Web Service
   - Connetti repository GitHub
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Variabili d'Ambiente**
   ```
   NODE_ENV = production
   ARDUINO_IP = http://172.20.10.2
   ```

📖 Vedi [RENDER_DEPLOY_GUIDE.md](RENDER_DEPLOY_GUIDE.md) per guida dettagliata.

## ⚙️ Configurazione Arduino

Il progetto comunica con Arduino tramite API HTTP.

**Endpoint Arduino richiesti:**

```
GET /status
Response: { "temp": 25.5, "fan": true }

GET /fan/on
Response: { "fan": true }

GET /fan/off
Response: { "fan": false }
```

### IP Arduino
Modifica in `render.yaml` o Render Environment Variables:
```
ARDUINO_IP = http://<ip-arduino>:5000
```

## 📊 API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-28T10:30:00.000Z"
}
```

### Configurazione
```
GET /api/config
```
Response:
```json
{
  "arduinoIP": "http://172.20.10.2",
  "environment": "production"
}
```

## 🔐 Security Features

- ✅ Login con credenziali
- ✅ localStorage per session management
- ✅ Logout automatico dopo 15 min inattività
- ✅ Protezione route (redirect to login se non autenticato)
- ✅ HTTPS su Render

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## ⚠️ Limitazioni Piano Free Render

- **Cold Start**: App si ferma dopo 15 min inattività
- **Primo accesso**: Può richiedere 30-60 secondi
- **Memoria**: 1GB RAM
- **Uptime**: 750 ore/mese (sufficiente per 1 app)

## 🔧 Troubleshooting

### Port già in uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### Arduino non raggiungibile
- Verifica IP Arduino
- Controlla firewall locale
- Prova ping da browser: `curl http://<ip-arduino>/status`

### Errore npm start
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 Variabili Ambiente

Copia `.env.example` in `.env`:
```bash
cp .env.example .env
```

Modifica i valori:
```
NODE_ENV=development
ARDUINO_IP=http://172.20.10.2
PORT=3000
```

## 🎨 Personalizzazione

### Colori
Modifica `public/style.css` - Gradient principali:
- Primary: `#667eea` → `#764ba2`
- Success: `#51cf66`
- Error: `#ff6b6b`

### Credenziali
Modifica in `public/script.js` funzione `login()`:
```javascript
if (user === "admin" && pass === "admin") {
  // Admin login
}
```

## 📚 Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Deploy**: Render
- **Hosting**: Cloud (free tier)

## 📄 License

ISC

## 📧 Support

Per problemi o suggerimenti, contatta lo sviluppatore.

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: Gennaio 2025  
**Status**: ✅ Pronto per produzione