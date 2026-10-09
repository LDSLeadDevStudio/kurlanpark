document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Логика слайдера галереи ---
    const track = document.getElementById('gallery-track');
    const slides = document.querySelectorAll('.photo-slide');
    const numIndicator = document.getElementById('slide-num');
    
    let currentSlide = 0;

    function scrollGallery(offset) {
        if (track) {
            track.scrollBy({ left: offset, behavior: 'smooth' });
        }
    }

    function changeSlide(direction) {
        if (!slides || slides.length === 0) return; // Защита от ошибок, если слайдов нет

        // Скрываем текущий слайд
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.pointerEvents = 'none';
        slides[currentSlide].classList.remove('active');

        // Вычисляем индекс следующего слайда (циклично)
        currentSlide = (currentSlide + direction + slides.length) % slides.length;

        // Показываем новый слайд
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.pointerEvents = 'auto';
        slides[currentSlide].classList.add('active');

        // Обновляем счетчик (если есть)
        if (numIndicator) {
            numIndicator.textContent = currentSlide + 1;
        }
    }

    // Обработка свайпов для слайдера
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
                changeSlide(1); // Свайп влево -> следующий
            } else if (endX > startX + threshold) {
                changeSlide(-1); // Свайп вправо -> предыдущий
            }
        }, { passive: true });
    }

    // --- 2. Логика модального окна меню (openModalBtn / closeModalBtn) ---
    const modalMenu = document.getElementById('modal'); // ID из предыдущего примера
    const btnOpenMenu = document.getElementById('openModalBtn');
    const btnCloseMenu = document.getElementById('closeModalBtn');

    function openMenuModal() {
        if (modalMenu) {
            modalMenu.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Блокируем скролл фона
        }
    }

    function closeMenuModal() {
        if (modalMenu) {
            modalMenu.style.display = 'none';
            document.body.style.overflow = ''; // Возвращаем скролл
        }
    }

    if (btnOpenMenu) {
        btnOpenMenu.addEventListener('click', (e) => {
            e.preventDefault();
            openMenuModal();
        });
    }

    if (btnCloseMenu) {
        btnCloseMenu.addEventListener('click', closeMenuModal);
    }

    if (modalMenu) {
        modalMenu.addEventListener('click', (e) => {
            if (e.target === modalMenu) closeMenuModal();
        });
    }

    // --- 3. Логика модального окна (универсальная функция для других окон) ---
    // Функция для инициализации любого модального окна по ID
    function initModal(modalId, triggerId, closeSelector = '.modal-close') {
        const modal = document.getElementById(modalId);
        const trigger = document.getElementById(triggerId);
        
        if (!modal) return;

        const closeBtn = modal.querySelector(closeSelector);

        function open() {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            const focusEl = modal.querySelector(closeSelector);
            if (focusEl) focusEl.focus();
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

    // Инициализация конкретных окон (замените ID на те, что реально есть в вашем HTML)
    // Пример для окна с ID "menu" (если оно есть)
    // initModal('menu', 'btnmenu', '.modal-close'); 
    
    // Пример для окна с ID "modal-kurlan" (если оно есть)
    // initModal('modal-kurlan', 'btn-kurlan', '.modal-close');
});
