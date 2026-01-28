// ================= CONFIG =================
const ARDUINO_IP = "http://172.20.10.2"; // <-- METTI QUI L'IP DEL TUO UNO R4 WIFI



// ---- LOGIN ----
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "operatore" && pass === "1234") {
        localStorage.setItem("role", "operatore");
        localStorage.setItem("operatoreOnline", "true");
        window.location.href = "dashboard_operatore.html";
    }
    else if (user === "admin" && pass === "admin") {
        localStorage.setItem("role", "admin");
        window.location.href = "dashboard_admin.html";
    }
    else {
        document.getElementById("error").textContent = "Credenziali errate";
    }
}

// ---- LOGOUT ----
function logout() {
    localStorage.removeItem("role");
    localStorage.setItem("operatoreOnline", "false");
    window.location.href = "login.html";
}



// ---- SENSORI (LETTI DA ARDUINO) ----
async function leggiSensori() {
    try {
        const res = await fetch(`${ARDUINO_IP}/status`);
        const data = await res.json();

        if (document.getElementById("temp")) {
            document.getElementById("temp").textContent = data.temp;
        }

        // Stato ventole sincronizzato
        ventoleAccese = data.fan;
        aggiornaUIVentole();

    } catch (err) {
        console.error("Errore lettura sensori:", err);
    }
}

// aggiorna ogni 3 secondi
setInterval(leggiSensori, 3000);



// ---- OPERATORE ONLINE (solo lato web) ----
function setOperatoreOnline(stato) {
    localStorage.setItem("operatoreOnline", stato);
}



// ---- ADMIN: stato operatore ----
setInterval(() => {
    const status = localStorage.getItem("operatoreOnline");
    const el = document.getElementById("opStatus");
    if (el) {
        el.textContent = status === "true" ? "Online" : "Offline";
        el.style.color = status === "true" ? "green" : "red";
    }
}, 1000);



// ---- CONTROLLO VENTOLE (ARDUINO UNO R4 WIFI) ----
let ventoleAccese = false;

async function toggleVentole() {
    try {
        const url = ventoleAccese ? "/fan/off" : "/fan/on";
        const res = await fetch(ARDUINO_IP + url);
        const data = await res.json();

        ventoleAccese = data.fan;
        aggiornaUIVentole();

    } catch (err) {
        console.error("Errore ventole:", err);
    }
}

function aggiornaUIVentole() {
    const statusEl = document.getElementById("fanStatus");
    const btnEl = document.getElementById("fanBtn");

    if (!statusEl || !btnEl) return;

    statusEl.textContent = ventoleAccese ? "Accese" : "Spente";
    btnEl.textContent = ventoleAccese ? "SPEGNI" : "ACCENDI";
}
