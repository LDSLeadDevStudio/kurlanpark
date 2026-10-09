document.addEventListener('DOMContentLoaded', () => {
    // --- 1. СЛАЙДЕР (ИСПРАВЛЕННАЯ ЛОГИКА) ---
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
        // ВАЖНО: Если слайдов нет или их 0, сразу выходим, чтобы не было ошибок
        if (!slides || slides.length === 0) return;

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

        // Обновляем счетчик
        if (numIndicator) {
            numIndicator.textContent = currentSlide + 1;
        }
    }

    // Обработка свайпов
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

    // --- 2. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ МОДАЛЬНЫХ ОКОН ---
    // Эта функция позволяет инициализировать ЛЮБОЕ модальное окно, 
    // не создавая каждый раз новые функции openModal/closeModal.
    function initModal(modalId, triggerId, closeSelector = '.modal-close') {
        const modal = document.getElementById(modalId);
        const trigger = document.getElementById(triggerId);
        
        // Если самого окна нет в HTML, ничего не делаем (защита от ошибок)
        if (!modal) return;

        const closeBtn = modal.querySelector(closeSelector);

        function open() {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Блокируем скролл фона
            
            // Фокус на кнопке закрытия для доступности
            if (closeBtn) closeBtn.focus();
        }

        function close() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Возвращаем скролл
        }

        // Навешиваем событие на кнопку открытия
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                open();
            });
        }

        // Навешиваем событие на кнопку закрытия (крестик)
        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }

        // Закрытие по клику на затемненный фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                close();
            }
        });
    }

    // --- 3. ИНИЦИАЛИЗАЦИЯ КОНКРЕТНЫХ ОКОН ---
    
    // 1. Окно меню (то, что ты просил дописать/починить)
    // Ожидаемые ID в HTML: modal-menu (окно), btn-open-menu (кнопка)
    // Убедись, что в твоем HTML у окна стоит id="modal-menu", а у кнопки id="btn-open-menu"
    initModal('modal-menu', 'btn-open-menu', '.modal-close');

    // 2. Окно старого типа (если у тебя осталось окно с id="menu" и кнопкой "btnmenu")
    // Мы используем ту же функцию, просто передаем другие ID.
    initModal('menu', 'btnmenu', '.modal-close');

    // 3. Окно для курланчиков (если есть)
    // initModal('modal-kurlan', 'btn-kurlan', '.modal-close');
});
