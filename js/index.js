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
const btnMenu = document.getElementById('btnmenu');
const menu = document.getElementById('menu');
const closeBtn = menu ? menu.querySelector('.modal-close') : null;

if (btnMenu && menu) {
  btnMenu.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener('click', () => {
    closeModal();
  });
}

// Закрытие по клику вне окна
if (menu) {
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      closeModal();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal() {
  if (!menu) return;
  menu.classList.add('active');
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Блокируем скролл страницы

  // Для доступности: фокус на кнопке закрытия при открытии
  const focusEl = menu.querySelector('.modal-close');
  if (focusEl) focusEl.focus();
}

function closeModal() {
  if (!menu) return;
  menu.classList.remove('active');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Возвращаем скролл
}



const btnKurlan = document.getElementById('btn-kurlan');
const modalKurlan = document.getElementById('modal-kurlan');
const closeBtnKurlan = modalKurlan ? modalKurlan.querySelector('.modal-close') : null;

if (btnKurlan && modalKurlan) {
  btnKurlan.addEventListener('click', (event) => {
    event.preventDefault();
    openModalKurlan();
  });
}

if (closeBtnKurlan && modalKurlan) {
  closeBtnKurlan.addEventListener('click', () => {
    closeModalKurlan();
  });
}

if (modalKurlan) {
  modalKurlan.addEventListener('click', (e) => {
    if (e.target === modalKurlan) {
      closeModalKurlan();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalKurlan.classList.contains('active')) {
      closeModalKurlan();
    }
  });
}

function openModalKurlan() {
  if (!modalKurlan) return;
  modalKurlan.classList.add('active');
  modalKurlan.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusEl = modalKurlan.querySelector('.modal-close');
  if (focusEl) focusEl.focus();
}

function closeModalKurlan() {
  if (!modalKurlan) return;
  modalKurlan.classList.remove('active');
  modalKurlan.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

const btnKurlans = document.getElementById('btnkurlans');
const modalKurlans = document.getElementById('modal-kurlan');
const closeBtnKurlans = modalKurlan ? modalKurlan.querySelector('.modal-close') : null;

if (btnKurlans && modalKurlans) {
  btnKurlan.addEventListener('click', (event) => {
    event.preventDefault();
    openModalKurlan();
  });
}

if (closeBtnKurlan && modalKurlans) {
  closeBtnKurlan.addEventListener('click', () => {
    closeModalKurlan();
  });
}

if (modalKurlans) {
  modalKurlan.addEventListener('click', (e) => {
    if (e.target === modalKurlans) {
      closeModalKurlans();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalKurlans.classList.contains('active')) {
      closeModalKurlan();
    }
  });
}

function openModalKurlan() {
  if (!modalKurlan) return;
  modalKurlan.classList.add('active');
  modalKurlan.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusEl = modalKurlan.querySelector('.modal-close');
  if (focusEl) focusEl.focus();
}

function closeModalKurlan() {
  if (!modalKurlan) return;
  modalKurlan.classList.remove('active');
  modalKurlan.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}