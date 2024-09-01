document.addEventListener("DOMContentLoaded", function() {
    // Elementos interativos na página
    const menuToggle = document.querySelector("#menu-toggle");
    const navContainer = document.querySelector("#nav-container");
    const freefallContainer = document.querySelector(".freefall-background");

    let freefallActive = false;  // Estado do efeito freefall
    let freefallInterval;  // Intervalo para o efeito freefall

    // Alterna a exibição do menu de navegação em dispositivos móveis
    menuToggle.addEventListener("click", function() {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        navContainer.classList.toggle("show");
        menuToggle.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link de navegação
    document.querySelectorAll(".nav-container a").forEach(link => {
        link.addEventListener("click", function() {
            navContainer.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", false);
        });
    });

    // Fecha o menu ao clicar fora dele ou pressionar a tecla Esc
    document.addEventListener("click", function(event) {
        if (!navContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            navContainer.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", false);
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            navContainer.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", false);
        }
    });

    // Navegação suave para âncoras na página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Função para gerar um caractere aleatório para o efeito freefall
    function generateChar() {
        const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛟᛞ';

        // Gera uma runa aleatória
        function generateRandomRune() {
            return runes[Math.floor(Math.random() * runes.length)];
        }

        // Gera um par hexadecimal aleatório
        function generateRandomHexPair() {
            const hexChars = '0123456789ABCDEF';
            return (
                hexChars[Math.floor(Math.random() * hexChars.length)] +
                hexChars[Math.floor(Math.random() * hexChars.length)]
            );
        }

        // Cria o elemento de caractere que vai "cair" na tela
        const charElement = document.createElement("span");
        charElement.className = "freefall-char";
        charElement.textContent = Math.random() > 0.5 ? generateRandomRune() : generateRandomHexPair();

        // Define a posição e animação do caractere
        charElement.style.left = `${Math.random() * 100}vw`;
        charElement.style.animationDuration = `${Math.random() * 5 + 5}s`;
        charElement.style.opacity = Math.random() + 0.5;

        freefallContainer.appendChild(charElement);

        // Remove o caractere após 10 segundos
        setTimeout(() => charElement.remove(), 10000);
    }

    // Alterna o efeito freefall
    function toggleFreefall() {
        freefallActive = !freefallActive;

        if (freefallActive) {
            freefallInterval = setInterval(generateChar, 100); // Gera novos caracteres a cada 100ms
        } else {
            clearInterval(freefallInterval);
        }
    }

    // Ativa/desativa o efeito freefall ao clicar no botão do portfólio
    document.getElementById("creative-link").addEventListener("click", function(e) {
        e.preventDefault();
        toggleFreefall();
    });
});
