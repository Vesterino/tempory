document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.reviews__button-prev');
    const nextButton = document.querySelector('.reviews__button-next');
    const reviewsCards = document.querySelector('.reviews__cards');
    const reviewItems = document.querySelectorAll('.reviews__card');

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    const updateSlider = () => {
        const itemWidth = reviewItems[0].getBoundingClientRect().width;
        const visibleWidth = reviewsCards.offsetWidth;
        const totalWidth = reviewItems.length * itemWidth;

        const maxOffset = Math.max(0, totalWidth - visibleWidth);
        const currentOffset = Math.min(currentIndex * itemWidth, maxOffset);

        reviewsCards.style.transform = `translateX(-${currentOffset}px)`;
        reviewsCards.style.transition = 'transform 0.5s ease';

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentOffset >= maxOffset;

        prevButton.classList.toggle('reviews__button-disabled', currentIndex === 0);
        nextButton.classList.toggle('reviews__button-disabled', currentOffset >= maxOffset);
    };

    nextButton.addEventListener('click', () => {
        const itemWidth = reviewItems[0].getBoundingClientRect().width;
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

    reviewsCards.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: false });

    reviewsCards.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            nextButton.click();
        }

        if (endX - startX > 50) {
            prevButton.click();
        }
    }, { passive: false });

    updateSlider();
});
