const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per servire file statici
app.use(express.static(path.join(__dirname)));

// Middleware per il parsing JSON
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route per login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Route per dashboard admin
app.get('/dashboard_admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard_admin.html'));
});

// Route per dashboard operatore
app.get('/dashboard_operatore', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard_operatore.html'));
});

// Avvia il server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});
