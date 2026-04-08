// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Mobile Menu Logic
const mobileTrigger = document.getElementById('mobile-trigger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-menu-close');
const body = document.body;

if (mobileTrigger && mobileMenu) {
    const tl = gsap.timeline({ paused: true });

    tl.to(mobileMenu, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power4.inOut"
    });

    tl.from(".mobile-nav-list > li", {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.2");

    const toggleMenu = () => {
        const isActive = mobileMenu.classList.toggle('is-active');
        mobileTrigger.classList.toggle('is-active');
        
        if (isActive) {
            tl.play();
            body.style.overflow = 'hidden';
            // Disable Lenis if needed, but data-lenis-prevent should handle it
        } else {
            tl.reverse();
            body.style.overflow = '';
        }
    };

    mobileTrigger.addEventListener('click', toggleMenu);
    if (mobileClose) {
        mobileClose.addEventListener('click', toggleMenu);
    }
}

// Mobile Submenu Accordion
const subToggles = document.querySelectorAll('.has-mobile-submenu > a');
subToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        const subMenu = parent.querySelector('.mobile-sub-menu');
        
        if (parent.classList.contains('is-open')) {
            gsap.to(subMenu, {
                height: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    subMenu.style.display = 'none';
                    parent.classList.remove('is-open');
                }
            });
        } else {
            subMenu.style.display = 'block';
            const height = subMenu.scrollHeight;
            gsap.fromTo(subMenu, 
                { height: 0 },
                { height: height, duration: 0.3, ease: "power2.inOut" }
            );
            parent.classList.add('is-open');
        }
    });
});

// Hero Slider Initialization
const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.hero-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">' +
                '<path d="M2.11838 0.023272C1.55959 0.11706 1.11412 0.345669 0.719451 0.742315C0.379488 1.0823 0.148938 1.51411 0.0473399 1.99869C-0.0640274 2.52234 0.0278018 3.63412 0.25249 4.52902C0.365811 4.97842 1.74716 9.34348 1.8214 9.48026C1.98552 9.78702 2.34698 10 2.70062 10C2.92726 10 3.19298 9.89644 3.36687 9.74404C3.4841 9.64048 3.55248 9.5291 4.03116 8.64202C4.50594 7.76667 4.55283 7.70219 4.77557 7.61817C4.93382 7.5576 5.14093 7.56737 5.28356 7.64162C5.46526 7.73345 5.51606 7.80965 6.00842 8.71823C6.42263 9.48026 6.48906 9.59163 6.59261 9.69519C6.83488 9.94138 7.1768 10.0469 7.50504 9.97851C7.77858 9.92184 8.05211 9.71864 8.17911 9.48026C8.25335 9.34153 9.63665 4.97451 9.74802 4.52902C9.97466 3.62435 10.0626 2.5282 9.95317 1.99869C9.78319 1.17999 9.2244 0.500029 8.4585 0.185448C8.10877 0.0408573 7.76099 -0.0158065 7.33506 0.00373277C6.88959 0.0213181 6.64146 0.0721201 6.04945 0.261651C5.53755 0.423826 5.3832 0.453135 5.00025 0.453135C4.62121 0.453135 4.45709 0.423826 3.98427 0.269466C3.37664 0.0721201 3.09138 0.0174102 2.60683 0.00568669C2.38215 -0.000175073 2.22389 0.00568669 2.11838 0.023272Z" />' +
                '</svg>' +
                '</span>';
        },
    },
});
// Client Logo Slider
const clientSlider = new Swiper('.client-slider', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        }
    }
});
