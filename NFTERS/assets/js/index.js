const introSwiper = new Swiper('.introSwiper', {
    effect: 'cards',
    grabCursor: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});

const overSwiper = new Swiper('.overSwiper', {
    spaceBetween: 30,
    slidesPerView: 3,
    direction: 'vertical',
    mousewheel: true,
    freeMode: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    loop: true,
    watchSlidesProgress: true,
});

const overSwiper2 = new Swiper('.overSwiper2', {
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    thumbs: {
        swiper: overSwiper,
    },
});

if (document.querySelector('.collections__content__slider')) {
    document.querySelectorAll('.card').forEach((card) => {
        const thumbsEl = card.querySelector('.mySwiper');
        const galleryEl = card.querySelector('.mySwiper2');

        if (!thumbsEl || !galleryEl) {
            return;
        }

        const thumbsSwiper = new Swiper(thumbsEl, {
            spaceBetween: 8,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            direction: 'vertical',
            mousewheel: true,
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
        });

        new Swiper(galleryEl, {
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    });

    new Swiper('.collections__content__slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,

        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

const createGallery = document.querySelector('.create__content__gallery');

if (createGallery) {
    const createCards = [...createGallery.querySelectorAll('.create__card')];
    const slotValues = createCards.map((card) => Number(card.dataset.slot)).filter((slot) => !Number.isNaN(slot));
    const slotsCount = slotValues.length;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let createGalleryTimer;

    const rotateCreateCards = () => {
        if (createCards.length < 2 || slotsCount < 2) {
            return;
        }

        createCards.forEach((card) => {
            const currentSlot = Number(card.dataset.slot);
            const nextSlot = currentSlot >= slotsCount ? 1 : currentSlot + 1;
            card.dataset.slot = String(nextSlot);
        });
    };

    const startCreateGalleryAnimation = () => {
        if (prefersReducedMotion || createCards.length < 2 || createGalleryTimer) {
            return;
        }

        createGalleryTimer = window.setInterval(rotateCreateCards, 1800);
    };

    startCreateGalleryAnimation();
}

// // #### DevTools Detection and Protection ####
// const blockEvent = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// };

// const PROTECTION_URL = 'https://what-are-you-doing-here.vercel.app/';

// const redirectToProtectionPage = () => {
//     if (document.body?.dataset.devtoolsLocked === 'true') {
//         return;
//     }

//     if (document.body) {
//         document.body.dataset.devtoolsLocked = 'true';
//     }

//     if (window.location.href !== PROTECTION_URL) {
//         window.location.replace(PROTECTION_URL);
//     }
// };

// const isBlockedShortcut = (e) => {
//     const key = (e.key || '').toUpperCase();
//     const ctrlOrCmd = e.ctrlKey || e.metaKey;

//     if (key === 'F12') {
//         return true;
//     }

//     if (ctrlOrCmd && e.shiftKey && ['I', 'C', 'J', 'K'].includes(key)) {
//         return true;
//     }

//     if (ctrlOrCmd && ['U', 'S', 'P'].includes(key)) {
//         return true;
//     }

//     return false;
// };

// const detectDevtoolsByViewport = () => {
//     const widthGap = window.outerWidth - window.innerWidth;
//     const heightGap = window.outerHeight - window.innerHeight;
//     const threshold = 160;

//     if (widthGap > threshold || heightGap > threshold) {
//         redirectToProtectionPage();
//     }
// };

// const detectDevtoolsByDebugger = () => {
//     const startedAt = Date.now();

//     debugger;

//     if (Date.now() - startedAt > 120) {
//         redirectToProtectionPage();
//     }
// };

// const handleShortcutBlock = (e) => {
//     if (isBlockedShortcut(e)) {
//         blockEvent(e);

//         if ((e.key || '').toUpperCase() === 'U') {
//             redirectToProtectionPage();
//         }
//     }
// };

// document.addEventListener('contextmenu', blockEvent, true);
// document.addEventListener('copy', blockEvent, true);
// document.addEventListener('cut', blockEvent, true);
// document.addEventListener('selectstart', blockEvent, true);
// document.addEventListener('dragstart', blockEvent, true);
// ['keydown', 'keypress', 'keyup'].forEach((eventName) => {
//     window.addEventListener(eventName, handleShortcutBlock, true);
//     document.addEventListener(eventName, handleShortcutBlock, true);
// });

// window.addEventListener('resize', detectDevtoolsByViewport);

// setInterval(() => {
//     detectDevtoolsByViewport();
//     detectDevtoolsByDebugger();
// }, 100);
