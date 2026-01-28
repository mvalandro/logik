// ===== CONFIG DINAMICA =====
let ARDUINO_IP = "http://172.20.10.2";

// Carica config dal server all'avvio
(async () => {
  try {
    const res = await fetch('/api/config');
    const config = await res.json();
    ARDUINO_IP = config.arduinoIP;
    console.log('✅ Config caricata:', config);
  } catch (err) {
    console.warn('⚠️ Config di default usata');
  }
})();

// ===== LOGIN =====
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!user || !pass) {
    errorEl.textContent = "Username e password obbligatori";
    return;
  }

  if (user === "operatore" && pass === "1234") {
    localStorage.setItem("role", "operatore");
    localStorage.setItem("operatoreOnline", "true");
    window.location.href = "/dashboard/operatore";
  }
  else if (user === "admin" && pass === "admin") {
    localStorage.setItem("role", "admin");
    window.location.href = "/dashboard/admin";
  }
  else {
    errorEl.textContent = "Credenziali errate";
    errorEl.style.display = "block";
  }
}

// ===== LOGOUT =====
function logout() {
  if (confirm("Esci davvero?")) {
    localStorage.removeItem("role");
    localStorage.setItem("operatoreOnline", "false");
    window.location.href = "/login";
  }
}

// ===== SENSORI (DA ARDUINO) =====
async function leggiSensori() {
  try {
    const res = await fetch(`${ARDUINO_IP}/status`, { timeout: 5000 });
    if (!res.ok) throw new Error('Arduino non raggiungibile');
    
    const data = await res.json();

    if (document.getElementById("temp")) {
      document.getElementById("temp").textContent = (data.temp || 0).toFixed(1);
    }

    ventoleAccese = data.fan || false;
    aggiornaUIVentole();

  } catch (err) {
    console.warn("⚠️ Arduino non disponibile:", err.message);
  }
}

// Lettura sensori ogni 3 secondi (solo se esiste il div temp)
if (document.getElementById("temp")) {
  leggiSensori(); // Lettura iniziale
  setInterval(leggiSensori, 3000);
}

// ===== OPERATORE ONLINE =====
function setOperatoreOnline(stato) {
  localStorage.setItem("operatoreOnline", stato ? "true" : "false");
}

// ===== ADMIN: Stato operatore =====
setInterval(() => {
  const status = localStorage.getItem("operatoreOnline");
  const el = document.getElementById("opStatus");
  if (el) {
    const isOnline = status === "true";
    el.textContent = isOnline ? "🟢 Online" : "🔴 Offline";
    el.style.color = isOnline ? "green" : "red";
  }
}, 1000);

// ===== VENTOLE (ARDUINO) =====
let ventoleAccese = false;

async function toggleVentole() {
  try {
    const endpoint = ventoleAccese ? "/fan/off" : "/fan/on";
    const res = await fetch(ARDUINO_IP + endpoint);
    
    if (!res.ok) throw new Error('Arduino non raggiungibile');
    
    const data = await res.json();
    ventoleAccese = data.fan;
    aggiornaUIVentole();

  } catch (err) {
    console.error("❌ Errore ventole:", err.message);
    alert("⚠️ Impossibile controllare le ventole.\nArduino non disponibile?");
  }
}

function aggiornaUIVentole() {
  const statusEl = document.getElementById("fanStatus");
  const btnEl = document.getElementById("fanBtn");

  if (!statusEl || !btnEl) return;

  statusEl.textContent = ventoleAccese ? "🟢 Accese" : "🔴 Spente";
  statusEl.style.color = ventoleAccese ? "green" : "red";
  btnEl.textContent = ventoleAccese ? "SPEGNI" : "ACCENDI";
  btnEl.className = ventoleAccese ? "btn-on" : "btn-off";
}

// ===== UTILITY =====
console.log('✅ Script caricato correttamente');
