function scrollGallery(offset) {
    const track = document.getElementById('gallery-track');
    if (track) {
        track.scrollBy({ left: offset, behavior: 'smooth' });
    }
}
let currentSlide = 0;
const slides = document.querySelectorAll('.photo-slide');
const numIndicator = document.getElementById('slide-num');
function changeSlide(direction) {
    if (!slides || slides.length === 0)
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.pointerEvents = 'none';
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.pointerEvents = 'auto';
        slides[currentSlide].classList.add('active');
    if (numIndicator) {
        numIndicator.textContent = currentSlide + 1;
    }
}
function changeSlide(direction) {
    if (!slides || slides.length === 0) return;
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.pointerEvents = 'none';
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].style.pointerEvents = 'auto';
    slides[currentSlide].classList.add('active');
    if (numIndicator) {
        numIndicator.textContent = currentSlide + 1;
    }
}
function openMenuModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('menu-modal');
    if (modal) modal.style.display = 'flex';
}
function closeMenuModal() {
    const modal = document.getElementById('menu-modal');
    if (modal) modal.style.display = 'none';
}
window.addEventListener('click', (e) => {
    const modal = document.getElementById('menu-modal');
    if (e.target === modal) closeMenuModal();
});
const touchArea = document.getElementById('slider-touch-area');
if (touchArea) {
    let startX = 0;
    let endX = 0;

    touchArea.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });

    touchArea.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 40; // minimum swipe distance
        if (endX < startX - threshold) {
            changeSlide(1); // swipe left -> next slide
        }
        if (endX > startX + threshold) {
            changeSlide(-1); // swipe right -> previous slide
        }
    }
}