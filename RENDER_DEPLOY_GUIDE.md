# Logik Dashboard - Guida Deploy su Render (Piano Gratis)

## 📋 Prerequisiti

- ✅ Repository GitHub
- ✅ Account Render (https://render.com)

---

## 🚀 Step-by-Step Deploy

### 1. Prepara il Repository

```bash
git init
git add .
git commit -m "Initial commit - Logik Dashboard"
git remote add origin https://github.com/tuoutente/logik-dashboard.git
git push -u origin main
```

### 2. Su Render Dashboard

1. Vai su https://dashboard.render.com/
2. Clicca **"New Web Service"**
3. Seleziona **"Build and deploy from a Git repository"**
4. Connetti il tuo repository GitHub

### 3. Configura il Progetto

| Campo | Valore |
|-------|--------|
| **Name** | `logik-dashboard` |
| **Environment** | `Node` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### 4. Variabili di Ambiente

Vai su **Environment** e aggiungi:

```
NODE_ENV = production
ARDUINO_IP = http://172.20.10.2
```

### 5. Deploy

Clicca **"Deploy"** - Render costruirà automaticamente l'app!

---

## ⚙️ Struttura Progetto

```
logik-dashboard/
├── public/                 # File statici (HTML, CSS, JS)
│   ├── index.html         # Login page
│   ├── dashboard_admin.html
│   ├── dashboard_operatore.html
│   ├── style.css
│   └── script.js
├── server.js              # Server Express
├── package.json
├── .env.example
├── .gitignore
└── render.yaml            # Configurazione Render
```

---

## 🔐 Credenziali Demo

- **Admin**: `admin` / `admin`
- **Operatore**: `operatore` / `1234`

---

## ⚠️ Note Importanti

### Comunicazione Arduino

**Il server Render è cloud, Arduino è locale** → La comunicazione diretta non funziona.

**Soluzioni:**

#### Opzione 1: Arduino Cloud (Consigliato)
- Usa Arduino Cloud per esporre Arduino online
- Modifica `ARDUINO_IP` in Render settings

#### Opzione 2: Relay Server Locale
Installa un relay server sulla tua rete locale che espone Arduino

#### Opzione 3: ngrok (Testing)
```bash
ngrok http 5000  # Espone Arduino localmente
```

### Cold Start del Piano Free

- Render mette in sleep le app inattive per 15 min
- Primo accesso può impiegare 30-60 secondi
- Non è un problema di produzione

### Limiti Piano Free

- ✅ 750 ore/mese (illimitato singola app)
- ✅ 1GB RAM
- ❌ Stop automatico dopo inattività
- ✅ HTTPS incluso

---

## 📊 Monitoraggio

- **Logs**: Dashboard Render → Logs
- **Health Check**: `https://tuo-app.onrender.com/api/health`

---

## 🔄 Deploy Automatico

Ogni push a GitHub triggera deploy automatico su Render!

```bash
git push origin main  # Auto-deploya su Render
```

---

## 📱 Acceso da Mobile

L'app è responsive e funziona perfettamente su smartphone!

**URL**: `https://logik-dashboard.onrender.com`

---

## 🆘 Troubleshooting

### "Service failed to start"
- Controlla i logs
- Verifica che `npm start` funzioni localmente
- Assicurati che PORT sia `process.env.PORT`

### Arduino non raggiungibile
- Controlla ARDUINO_IP in environment variables
- Verifica che Arduino abbia endpoint `/status`

### Errore 404 on `/dashboard/*`
- Le route sono `/dashboard/admin` e `/dashboard/operatore`
- Verifica script.js e server.js

---

## 📝 File Principali

### `server.js`
- Server Express
- Route pages
- API /config e /health

### `public/script.js`
- Login logic
- Arduino communication
- Real-time sensor updates

### `render.yaml`
- Configurazione Render
- Variabili d'ambiente

---

## ✨ Features Attuali

✅ Login con 2 ruoli (admin/operatore)  
✅ Dashboard real-time (sensori Arduino)  
✅ Controllo ventole  
✅ Monitoraggio operatore online  
✅ Responsive design  
✅ Session timeout (15 min)  

---

Buon deploy! 🚀
