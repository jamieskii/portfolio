/* =====================================================
   HAMBURGERMENU
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menuToggle");
    const navigation = document.querySelector("#mainNavigation");

    function closeMenu() {
        if (!menuToggle || !navigation) return;

        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});


/* =====================================================
   PROJECTKAART-ANIMATIES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /*
       Je website gebruikt vooral .projectKaart.
       .project-card blijft toegevoegd voor eventuele
       andere pagina's waarop je die class gebruikt.
    */

    const cards = document.querySelectorAll(
        ".projectKaart, .project-card"
    );

    if (cards.length === 0) return;

    /*
       Fallback voor browsers zonder IntersectionObserver:
       de kaarten worden dan meteen zichtbaar.
    */

    if (!("IntersectionObserver" in window)) {
        cards.forEach((card) => {
            card.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach((card) => {
        observer.observe(card);
    });
});


/* CSS voor de projectkaart-animatie */

const animationStyle = document.createElement("style");

animationStyle.textContent = `
    .projectKaart,
    .project-card {
        opacity: 0;
        transform: translateY(24px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .projectKaart.is-visible,
    .project-card.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
        .projectKaart,
        .project-card {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

document.head.appendChild(animationStyle);


/* =====================================================
   SLIDESHOW
===================================================== */

let slideIndex = 1;

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});


/* Volgende/vorige knop */

function plusSlides(number) {
    slideIndex += number;
    showSlides(slideIndex);
}


/* Bolletjes onder de slideshow */

function currentSlide(number) {
    slideIndex = number;
    showSlides(slideIndex);
}


function showSlides(number) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    /*
       Stop wanneer deze pagina geen slideshow heeft.
    */

    if (slides.length === 0) return;

    if (number > slides.length) {
        slideIndex = 1;
    }

    if (number < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    const activeSlide = slides[slideIndex - 1];

    if (activeSlide) {
        activeSlide.style.display = "block";
    }

    /*
       Sommige pagina's hebben wel slides, maar geen dots.
       Daarom controleren we eerst of de dot bestaat.
    */

    const activeDot = dots[slideIndex - 1];

    if (activeDot) {
        activeDot.classList.add("active");
    }
}


/* =====================================================
   CLICKABLE IMAGES / LIGHTBOX
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const clickableImages =
        document.querySelectorAll(".clickable-image");

    const lightbox =
        document.querySelector("#lightbox");

    const lightboxImage =
        document.querySelector("#lightboxImage");

    const lightboxClose =
        document.querySelector(".lightbox-close");


    function closeLightbox() {
        /*
           Stop als deze pagina geen lightbox bevat.
        */

        if (!lightbox || !lightboxImage) return;

        lightbox.classList.remove("is-open");
        lightboxImage.src = "";
        lightboxImage.alt = "";

        document.body.style.overflow = "";
    }


    /*
       Voer de lightboxcode alleen uit als alle benodigde
       onderdelen op de pagina aanwezig zijn.
    */

    if (
        clickableImages.length > 0 &&
        lightbox &&
        lightboxImage &&
        lightboxClose
    ) {
        clickableImages.forEach((image) => {
            image.addEventListener("click", () => {
                lightboxImage.src = image.currentSrc || image.src;
                lightboxImage.alt = image.alt || "";

                lightbox.classList.add("is-open");
                document.body.style.overflow = "hidden";
            });
        });


        /* Sluiten met het kruisje */

        lightboxClose.addEventListener("click", closeLightbox);


        /* Sluiten door naast de afbeelding te klikken */

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });


        /* Sluiten met de Escape-toets */

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeLightbox();
            }
        });
    }
});
