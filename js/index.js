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
