// Small interactions for the portfolio.
// Navigation uses native smooth scrolling; this script adds a subtle
// reveal effect as project cards enter the viewport.

const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(24px)";
  card.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(card);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("transitionend", () => {
      if (card.classList.contains("is-visible")) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });
});

// Make the CSS transition work when IntersectionObserver adds the class.
const style = document.createElement("style");
style.textContent = ".project-card.is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(style);





//slideshow code//

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (slides.length === 0) {
    return;
  }

  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}




//clickable images code//

const clickableImages = document.querySelectorAll(".clickable-image");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");

    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImage.src = "";

    document.body.style.overflow = "";
}

clickableImages.forEach((image) => {
    image.addEventListener("click", () => {
        openLightbox(image);
    });
});

lightboxClose.addEventListener("click", closeLightbox);

/* Sluiten wanneer je naast de afbeelding klikt */
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

/* Sluiten met de Escape-toets */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
    }
});