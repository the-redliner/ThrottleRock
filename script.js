document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileNavToggle && mobileNav) {
        const navLinks = mobileNav.querySelectorAll('a'); // Get all links in mobile nav

        mobileNavToggle.addEventListener('click', function() {
            mobileNavToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('mobile-nav-active'); // Toggle body scroll lock
        });

        // Close mobile menu when a link is clicked (for single-page navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mobileNav.classList.contains('active')) {
                    mobileNavToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.classList.remove('mobile-nav-active');
                }
            });
        });
    }
});

// Gallery lightbox: click a photo to view it enlarged with prev/next navigation.
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    if (!galleryImages.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
        '<img src="" alt="">' +
        '<button class="lightbox-next" aria-label="Next photo">&#10095;</button>';
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentIndex];
        imgEl.src = img.currentSrc || img.src;
        imgEl.alt = img.alt || '';
    }

    function openLightbox(index) {
        showImage(index);
        overlay.classList.add('active');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }

    galleryImages.forEach((img, i) => {
        img.addEventListener('click', () => openLightbox(i));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
});