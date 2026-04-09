// === PROJEKTE (HIER ERWEITERST DU ALLES) ===
const projects = [
    {
        images: ["https://res.cloudinary.com/dpehq7xp6/image/upload/v1775744614/Screenshot_2026-04-09_162124_kr2qr2.png", "https://res.cloudinary.com/dpehq7xp6/image/upload/v1775762027/Screenshot_2026-04-09_162048_rkzgjf.png"]
    },
    {
        images: ["https://res.cloudinary.com/dpehq7xp6/image/upload/v1775744137/samples/paper.png", "https://res.cloudinary.com/dpehq7xp6/image/upload/v1775744134/samples/cup-on-a-table.jpg"]
    }
];

let currentProject = 0;
let currentImage = 0;

// Öffnen
window.openGallery = function(index) {
    currentProject = index;
    currentImage = 0;

    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "flex";

    setTimeout(() => {
        lightbox.classList.add("show");
    }, 10);

    showImage();
}

// Schließen
window.closeGallery = function() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("show");

    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

// Bild anzeigen
function showImage() {
    document.getElementById("lightbox-img").src =
        projects[currentProject].images[currentImage];
}

// Swipe / Navigation
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
});

function nextImage() {
    currentImage = (currentImage + 1) % projects[currentProject].images.length;
    showImage();
}

function prevImage() {
    currentImage = (currentImage - 1 + projects[currentProject].images.length) % projects[currentProject].images.length;
    showImage();
}

// TOUCH SWIPE
let startX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
});
