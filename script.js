document.addEventListener("DOMContentLoaded", () => {
    iniciarCarousel();
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
