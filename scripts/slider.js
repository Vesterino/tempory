const prevButton = document.querySelector('.reviews__button-prev');
const nextButton = document.querySelector('.reviews__button-next');
const reviewsCards = document.querySelector('.reviews__cards');
const reviewItems = document.querySelectorAll('.reviews__card');

let currentIndex = 0;

const updateSlider = () => {
    const itemWidth = reviewItems[0].offsetWidth + 20; // Учитываем ширину карточки и gap
    const visibleWidth = reviewsCards.offsetWidth;
    const totalWidth = reviewItems.length * itemWidth;

    const maxOffset = Math.max(0, totalWidth - visibleWidth);
    const currentOffset = Math.min(currentIndex * itemWidth, maxOffset);

    reviewsCards.style.transform = `translateX(-${currentOffset}px)`;
    reviewsCards.style.transition = 'transform 0.5s ease';

    // Отключаем кнопки, если находимся на границе
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentOffset >= maxOffset;

    if (currentIndex === 0) {
        prevButton.classList.add('reviews__button-disabled');
    } else {
        prevButton.classList.remove('reviews__button-disabled');
    }

    if (currentOffset >= maxOffset) {
        nextButton.classList.add('reviews__button-disabled');
    } else {
        nextButton.classList.remove('reviews__button-disabled');
    }
};



nextButton.addEventListener('click', () => {
    const itemWidth = reviewItems[0].offsetWidth + 20; // Учитываем ширину карточки и gap
    const visibleWidth = reviewsCards.offsetWidth;
    const totalWidth = reviewItems.length * itemWidth;

    if (currentIndex * itemWidth < totalWidth - visibleWidth) {
        currentIndex++;
        updateSlider();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

// Свайпы для мобильных
let startX = 0;
let endX = 0;

reviewsCards.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

reviewsCards.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        nextButton.click(); // Имитация клика на "Next"
    }

    if (endX - startX > 50) {
        prevButton.click(); // Имитация клика на "Prev"
    }
});

// Инициализация
updateSlider();
