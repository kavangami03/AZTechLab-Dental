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


