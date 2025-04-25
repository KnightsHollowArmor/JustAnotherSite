// CriarContaScript.js
const settingsButtonContainer = document.querySelector('.settings-button-container');
const settingsButton = document.querySelector('.settings-button');
const settingsIcon = document.getElementById('settings-icon');
const container = document.querySelector('.container');
const settingsPanel = document.querySelector('.settings-panel');
const loadingOverlay = document.getElementById('loading-overlay');
const body = document.body;
const themeSelector = document.getElementById('themeSelector');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const mostrarSenhaCheckbox = document.getElementById('mostrarSenha');
const formularioCriarConta = document.querySelector('form');
const fazerLoginLink = document.querySelector('.account-options p:first-child'); // Seleciona o primeiro <p> dentro de .account-options
let settingsOpen = false;
let currentTheme = localStorage.getItem('theme') || 'gray'; // Define o tema inicial como cinza

// Função para aplicar o tema
function applyTheme(themeName) {
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
    // Redireciona para login.html após um pequeno atraso para mostrar o loading
    setTimeout(function() {
        window.location.href = "login.html";
    }, 1500); // 1.5 segundos de loading
}

function mostrarLoadingOverlay() {
    container.classList.add('blurred');
    loadingOverlay.classList.add('active');
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
        // Verifica se o mouse NÃO está dentro do painel
        if (!settingsPanel.matches(':hover')) {
            closeSettings();
        }
    }, 100); // Ajuste o tempo conforme necessário
});

settingsPanel.addEventListener('mouseleave', () => {
    closeSettings();
});

function togglePasswordVisibility() {
    if (mostrarSenhaCheckbox.checked) {
        senhaInput.type = "text";
    } else {
        senhaInput.type = "password";
    }
}

function changeTheme(selectedTheme) {
    applyTheme(selectedTheme);
}

function validarEmail(email) {
    // Expressão regular para validar o formato básico de um email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

formularioCriarConta.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!nome) {
        alert("Por favor, digite seu nome.");
        return;
    }

    if (!validarEmail(email)) {
        alert("Por favor, insira um email válido. Certifique-se de incluir '@' e um domínio após ele (ex: @gmail.com).");
        return;
    }

    if (!senha) {
        alert("Por favor, digite sua senha.");
        return;
    }

    mostrarLoadingOverlay();

});

// Adiciona o evento de clique para o link "Fazer login"
fazerLoginLink.addEventListener('click', mostrarLoading);