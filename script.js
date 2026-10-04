// contact us section start
const contactForm = document.getElementById('bbcntContactForm');
const popupOverlay = document.getElementById('bbcntSuccessPopup');
const closeBtn = document.getElementById('bbcntClosePopup');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    popupOverlay.classList.add('bbcnt-popup-active');
    contactForm.reset();
});

closeBtn.addEventListener('click', function () {
    popupOverlay.classList.remove('bbcnt-popup-active');
});

popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('bbcnt-popup-active');
    }
});
// contact us section end

// FAQs section start

document.querySelectorAll('.bb-faq-trigger-btn').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;

        document.querySelectorAll('.bb-faq-accordion-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('bb-faq-active');
            }
        });

        currentItem.classList.toggle('bb-faq-active');
    });
});

// FAQs section end
