document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeBtn');

  console.log('modal:', modal);
  console.log('openBtn:', openBtn);
  console.log('closeBtn:', closeBtn);

  if (!closeBtn) {
    console.error('КНОПКА ЗАКРЫТИЯ НЕ НАЙДЕНА! Проверь id="closeBtn" в HTML.');
  }

  // 1. Открытие
  if (openBtn && modal) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  // 2. Закрытие по крестику
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  } else {
    console.warn('Не удалось повесить обработчик на крестик.');
  }

  // 3. Закрытие по фону
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // 4. Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.photo-slide');
  let currentIndex = 0;

  function switchSlide(direction) {
    const total = slides.length;

    // Вычисляем новый индекс (зацикливание)
    currentIndex = (currentIndex + direction + total) % total;

    slides.forEach((slide, index) => {
      // Просто показываем нужный, остальные скрываем
      slide.classList.toggle('active', index === currentIndex);
      slide.style.opacity = index === currentIndex ? '1' : '0';
      slide.style.pointerEvents = index === currentIndex ? 'auto' : 'none';
    });
  }

  // Функция для кнопок в HTML (onclick="changeSlide(-1/1)")
  window.changeSlide = function(direction) {
    switchSlide(direction);
  };

  // Свайпы на мобильных (без номеров, просто переключение)
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
        switchSlide(1); // влево → следующий
      }
      if (endX > startX + threshold) {
        switchSlide(-1); // вправо → предыдущий
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Порог появления: показываем, если прокрутили больше 300px
        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Плавная прокрутка наверх при клике
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем стандартный прыжок к якорю #top
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная анимация
        });
    });
});
