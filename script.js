document.addEventListener("DOMContentLoaded", () => {
    iniciarCarousel();
    iniciarAnimaciones();
});

function iniciarCarousel() {
    const track = document.getElementById("carousel-track");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    if (!track || !btnPrev || !btnNext) return;

    const cards = track.querySelectorAll(".cardProyecto");
    const total = cards.length;
    const GAP = 20; // debe coincidir con gap del CSS en .carousel-track
    let indiceActual = 0;

    function visiblesAhora() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function moverCarousel() {
        const visibles = visiblesAhora();
        const maxIndice = Math.max(0, total - visibles);

        if (indiceActual > maxIndice) indiceActual = maxIndice;

        const cardWidth = cards[0].offsetWidth;
        const desplazamiento = indiceActual * (cardWidth + GAP);
        track.style.transform = `translateX(-${desplazamiento}px)`;

        btnPrev.style.opacity = indiceActual === 0 ? "0.3" : "1";
        btnNext.style.opacity = indiceActual >= maxIndice ? "0.3" : "1";
    }

    btnNext.addEventListener("click", () => {
        const maxIndice = Math.max(0, total - visiblesAhora());
        if (indiceActual < maxIndice) {
            indiceActual++;
            moverCarousel();
        }
    });

    btnPrev.addEventListener("click", () => {
        if (indiceActual > 0) {
            indiceActual--;
            moverCarousel();
        }
    });

    window.addEventListener("resize", moverCarousel);
    moverCarousel(); // estado inicial
}

// ─── Animations ───────────────────────────────────────────────────────────────

function typeWriter(element, speed = 75) {
    const text = element.dataset.originalText;
    element.classList.add("typewriter-cursor");
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove("typewriter-cursor");
        }
    }
    type();
}

function iniciarAnimaciones() {
    // ── 1. Typewriter: SOBRE MI, CURSOS, SKILLS ──────────────────────────────
    const typewriterEls = [
        document.querySelector("#aboutMe h2"),
        document.querySelector(".courses-title"),
        document.querySelector(".skillsIzq h2"),
    ].filter(Boolean);

    typewriterEls.forEach(el => {
        el.dataset.originalText = el.textContent;
        el.textContent = "";
    });

    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = "true";
                typeWriter(entry.target);
                typeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typewriterEls.forEach(el => typeObserver.observe(el));

    // ── 2. Slide from top: Proyectos title + cards ────────────────────────────
    const slideEls = document.querySelectorAll("#projects h2, .cardProyecto");
    slideEls.forEach((el, i) => {
        el.classList.add("anim-slide-top");
        el.style.transitionDelay = `${i * 0.12}s`;
    });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("anim-visible");
                slideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    slideEls.forEach(el => slideObserver.observe(el));

    // ── 3. Contact: same slide-from-top as projects ───────────────────────────
    const contactEls = document.querySelectorAll("#contact .titulo, #contact .contactoDer");
    contactEls.forEach((el, i) => {
        el.classList.add("anim-slide-top");
        el.style.transitionDelay = `${i * 0.15}s`;
    });

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("anim-visible");
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    contactEls.forEach(el => contactObserver.observe(el));
}

/* ============================================================
   NUEVA LÓGICA: IMAGEN ROLLO SKILLS INFINITA A LA DERECHA
============================================================ */
window.addEventListener("load", () => {
    const track = document.getElementById("trackRollo");
    if (!track) return;

    const images = track.querySelectorAll(".rolloConSkills");
    if (images.length === 0) return;

    // Tomamos el ancho real de UNA sola imagen de rollo.png
    const imageWidth = images[0].offsetWidth;

    // Para moverlo a la derecha y que sea infinito, empezamos "escondiendo" 
    // la primera imagen hacia la izquierda
    let currentPos = -imageWidth; 
    const speed = 1.5; // Podés cambiar este número para que vaya más rápido o más lento

    function animateRollo() {
        currentPos += speed; // Sumamos para que vaya a la DERECHA

        // Cuando la posición llega a 0, reiniciamos el ciclo de forma invisible
        if (currentPos >= 0) {
            currentPos = -imageWidth;
        }

        track.style.transform = `translateX(${currentPos}px)`;
        requestAnimationFrame(animateRollo);
    }

    animateRollo();
});