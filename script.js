document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a'); // Get all links in mobile nav

    if (mobileNavToggle && mobileNav) {
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