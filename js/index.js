// ============================================================
// Курланпарк — index.js
// Слайдер · Кнопка "Наверх" · Модальное окно с вкладками
// ============================================================

// ===== СЛАЙДЕР ФОТОГАЛЕРЕИ =====
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.photo-slide');
    let currentIndex = 0;

    function switchSlide(direction) {
        const total = slides.length;
        if (total === 0) return;

        // Вычисляем новый индекс (зацикливание)
        currentIndex = (currentIndex + direction + total) % total;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
            slide.style.opacity = index === currentIndex ? '1' : '0';
            slide.style.pointerEvents = index === currentIndex ? 'auto' : 'none';
        });
    }

    // Функция для кнопок в HTML (onclick="changeSlide(-1/1)")
    window.changeSlide = function (direction) {
        switchSlide(direction);
    };

    // Свайпы на мобильных
    const sliderArea = document.getElementById('slider-touch-area');
    if (sliderArea) {
        let startX = 0;
        let endX = 0;

        sliderArea.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderArea.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50; // минимальная дистанция свайпа

            if (endX < startX - threshold) {
                switchSlide(1);  // влево → следующий
            }
            if (endX > startX + threshold) {
                switchSlide(-1); // вправо → предыдущий
            }
        }
    }
});

// ===== КНОПКА "НАВЕРХ" =====
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Плавная прокрутка наверх при клике
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===== МОДАЛЬНОЕ ОКНО (МЕНЮ + КУРЛАНЧИКИ, ЕДИНОЕ, С ВКЛАДКАМИ) =====
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    if (!modal) return; // защита: если окна нет в разметке, тихо выходим

    // --- Переключение вкладок ---
    const tabs = modal.querySelectorAll('.tab-btn');
    const pages = modal.querySelectorAll('.tab-page');

    function activateTab(targetId) {
        tabs.forEach((t) => {
            const isTarget = t.dataset.tab === targetId;
            t.classList.toggle('active', isTarget);
            t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        });
        pages.forEach((p) => {
            p.classList.toggle('active', p.id === targetId);
        });
        // Сбрасываем прокрутку окна на начало
        const content = modal.querySelector('.modal-content');
        if (content) content.scrollTop = 0;
    }

    tabs.forEach((btn) => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    // --- Открытие ---
    // Каждая кнопка открывает окно на своей вкладке:
    //   openModalBtn (Меню →)              → вкладка "МЕНЮ КАФЕ · 1/2"
    //   btnkurlans (Как потратить курланчики) → вкладка "ЗА КУРЛАНЧИКИ"
    ['openModalBtn', 'btnkurlans'].forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // блокируем скролл фона
                activateTab(btn.dataset.tab || 'page-1');
            });
        }
    });

    // --- Закрытие (крестик, фон, Escape) — всегда со сбросом скролла ---
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});