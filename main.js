// main.js - Avalon Mystic Interactions V2

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if we are on index.html or another page
            if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' && !window.location.pathname.endsWith('AvalonMystic/')) {
                // Let the browser handle navigating to index.html#id
                return;
            }
            
            const targetId = this.getAttribute('href').replace('index.html', '');
            if(targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Carousel Logic (Hero Section)
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Cambia cada 5 segundos
    }

    // 3. Lightbox Logic (Gallery Page)
    const masonryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (masonryItems.length > 0 && lightbox) {
        masonryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Cierra con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 4. Pricing Modal Logic
    const btnMostrarPrecios = document.getElementById('btnMostrarPrecios');
    const pricingModal = document.getElementById('pricingModal');
    const closePricingModal = document.getElementById('closePricingModal');

    if (btnMostrarPrecios && pricingModal && closePricingModal) {
        btnMostrarPrecios.addEventListener('click', () => {
            pricingModal.classList.add('active');
        });

        closePricingModal.addEventListener('click', () => {
            pricingModal.classList.remove('active');
        });

        pricingModal.addEventListener('click', (e) => {
            if (e.target === pricingModal) {
                pricingModal.classList.remove('active');
            }
        });
        
        // Cierra con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pricingModal.classList.contains('active')) {
                pricingModal.classList.remove('active');
            }
        });
    }

    // 5. Reviews Carousel Logic
    const reviewsCarousel = document.getElementById('reviewsCarousel');
    const reviewDots = document.querySelectorAll('.review-dot');
    
    if (reviewsCarousel && reviewDots.length > 0) {
        let currentReviewIndex = 0;
        const totalReviews = reviewDots.length;
        let reviewInterval;

        const updateReviewSlide = (index) => {
            reviewsCarousel.style.transform = `translateX(-${index * 100}%)`;
            reviewDots.forEach(dot => dot.classList.remove('active'));
            reviewDots[index].classList.add('active');
            currentReviewIndex = index;
        };

        const nextReview = () => {
            const nextIndex = (currentReviewIndex + 1) % totalReviews;
            updateReviewSlide(nextIndex);
        };

        // Auto-play
        const startReviewCarousel = () => {
            reviewInterval = setInterval(nextReview, 6000);
        };

        const stopReviewCarousel = () => {
            clearInterval(reviewInterval);
        };

        // Click on dots
        reviewDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                stopReviewCarousel();
                const index = parseInt(e.target.getAttribute('data-index'));
                updateReviewSlide(index);
                startReviewCarousel(); // Restart interval
            });
        });

        // Pause on hover
        reviewsCarousel.parentElement.addEventListener('mouseenter', stopReviewCarousel);
        reviewsCarousel.parentElement.addEventListener('mouseleave', startReviewCarousel);

        startReviewCarousel();
    }
});
