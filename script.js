function crearTextoCurvo() {
    const textElement = document.getElementById('textoCurvo');
    if (!textElement) return;

    // Guardamos la palabra "PORTFOLIO" original para poder redibujarla al cambiar tamaño de pantalla
    if (!textElement.dataset.textoOriginal) {
        textElement.dataset.textoOriginal = textElement.innerText;
    }

    const text = textElement.dataset.textoOriginal;
    textElement.innerHTML = ''; // Vaciamos para crear los spans

    // Definimos el radio según el tamaño de la pantalla (haciendo match con el CSS)
    let radius = 130; // Mobile
    if (window.innerWidth >= 768) radius = 190; // Tablet
    if (window.innerWidth >= 1200) radius = 280; // Desktop

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.innerText = text[i];
        
        // Lo posicionamos absoluto en el centro
        span.style.position = 'absolute';
        span.style.left = '50%';
        span.style.bottom = '50%';
        span.style.transformOrigin = `0 ${radius}px`;

        // Calculamos el ángulo para formar un medio círculo por encima
        const angle = -70 + (140 / (text.length - 1)) * i;
        
        // Se traslada hacia arriba y se rota
        span.style.transform = `translateX(-50%) rotate(${angle}deg) translateY(-${radius}px)`;
        
        textElement.appendChild(span);
    }
}

window.addEventListener('resize', crearTextoCurvo);