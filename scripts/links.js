const updateSocialLinks = () => {
    const instagramLink = document.querySelector('.social__link-instagram');
    const facebookLink = document.querySelector('.social__link-facebook');

    if (window.innerWidth <= 480) {
        // Мобильные ссылки
        instagramLink.href = 'https://m.facebook.com';
        facebookLink.href = 'https://m.linkedin.com';
    } else {
        // Десктопные ссылки
        facebookLink.href = 'https://facebook.com';
        instagramLink.href = 'https://instagram.com';
    }
};

// Обновляем ссылки при загрузке страницы и изменении размера окна
updateSocialLinks();
window.addEventListener('resize', updateSocialLinks);