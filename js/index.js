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
  const slideNumEl = document.getElementById('slide-num');
  let currentSlide = 0;

  function updateSlide(direction) {
    const totalSlides = slides.length;

    // Вычисляем новый индекс с зацикливанием (если дошли до конца — начинаем сначала)
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Сбрасываем все слайды
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
      slide.style.opacity = index === currentSlide ? '1' : '0';
      // Убираем pointer-events у неактивных, чтобы не мешали кликам
      slide.style.pointerEvents = index === currentSlide ? 'auto' : 'none';
    });

    // Обновляем счётчик
    if (slideNumEl) {
      slideNumEl.textContent = `\${currentSlide + 1}`;
    }
  }

  // Функция, которую вызывают кнопки в HTML
  window.changeSlide = function(direction) {
    updateSlide(direction);
  };

  // (Опционально) Поддержка свайпов на мобильных
  const sliderArea = document.getElementById('slider-touch-area');
  if (sliderArea) {
    let touchStartX = 0;
    let touchEndX = 0;

    sliderArea.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches.screenX;
    }, { passive: true });

    sliderArea.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches.screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; // минимальная дистанция свайпа в пикселях
      if (touchEndX < touchStartX - swipeThreshold) {
        updateSlide(1); // свайп влево = следующий слайд
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        updateSlide(-1); // свайп вправо = предыдущий слайд
      }
    }
  }
});
