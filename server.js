require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== API ROUTES =====

// API: Configurazione del progetto
app.get('/api/config', (req, res) => {
  res.json({
    arduinoIP: process.env.ARDUINO_IP || 'http://172.20.10.2',
    environment: NODE_ENV
  });
});

// API: Health check (per Render)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ===== PAGE ROUTES =====

// Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin dashboard
app.get('/dashboard/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard_admin.html'));
});

// Operatore dashboard
app.get('/dashboard/operatore', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard_operatore.html'));
});

// ===== ERROR HANDLING =====
app.use((req, res) => {
  res.status(404).json({ error: 'Pagina non trovata' });
});

// ===== START SERVER =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server avviato sulla porta ${PORT}`);
  console.log(`📍 Ambiente: ${NODE_ENV}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});
