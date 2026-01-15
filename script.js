// Cool Incense Website Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Form validation for contact form
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.querySelector('input[placeholder="e.g. Alex Rivera"]');
            const emailInput = document.querySelector('input[placeholder="alex@example.com"]');
            const phoneInput = document.querySelector('input[placeholder="+1 (555) 000-0000"]');
            
            if (!nameInput.value || !emailInput.value || !phoneInput.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your submission! We will contact you shortly.');
            contactForm.reset();
        });
    }

    // Payment method selection
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Highlight selected payment method
            document.querySelectorAll('.payment-radio').forEach(r => {
                const card = r.parentElement.nextElementSibling;
                if (r.checked) {
                    card.style.borderColor = '#137fec';
                    card.style.backgroundColor = 'rgba(19, 127, 236, 0.05)';
                } else {
                    card.style.borderColor = '';
                    card.style.backgroundColor = '';
                }
            });
        });
    });

    // Image gallery functionality for product images
    const galleryImages = document.querySelectorAll('.grid.grid-cols-4 img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Remove active class from all images
            galleryImages.forEach(i => i.classList.remove('ring-2', 'ring-primary', 'opacity-100'));
            // Add active class to clicked image
            this.classList.add('ring-2', 'ring-primary', 'opacity-100');
            
            // Change main product image to clicked thumbnail
            const mainImage = document.querySelector('.w-full.aspect-square.bg-slate-200');
            if (mainImage) {
                mainImage.style.backgroundImage = this.style.backgroundImage;
            }
        });
    });

    // Add fade-in effect when sections come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Handle video play button click
    const videoPlayButton = document.querySelector('.group.cursor-pointer');
    if (videoPlayButton) {
        videoPlayButton.addEventListener('click', function() {
            alert('Video playback would start here in a real implementation.');
        });
    }

    // Handle pre-order buttons
    const preorderButtons = document.querySelectorAll('button');
    preorderButtons.forEach(button => {
        if (button.textContent.includes('Pre-order Now')) {
            button.addEventListener('click', function() {
                alert('Pre-order process would start here in a real implementation.');
            });
        }
    });

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.max-w-2xl.mx-auto form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!emailInput.value) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Waitlist form
    const waitlistForm = document.querySelector('.bg-primary form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = waitlistForm.querySelector('input[type="email"]');
            if (!emailInput.value) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('You have been added to our waitlist! Thank you.');
            waitlistForm.reset();
        });
    }

    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'md:hidden material-symbols-outlined text-white text-2xl';
    mobileMenuToggle.textContent = 'menu';
    mobileMenuToggle.setAttribute('id', 'mobile-menu-toggle');
    
    const navContainer = document.querySelector('.max-w-\\[1200px\\]');
    if (navContainer && window.innerWidth < 768) {
        navContainer.appendChild(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('nav.hidden.md\\:flex');
            navMenu.classList.toggle('hidden');
        });
    }
});

// Utility function to check if element contains text (used in button selector)
Element.prototype.containsText = function(text) {
    return this.textContent.toLowerCase().includes(text.toLowerCase());
};