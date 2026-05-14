const DEFAULT_CONFIG = {
    pin: '1234',
    numbers: {
        police: '911',
        fire: '100',
        medical: '107',
        community: '3515207025',
        defense: '103',
        epec: '08007770000',
        light: '3516883201',
        water: '3518555666',
        drain: '',
        appointments: '08008885555',
        hospital: '',
        salon: '3513513525'
    },
    labels: {
        police: 'Policía',
        fire: 'Bomberos',
        medical: 'Emergencias Médicas',
        community: 'Centro Vecinal',
        defense: 'Defensa Civil',
        epec: 'EPEC',
        light: 'Reclamo de alumbrado',
        water: 'Reclamos Aguas Cordobesas',
        drain: 'Desagote',
        appointments: 'Turnos Médicos',
        hospital: 'Sacar turnos Hospital',
        salon: 'Alquiler del Salón'
    },
    messages: {
        community: "Hola, me contacto desde la app del Centro Vecinal Santa Isabel 2da Sección.",
        light: "Hola, quiero realizar un reclamo de alumbrado en Barrio Santa Isabel 2da Sección.",
        water: "Hola, quiero realizar un reclamo relacionado con agua en Barrio Santa Isabel 2da Sección.",
        drain: "Es presencial en el Centro Vecinal",
        salon: "Hola, quisiera consultar por el alquiler del salón del Centro Vecinal Santa Isabel 2da Sección."
    },
    extras: {
        salon_manager: 'Fabiana',
        community_manager: 'Lili'
    }
};

const WHATSAPP_TYPES = ['community', 'light', 'water', 'salon'];

let currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
let pendingAction = null;

// DOM Elements
const homeScreen = document.getElementById('home-screen');
const settingsScreen = document.getElementById('settings-screen');
const settingsBtn = document.getElementById('settings-btn');
const backBtn = document.getElementById('back-btn');
const settingsForm = document.getElementById('settings-form');
const confirmModal = document.getElementById('confirm-modal');
const confirmName = document.getElementById('confirm-name');
const confirmNumber = document.getElementById('confirm-number');
const confirmMsg = document.getElementById('confirm-msg');
const cancelCallBtn = document.getElementById('cancel-call');
const confirmCallBtn = document.getElementById('confirm-call-btn');

const pinModal = document.getElementById('pin-modal');
const pinInput = document.getElementById('pin-input');
const submitPinBtn = document.getElementById('submit-pin');
const cancelPinBtn = document.getElementById('cancel-pin');
const pinError = document.getElementById('pin-error');
const dynamicSettingsContainer = document.getElementById('dynamic-settings-container');

// Initialization
function init() {
    const saved = localStorage.getItem('santa_isabel_config');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Deep merge saved config with defaults to ensure all keys exist
            currentConfig.pin = parsed.pin || currentConfig.pin;
            currentConfig.numbers = { ...currentConfig.numbers, ...(parsed.numbers || {}) };
            currentConfig.labels = { ...currentConfig.labels, ...(parsed.labels || {}) };
            currentConfig.messages = { ...currentConfig.messages, ...(parsed.messages || {}) };
            currentConfig.extras = { ...currentConfig.extras, ...(parsed.extras || {}) };
        } catch (e) {
            console.error("Error loading config", e);
        }
    }
    
    // Update labels in UI
    Object.keys(currentConfig.labels).forEach(key => {
        const el = document.getElementById(`label-${key}`);
        if (el) el.textContent = currentConfig.labels[key];
    });

    buildSettingsForm();
}

function buildSettingsForm() {
    dynamicSettingsContainer.innerHTML = '';
    
    // Numbers
    let numbersHtml = '<h3 class="settings-subtitle">Números de Contacto</h3>';
    Object.keys(currentConfig.numbers).forEach(key => {
        numbersHtml += `
        <div class="input-group">
            <label>Número: ${DEFAULT_CONFIG.labels[key]}</label>
            <input type="tel" id="num-${key}" value="${currentConfig.numbers[key] || ''}" placeholder="Número">
        </div>`;
    });
    
    // Messages
    let messagesHtml = '<h3 class="settings-subtitle">Mensajes Automáticos (WhatsApp)</h3>';
    Object.keys(currentConfig.messages).forEach(key => {
        messagesHtml += `
        <div class="input-group">
            <label>Mensaje: ${DEFAULT_CONFIG.labels[key]}</label>
            <input type="text" id="msg-${key}" value="${currentConfig.messages[key] || ''}" placeholder="Mensaje">
        </div>`;
    });

    // Labels
    let labelsHtml = '<h3 class="settings-subtitle">Nombres de Botones</h3>';
    Object.keys(currentConfig.labels).forEach(key => {
        labelsHtml += `
        <div class="input-group">
            <label>Botón: ${DEFAULT_CONFIG.labels[key]}</label>
            <input type="text" id="lbl-${key}" value="${currentConfig.labels[key] || ''}" placeholder="Nombre del botón">
        </div>`;
    });

    // Extras
    let extrasHtml = '<h3 class="settings-subtitle">Datos Adicionales</h3>';
    extrasHtml += `
        <div class="input-group">
            <label>Encargado del Centro Vecinal</label>
            <input type="text" id="ext-community_manager" value="${currentConfig.extras.community_manager || ''}" placeholder="Nombre del encargado/a">
        </div>
        <div class="input-group">
            <label>Encargado del Salón</label>
            <input type="text" id="ext-salon_manager" value="${currentConfig.extras.salon_manager || ''}" placeholder="Nombre del encargado/a">
        </div>`;

    dynamicSettingsContainer.innerHTML = numbersHtml + messagesHtml + labelsHtml + extrasHtml;
    
    // Set PIN
    const pinField = document.getElementById('admin-pin');
    if (pinField) pinField.value = currentConfig.pin;
}

