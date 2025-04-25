const settingsButtonContainer = document.querySelector('.settings-button-container');
const settingsButton = document.querySelector('.settings-button');
const settingsIcon = document.getElementById('settings-icon');
const container = document.querySelector('.container');
const settingsPanel = document.querySelector('.settings-panel');
const loadingOverlay = document.getElementById('loading-overlay');
const body = document.body;
const themeSelector = document.getElementById('themeSelector');
const inputFields = document.querySelectorAll('input[type="text"], input[type="password"]');
const labels = document.querySelectorAll('label');
let settingsOpen = false;
let currentTheme = localStorage.getItem('theme') || 'gray'; // Define o tema inicial como cinza

// Função para aplicar o tema
function applyTheme(themeName) {
    console.log('Aplicando tema:', themeName);
    body.classList.remove('light-mode', 'gray-mode', 'dark-mode');
    body.classList.add(`${themeName}-mode`);
    localStorage.setItem('theme', themeName); // Salva o tema no localStorage
}

// Aplica o tema salvo ao carregar a página
window.onload = function() { // Garante que o DOM esteja totalmente carregado
    applyTheme(currentTheme);
    if (themeSelector) {
        themeSelector.value = currentTheme; // Define a opção selecionada no dropdown
    }
};

function entrarAnonimamente() {
    const numeroAleatorio = Math.floor(Math.random() * 10000);
    const numeroFormatado = String(numeroAleatorio).padStart(4, '0');
    const nickAnonimo = "Anonimous" + numeroFormatado;
    alert("Seu nick é: " + nickAnonimo);
    console.log("Usuário entrou anonimamente com o nick: " + nickAnonimo);
}

function mostrarLoading() {
    container.classList.add('blurred');
    loadingOverlay.classList.add('active');
    setTimeout(function() {
        window.location.href = "criarconta.html";
    }, 1500);
}

function openSettings() {
    settingsOpen = true;
    container.classList.add('settings-open');
    settingsPanel.classList.add('open');
    settingsIcon.classList.add('open');
    settingsButtonContainer.classList.add('open');
    settingsPanel.style.display = 'block';
}

function closeSettings() {
    settingsOpen = false;
    container.classList.remove('settings-open');
    settingsPanel.classList.remove('open');
    settingsIcon.classList.remove('open');
    settingsButtonContainer.classList.remove('open');
    // Adiciona um pequeno atraso para coincidir com a transição
    setTimeout(() => {
        settingsPanel.style.display = 'none';
    }, 300);
}

settingsButtonContainer.addEventListener('mouseenter', () => {
    openSettings();
});

settingsPanel.addEventListener('mouseenter', () => {
    // O painel já está aberto, então não precisamos fazer nada aqui para mantê-lo aberto
});

settingsButtonContainer.addEventListener('mouseleave', () => {
    // Adiciona um pequeno atraso antes de fechar para permitir que o mouse entre no painel
    setTimeout(() => {
        if (!settingsPanel.matches(':hover')) {
            closeSettings();
        }
    }, 100); // Ajuste o tempo conforme necessário
});

settingsPanel.addEventListener('mouseleave', () => {
    closeSettings();
});

function togglePasswordVisibility() {
    const senhaInput = document.getElementById("senha");
    const mostrarSenhaCheckbox = document.getElementById("mostrarSenha");
    if (mostrarSenhaCheckbox.checked) {
        senhaInput.type = "text";
    } else {
        senhaInput.type = "password";
    }
}

function changeTheme(selectedTheme) {
    console.log('Tema selecionado:', selectedTheme);
    applyTheme(selectedTheme);
}