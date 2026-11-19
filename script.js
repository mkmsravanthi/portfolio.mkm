
// Screenshot Gallery

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

const closeButton = document.getElementById("modalClose");
const prevButton = document.getElementById("modalPrev");
const nextButton = document.getElementById("modalNext");
const counter = document.getElementById("modalCounter");

let currentGallery = [];
let currentIndex = 0;

// Open screenshot when clicked
document.querySelectorAll(".gallery-image").forEach(image => {

    image.addEventListener("click", function () {

        const galleryName = this.dataset.gallery;

        currentGallery = Array.from(
            document.querySelectorAll(
                `.gallery-image[data-gallery="${galleryName}"]`
            )
        );

        currentIndex = currentGallery.indexOf(this);

        showImage();

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});

// Display selected screenshot
function showImage() {

    const selectedImage = currentGallery[currentIndex];

    modalImage.src = selectedImage.src;
    modalImage.alt = selectedImage.alt;

    counter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}

// Next screenshot
nextButton.addEventListener("click", function () {

    currentIndex =
        (currentIndex + 1) % currentGallery.length;

    showImage();

});

// Previous screenshot
prevButton.addEventListener("click", function () {

    currentIndex =
        (currentIndex - 1 + currentGallery.length)
        % currentGallery.length;

    showImage();

});

// Close preview
function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

closeButton.addEventListener("click", closeModal);

// Close when clicking outside the screenshot
modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});

// Keyboard navigation
document.addEventListener("keydown", function(event) {

    if (!modal.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

    if (event.key === "Escape") {
        closeModal();
    }

});
