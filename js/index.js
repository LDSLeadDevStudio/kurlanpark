// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
// let currentSlide = 0;

// // --- ГЛОБАЛЬНЫЕ ФУНКЦИИ (для onclick в HTML) ---

// // Эта функция нужна, чтобы работал onclick="openMenuModal()" в HTML
// function openMenuModal() {
//     const modal = document.getElementById('menu'); // проверь ID модального окна в HTML
//     if (!modal) {
//         console.error('Модальное окно с id="menu" не найдено. Проверь HTML.');
//         return;
//     }
//     modal.classList.add('active');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.style.overflow = 'hidden';
// }

// // Функция для закрытия (если тоже вызывается из HTML)
// function closeModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (!modal) return;
//     modal.classList.remove('active');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.style.overflow = '';
// }

// // Слайдер (для onclick в HTML)
// function changeSlide(direction) {
//     const slides = document.querySelectorAll('.photo-slide');
//     const numIndicator = document.getElementById('slide-num');

//     if (!slides || slides.length === 0) return;

//     slides[currentSlide].style.opacity = '0';
//     slides[currentSlide].style.pointerEvents = 'none';
//     slides[currentSlide].classList.remove('active');

//     currentSlide = (currentSlide + direction + slides.length) % slides.length;

//     slides[currentSlide].style.opacity = '1';
//     slides[currentSlide].style.pointerEvents = 'auto';
//     slides[currentSlide].classList.add('active');

//     if (numIndicator) {
//         numIndicator.textContent = currentSlide + 1;
//     }
// }

// function scrollGallery(offset) {
//     const track = document.getElementById('gallery-track');
//     if (track) {
//         track.scrollBy({ left: offset, behavior: 'smooth' });
//     }
// }

// // --- ЛОГИКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Свайпы для слайдера
//     const touchArea = document.getElementById('slider-touch-area');
//     if (touchArea) {
//         let startX = 0;
//         let endX = 0;
//         const threshold = 40;

//         touchArea.addEventListener('touchstart', (e) => {
//             startX = e.changedTouches.screenX;
//         }, { passive: true });

//         touchArea.addEventListener('touchend', (e) => {
//             endX = e.changedTouches.screenX;
//             if (endX < startX - threshold) {
//                 changeSlide(1);
//             } else if (endX > startX + threshold) {
//                 changeSlide(-1);
//             }
//         }, { passive: true });
//     }

//     // 2. Универсальная инициализация модальных окон
//     function initModal(modalId, triggerId, closeSelector = '.modal-close') {
//         const modal = document.getElementById(modalId);
//         const trigger = document.getElementById(triggerId);

//         if (!modal) {
//             console.warn(`Модальное окно с id="\${modalId}" не найдено.`);
//             return;
//         }

//         const closeBtn = modal.querySelector(closeSelector);

//         function open() {
//             modal.classList.add('active');
//             modal.setAttribute('aria-hidden', 'false');
//             document.body.style.overflow = 'hidden';
//             if (closeBtn) closeBtn.focus();
//         }

//         function close() {
//             modal.classList.remove('active');
//             modal.setAttribute('aria-hidden', 'true');
//             document.body.style.overflow = '';
//         }

//         if (trigger) {
//             trigger.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 open();
//             });
//         }

//         if (closeBtn) {
//             closeBtn.addEventListener('click', close);
//         }

//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) close();
//         });

//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && modal.classList.contains('active')) {
//                 close();
//             }
//         });
//     }

//     // Раскомментируй строки ниже под свои ID в HTML
//     // initModal('menu', 'btnmenu', '.modal-close');
//     // initModal('modal-menu', 'btn-open-menu', '.modal-close');

//     // 3. Если у тебя есть отдельное окно с id="modal" и кнопками openModalBtn/closeModalBtn
//     const openBtn = document.getElementById('openModalBtn');
//     const closeBtn = document.getElementById('closeModalBtn');
//     const modal = document.getElementById('modal');

//     if (openBtn && closeBtn && modal) {
//         openBtn.addEventListener('click', () => {
//             modal.classList.add('active');
//             modal.setAttribute('aria-hidden', 'false');
//             document.body.style.overflow = 'hidden';
//         });

//         closeBtn.addEventListener('click', () => {
//             modal.classList.remove('active');
//             modal.setAttribute('aria-hidden', 'true');
//             document.body.style.overflow = '';
//         });

//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 modal.classList.remove('active');
//                 modal.setAttribute('aria-hidden', 'true');
//                 document.body.style.overflow = '';
//             }
//         });

//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && modal.classList.contains('active')) {
//                 modal.classList.remove('active');
//                 modal.setAttribute('aria-hidden', 'true');
//                 document.body.style.overflow = '';
//             }
//         });
//     } else if (openBtn || closeBtn || modal) {
//         console.warn('Не все элементы модального окна найдены. Проверь ID в HTML.');
//     }
// });

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
      console.log('Клик по крестику — закрываем модалку');
      modal.classList.remove('active');
    });
  } else {
    console.warn('Не удалось повесить обработчик на крестик.');
  }

  // 3. Закрытие по фону
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        console.log('Клик по фону — закрываем модалку');
        modal.classList.remove('active');
      }
    });
  }

  // 4. Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      console.log('Нажат Esc — закрываем модалку');
      modal.classList.remove('active');
    }
  });
});
