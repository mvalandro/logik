# Configurazione per il deployment su Render

## Guida al Deployment su Render

### Passaggi per il deploy:

1. **Crea un account Render**
   - Vai su https://render.com
   - Registrati gratuitamente

2. **Connetti il repository GitHub**
   - Importa il progetto nel tuo account GitHub
   - Collega il repository a Render

3. **Configura il progetto su Render**
   - **Name**: logik-dashboard (o nome preferito)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (o superior a seconda delle esigenze)

4. **Variabili di Ambiente**
   - Vai a Environment Variables
   - Aggiungi: `ARDUINO_IP` = `http://172.20.10.2` (o il tuo IP Arduino)
   - Aggiungi: `NODE_ENV` = `production`

### Note importanti:

⚠️ **Comunicazione Arduino**: 
- Se l'Arduino è sulla rete locale e il sito Render è online, la comunicazione diretta non funzionerà
- Soluzioni:
  1. Installare un relay server locale
  2. Usare un cloud service per Arduino (es. Arduino Cloud, ThingSpeak)
  3. Esporre Arduino con ngrok/tunnel se in test locale

⚠️ **Port dinamica**:
- Il server è configurato per ascoltare su `process.env.PORT` (assegnata da Render)
- Non usare la porta 3000 in hardcode

### Modifica script.js per ambiente di produzione:

Se usi Render, considera di rendere dinamico l'ARDUINO_IP tramite:
- Una variabile di ambiente esposta al frontend
- Un endpoint API che ritorna la configurazione

Esempio in server.js:
\`\`\`javascript
app.get('/api/config', (req, res) => {
  res.json({
    arduinoIP: process.env.ARDUINO_IP || 'http://172.20.10.2'
  });
});
\`\`\`

Poi in script.js:
\`\`\`javascript
let ARDUINO_IP = 'http://172.20.10.2';

// Carica config dal server
fetch('/api/config')
  .then(res => res.json())
  .then(data => { ARDUINO_IP = data.arduinoIP; })
  .catch(() => console.log('Uso config di default'));
\`\`\`
