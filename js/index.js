// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ (только если реально нужны везде) ---
let currentSlide = 0;

// --- ФУНКЦИИ СЛАЙДЕРА (глобальные, чтобы работали onclick в HTML) ---
function changeSlide(direction) {
    const slides = document.querySelectorAll('.photo-slide');
    const numIndicator = document.getElementById('slide-num');

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

// --- ЛОГИКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Свайпы для слайдера
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

        if (!modal) {
            console.warn(`Модальное окно с id="\${modalId}" не найдено.`);
            return;
        }

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

    // 3. Инициализация модальных окон (раскомментируй нужные строки под свой HTML)
    // initModal('menu', 'btnmenu', '.modal-close');
    // initModal('modal-menu', 'btn-open-menu', '.modal-close');

    // 4. Альтернатива: если хочешь оставить прямые обработчики на кнопках (без initModal)
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modal');

    if (openBtn && closeBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    } else if (openBtn || closeBtn || modal) {
        console.warn('Не все элементы модального окна найдены. Проверь ID в HTML.');
    }
});
