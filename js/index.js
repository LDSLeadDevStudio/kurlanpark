// --- ГЛОБАЛЬНЫЕ ФУНКЦИИ (должны быть видны везде, даже для onclick в HTML) ---

let currentSlide = 0;
const slides = document.querySelectorAll('.photo-slide');
const numIndicator = document.getElementById('slide-num');

// Эта функция теперь доступна глобально, чтобы работала кнопка в HTML
function changeSlide(direction) {
    if (!slides || slides.length === 0) return;

    // Скрываем текущий
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.pointerEvents = 'none';
    slides[currentSlide].classList.remove('active');

    // Считаем новый индекс
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Показываем новый
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].style.pointerEvents = 'auto';
    slides[currentSlide].classList.add('active');

    // Обновляем цифры
    if (numIndicator) {
        numIndicator.textContent = currentSlide + 1;
    }
}

function scrollGallery(offset) {
    const track = document.getElementById('gallery-track');
    if (track) {
        track.scrollBy({ left: offset, behavior: 'smooth' });
    }
}

// --- ЛОГИКА ВНУТРИ ЗАГРУЗКИ СТРАНИЦЫ ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Логика свайпов (работает только после загрузки)
    const touchArea = document.getElementById('slider-touch-area');
    if (touchArea) {
        let startX = 0;
        let endX = 0;
        const threshold = 40;

        touchArea.addEventListener('touchstart', (e) => {
            startX = e.changedTouches.screenX;
        }, { passive: true });

        touchArea.addEventListener('touchend', (e) => {
            endX = e.changedTouches.screenX;
            
            if (endX < startX - threshold) {
                changeSlide(1); // Вправо свайп -> следующий слайд
            } else if (endX > startX + threshold) {
                changeSlide(-1); // Влево свайп -> предыдущий слайд
            }
        }, { passive: true });
    }

    // 2. Универсальная функция для модальных окон
    function initModal(modalId, triggerId, closeSelector = '.modal-close') {
        const modal = document.getElementById(modalId);
        const trigger = document.getElementById(triggerId);
        
        if (!modal) return;

        const closeBtn = modal.querySelector(closeSelector);

        function open() {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        }

        function close() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                open();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                close();
            }
        });
    }

    // Инициализация окон (проверь ID в своем HTML!)
    // Если у тебя окно меню имеет id="menu", раскомментируй строку ниже:
    // initModal('menu', 'btnmenu', '.modal-close');
    
    // Если у тебя новое окно имеет id="modal-menu", раскомментируй эту:
    // initModal('modal-menu', 'btn-open-menu', '.modal-close');
});


const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

// Открытие
openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    console.log('Модалка открыта');
});

// Закрытие по крестику
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
});