// Navigation & Auth Logic
settingsBtn.addEventListener('click', () => {
    vibrate(50);
    pinInput.value = '';
    pinError.style.display = 'none';
    pinModal.classList.remove('hidden');
});

cancelPinBtn.addEventListener('click', () => {
    vibrate(30);
    pinModal.classList.add('hidden');
});

submitPinBtn.addEventListener('click', () => {
    vibrate(50);
    if (pinInput.value === currentConfig.pin) {
        pinModal.classList.add('hidden');
        homeScreen.classList.add('hidden');
        buildSettingsForm(); // Refresh inputs just in case
        settingsScreen.classList.remove('hidden');
    } else {
        pinError.style.display = 'block';
        vibrate([50, 50, 50]);
    }
});

backBtn.addEventListener('click', () => {
    vibrate(50);
    settingsScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
});

// Settings Logic
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    vibrate(100);
    
    // Save numbers
    Object.keys(currentConfig.numbers).forEach(key => {
        const input = document.getElementById(`num-${key}`);
        if (input) currentConfig.numbers[key] = input.value;
    });

    // Save messages
    Object.keys(currentConfig.messages).forEach(key => {
        const input = document.getElementById(`msg-${key}`);
        if (input) currentConfig.messages[key] = input.value;
    });

    // Save labels
    Object.keys(currentConfig.labels).forEach(key => {
        const input = document.getElementById(`lbl-${key}`);
        if (input) {
            currentConfig.labels[key] = input.value;
            // Update UI instantly
            const uiLabel = document.getElementById(`label-${key}`);
            if (uiLabel) uiLabel.textContent = input.value;
        }
    });

    // Save extras
    Object.keys(currentConfig.extras).forEach(key => {
        const input = document.getElementById(`ext-${key}`);
        if (input) currentConfig.extras[key] = input.value;
    });

    // Save PIN
    const pinField = document.getElementById('admin-pin');
    if (pinField && pinField.value.trim() !== '') {
        currentConfig.pin = pinField.value;
    }
    
    localStorage.setItem('santa_isabel_config', JSON.stringify(currentConfig));
    
    // Visual feedback
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ GUARDADO';
    setTimeout(() => {
        saveBtn.textContent = originalText;
        settingsScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
    }, 800);
});

// Calling / WhatsApp Logic
window.handleCall = function(type) {
    vibrate([50, 30, 50]);
    
    // Special case for Desagote
    if (type === 'drain') {
        const msg = currentConfig.messages.drain || "Es presencial en el Centro Vecinal";
        confirmName.textContent = "Información";
        confirmNumber.textContent = "Desagote";
        confirmMsg.textContent = msg;
        confirmMsg.classList.remove('hidden');
        confirmCallBtn.classList.add('hidden'); // Hide confirm button
        confirmModal.classList.remove('hidden');
        return;
    }

    const number = currentConfig.numbers[type];
    const name = currentConfig.labels[type];
    const isWhatsApp = WHATSAPP_TYPES.includes(type);
    
    if (!number || number.trim() === "") {
        alert("Por favor, configure el número en Ajustes.");
        return;
    }
    
    const message = currentConfig.messages[type] || "";

    pendingAction = {
        type: type,
        number: number,
        isWhatsApp: isWhatsApp,
        message: message
    };

    let title = isWhatsApp ? "Enviar WhatsApp a:" : "Llamar a:";
    if (type === 'epec') {
        title = "¿Llamar a EPEC por cortes o problemas eléctricos?";
    }

    confirmName.textContent = title;
    
    let displayName = name;
    if (type === 'salon' && currentConfig.extras && currentConfig.extras.salon_manager) {
        displayName += ` (${currentConfig.extras.salon_manager})`;
    } else if (type === 'community' && currentConfig.extras && currentConfig.extras.community_manager) {
        displayName += ` (${currentConfig.extras.community_manager})`;
    }
    confirmNumber.textContent = displayName;
    
    if (isWhatsApp) {
        confirmMsg.textContent = `"${message}"`;
        confirmMsg.classList.remove('hidden');
    } else {
        confirmMsg.classList.add('hidden');
    }
    
    confirmCallBtn.classList.remove('hidden'); // Ensure confirm button is visible
    confirmModal.classList.remove('hidden');
};

cancelCallBtn.addEventListener('click', () => {
    vibrate(30);
    confirmModal.classList.add('hidden');
    pendingAction = null;
});

confirmCallBtn.addEventListener('click', () => {
    vibrate(100);
    if (pendingAction) {
        if (pendingAction.isWhatsApp) {
            const cleanNumber = pendingAction.number.replace(/\D/g, '');
            const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(pendingAction.message)}`;
            window.open(url, '_blank');
        } else {
            window.location.href = `tel:${pendingAction.number}`;
        }
    }
    confirmModal.classList.add('hidden');
    pendingAction = null;
});

// Helpers
function vibrate(pattern) {
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
}

// Close modals when clicking outside
[confirmModal, pinModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            if (modal === confirmModal) pendingAction = null;
        }
    });
});

init();
