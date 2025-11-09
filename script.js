// ===== Navigation Menu =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== Active Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active-link');
        } else {
            link?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Header Shadow on Scroll =====
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== Scroll to Top Button =====
const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (window.scrollY >= 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollTop);

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash or just "#"
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(`
    .offer__card,
    .blog__card,
    .shop__card,
    .feature,
    .about__content,
    .section__header
`);

animatedElements.forEach(el => observer.observe(el));

// ===== Form Handling =====

// Ebook Form
const ebookForm = document.getElementById('ebook-form');
if (ebookForm) {
    ebookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(ebookForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitButton = ebookForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Wysyłam...';
        submitButton.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            showNotification('Dziękuję! E-book został wysłany na Twój adres email.', 'success');
            ebookForm.reset();

        } catch (error) {
            // Error
            showNotification('Wystąpił błąd. Spróbuj ponownie później.', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Wysyłam...';
        submitButton.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            showNotification('Dziękuję za wiadomość! Odpowiem tak szybko, jak to możliwe.', 'success');
            contactForm.reset();

        } catch (error) {
            // Error
            showNotification('Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio przez email.', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ===== Shop Payment Handling =====
const shopButtons = document.querySelectorAll('.shop__buy-button');

shopButtons.forEach(button => {
    button.addEventListener('click', async function() {
        const product = this.dataset.product;
        const price = this.dataset.price;

        // Disable button and show loading state
        const originalText = this.textContent;
        this.textContent = 'Przetwarzam...';
        this.disabled = true;

        try {
            // Create payment data
            const paymentData = {
                product: product,
                price: price,
                currency: 'PLN'
            };

            // Here you would normally call your payment gateway API
            // For now, we'll simulate the payment process

            // Option 1: Przelewy24 integration (Polish payment gateway)
            // This requires backend integration
            // await initiatePrzelewy24Payment(paymentData);

            // Option 2: Stripe integration (International)
            // await initiateStripePayment(paymentData);

            // For demonstration, we'll show a modal with payment instructions
            showPaymentModal(product, price);

        } catch (error) {
            console.error('Payment error:', error);
            showNotification('Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie.', 'error');
        } finally {
            // Restore button state
            this.textContent = originalText;
            this.disabled = false;
        }
    });
});

// Payment Modal
function showPaymentModal(product, price) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.payment-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal__overlay"></div>
        <div class="payment-modal__content">
            <button class="payment-modal__close" aria-label="Zamknij">&times;</button>
            <h3 class="payment-modal__title">Wybierz metodę płatności</h3>
            <p class="payment-modal__description">Produkt: <strong>${getProductName(product)}</strong></p>
            <p class="payment-modal__price">Cena: <strong>${price} zł</strong></p>

            <div class="payment-modal__methods">
                <button class="payment-method" data-method="p24">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10" stroke="white" stroke-width="2"></line>
                    </svg>
                    <span>Przelewy24</span>
                    <small>BLIK, karta, przelew</small>
                </button>

                <button class="payment-method" data-method="transfer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>Przelew tradycyjny</span>
                    <small>Dane po kliknięciu</small>
                </button>
            </div>

            <p class="payment-modal__note">
                Po dokonaniu płatności skontaktujemy się z Tobą w ciągu 24h w celu umówienia terminu.
            </p>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add styles for modal
    addPaymentModalStyles();

    // Show modal with animation
    setTimeout(() => modal.classList.add('show'), 10);

    // Close modal handlers
    const closeBtn = modal.querySelector('.payment-modal__close');
    const overlay = modal.querySelector('.payment-modal__overlay');

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Payment method handlers
    const paymentMethods = modal.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.dataset.method;
            handlePaymentMethod(methodType, product, price);
            closeModal();
        });
    });
}

function getProductName(product) {
    const products = {
        'konsultacja': 'Konsultacja 1-1',
        'cv': 'Budowanie CV',
        'rozmowa': 'Przygotowanie do rozmowy kwalifikacyjnej',
        'testy': 'Testy predyspozycji zawodowych'
    };
    return products[product] || product;
}

function handlePaymentMethod(method, product, price) {
    if (method === 'p24') {
        // Przelewy24 integration
        // In production, this would redirect to P24 payment gateway
        showNotification('Przekierowywanie do Przelewy24...', 'success');

        // Example: Redirect to payment gateway (uncomment in production)
        // window.location.href = `/api/payment/przelewy24?product=${product}&price=${price}`;

        // For demo purposes:
        setTimeout(() => {
            showNotification('To jest wersja demonstracyjna. W produkcji nastąpi przekierowanie do Przelewy24.', 'success');
        }, 1500);

    } else if (method === 'transfer') {
        // Show bank transfer details
        showTransferDetails(product, price);
    }
}

function showTransferDetails(product, price) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.innerHTML = `
        <div class="payment-modal__overlay"></div>
        <div class="payment-modal__content">
            <button class="payment-modal__close" aria-label="Zamknij">&times;</button>
            <h3 class="payment-modal__title">Dane do przelewu</h3>

            <div class="transfer-details">
                <p><strong>Kwota:</strong> ${price} zł</p>
                <p><strong>Numer konta:</strong></p>
                <p class="account-number">XX XXXX XXXX XXXX XXXX XXXX XXXX</p>
                <p><strong>Odbiorca:</strong> Katarzyna Dudek</p>
                <p><strong>Tytuł przelewu:</strong> ${getProductName(product)}</p>

                <button class="button button--primary copy-account-btn">
                    Kopiuj numer konta
                </button>

                <p class="transfer-note">
                    Po zaksięgowaniu płatności (1-2 dni robocze) skontaktujemy się z Tobą
                    w celu umówienia terminu konsultacji.
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close handler
    const closeBtn = modal.querySelector('.payment-modal__close');
    const overlay = modal.querySelector('.payment-modal__overlay');

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Copy account number
    const copyBtn = modal.querySelector('.copy-account-btn');
    copyBtn.addEventListener('click', () => {
        const accountNumber = modal.querySelector('.account-number').textContent;
        navigator.clipboard.writeText(accountNumber.replace(/\s/g, ''));
        showNotification('Numer konta skopiowany do schowka!', 'success');
    });
}

function addPaymentModalStyles() {
    if (document.getElementById('payment-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'payment-modal-styles';
    style.textContent = `
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .payment-modal.show {
            opacity: 1;
        }

        .payment-modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .payment-modal__content {
            position: relative;
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }

        .payment-modal.show .payment-modal__content {
            transform: translateY(0);
        }

        .payment-modal__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            transition: color 0.2s;
        }

        .payment-modal__close:hover {
            color: #000;
        }

        .payment-modal__title {
            margin-bottom: 1rem;
            font-size: 1.5rem;
            color: #2d2d2d;
        }

        .payment-modal__description,
        .payment-modal__price {
            margin-bottom: 0.5rem;
            color: #666;
        }

        .payment-modal__price {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
        }

        .payment-modal__methods {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .payment-method {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1.5rem;
            background-color: #f5f3f0;
            border: 2px solid transparent;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .payment-method:hover {
            background-color: #e8e3dc;
            border-color: #a89078;
            transform: translateY(-2px);
        }

        .payment-method svg {
            width: 40px;
            height: 40px;
            color: #a89078;
        }

        .payment-method span {
            font-weight: 600;
            color: #2d2d2d;
        }

        .payment-method small {
            color: #666;
            font-size: 0.875rem;
        }

        .payment-modal__note {
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: #f5f3f0;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            color: #666;
            text-align: center;
        }

        .transfer-details {
            padding: 1rem 0;
        }

        .transfer-details p {
            margin-bottom: 0.75rem;
        }

        .account-number {
            font-family: monospace;
            font-size: 1.125rem;
            padding: 1rem;
            background-color: #f5f3f0;
            border-radius: 0.5rem;
            text-align: center;
            margin: 1rem 0;
        }

        .copy-account-btn {
            margin: 1.5rem 0;
        }

        .transfer-note {
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: #f5f3f0;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            color: #666;
        }

        @media (max-width: 480px) {
            .payment-modal__content {
                padding: 1.5rem;
            }

            .payment-method {
                padding: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✓' : '!'}</span>
            <p class="notification__message">${message}</p>
        </div>
        <button class="notification__close" aria-label="Zamknij powiadomienie">✕</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: calc(var(--header-height) + 1rem);
        right: 1rem;
        max-width: 400px;
        background-color: ${type === 'success' ? '#4caf50' : '#e3020b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    // Append to body
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    .notification__content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification__icon {
        width: 24px;
        height: 24px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .notification__message {
        margin: 0;
        line-height: 1.5;
    }

    .notification__close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .notification__close:hover {
        opacity: 1;
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media screen and (max-width: 480px) {
        .notification {
            left: 1rem;
            right: 1rem;
            max-width: none;
        }

        @keyframes slideIn {
            from {
                transform: translateY(-100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-100px);
                opacity: 0;
            }
        }
    }
`;
document.head.appendChild(style);

// ===== Performance Optimization =====

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handlers
window.addEventListener('scroll', debounce(() => {
    scrollActive();
    scrollHeader();
    toggleScrollTop();
}, 10));

// ===== Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
function createTypingEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== Console Message =====
console.log('%c👋 Witaj w kodzie strony!', 'color: #04685A; font-size: 16px; font-weight: bold;');
console.log('%cStrona stworzona z dbałością o szczegóły i najwyższą jakość kodu.', 'color: #666; font-size: 12px;');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    scrollActive();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Log page load time
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// ===== Service Worker for PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===== Analytics Placeholder =====
// Replace with your actual analytics code (Google Analytics, Plausible, etc.)
function trackEvent(category, action, label) {
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        const formId = form.id || 'unknown';
        trackEvent('Form', 'Submit', formId);
    });
});

// ===== Accessibility Enhancements =====

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link sr-only';
skipLink.textContent = 'Przejdź do głównej treści';
skipLink.addEventListener('focus', function() {
    this.classList.remove('sr-only');
});
skipLink.addEventListener('blur', function() {
    this.classList.add('sr-only');
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for custom elements
document.querySelectorAll('.offer__card, .blog__card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.querySelector('a');
            if (link) link.click();
        }
    });
});

// ===== Dark Mode Toggle (Optional Feature) =====
// Uncomment to enable dark mode functionality
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Przełącz tryb ciemny');
darkModeToggle.innerHTML = '🌙';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}
*/

// ===== Print Optimization =====
window.addEventListener('beforeprint', () => {
    console.log('🖨️ Preparing page for printing...');
});

window.addEventListener('afterprint', () => {
    console.log('✅ Print completed');
});

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('❌ Error occurred:', e.error);
    // You could send this to an error tracking service
});

// ===== Online/Offline Status =====
window.addEventListener('online', () => {
    showNotification('Połączenie z internetem zostało przywrócone', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Brak połączenia z internetem', 'error');
});

// ===== Parallax Effect for About Section Photo =====
function initParallax() {
    const aboutImage = document.querySelector('.about__image-wrapper');

    if (!aboutImage) return;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('#about');

        if (!aboutSection) return;

        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate when section enters and exits viewport
        const scrollStart = sectionTop - windowHeight;
        const scrollEnd = sectionTop + sectionHeight;
        const scrollRange = scrollEnd - scrollStart;

        // Current scroll progress through the section (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, (scrolled - scrollStart) / scrollRange));

        // Only apply parallax when section is in viewport
        if (scrolled > scrollStart && scrolled < scrollEnd) {
            // Max offset limited to prevent image from going outside container
            const maxOffset = 80; // Maximum pixels it can move (adjust as needed)

            // Map progress from 0-1 to -maxOffset to +maxOffset
            // When entering viewport (top): negative offset (image higher)
            // When exiting viewport (bottom): positive offset (image lower)
            const offset = (scrollProgress - 0.5) * maxOffset * 2;

            // Apply transform
            aboutImage.style.transform = `translateY(${offset}px)`;
        }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    updateParallax();
}

// Initialize parallax when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
} else {
    initParallax();
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq__item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialize FAQ when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

// ===== Testimonials Typewriter Effect =====
const testimonials = [
    {
        text: "Katarzyna pomogła mi odkryć, że moja pasja do pomagania ludziom może stać się moim zawodem. Po 5 latach w księgowości zmieniłam branżę i dziś jestem Project Managerem w IT. Nie mogłam tego zrobić bez jej wsparcia!",
        name: "Anna K.",
        role: "Zmiana branży, 32 lata",
        avatar: "A"
    },
    {
        text: "Nie wiedziałem, co dalej po studiach. Konsultacje z Kasią pomogły mi zrozumieć moje mocne strony i wybrać kierunek kariery. Po 3 miesiącach dostałem pierwszą pracę w marketingu – mojej wymarzonej branży!",
        name: "Michał W.",
        role: "Absolwent, 24 lata",
        avatar: "M"
    },
    {
        text: "Po 10 latach przerwy na wychowanie dzieci bałam się wrócić na rynek pracy. Kasia przygotowała dla mnie CV i trenowała ze mną rozmowy kwalifikacyjne. Dziś pracuję jako HR Specialist i jestem bardzo szczęśliwa!",
        name: "Beata S.",
        role: "Powrót na rynek, 43 lata",
        avatar: "B"
    },
    {
        text: "Czułem wypalenie zawodowe i nie wiedziałem, czy to czas na zmianę. Konsultacja pomogła mi zrozumieć, że potrzebuję nowych wyzwań. Zmieniłem firmę, negocjując 40% podwyżkę. Najlepsza decyzja w mojej karierze!",
        name: "Tomasz L.",
        role: "Zmiana firmy, 36 lat",
        avatar: "T"
    },
    {
        text: "Testy predyspozycji pokazały mi, że mam talent do pracy z danymi. Zmieniłam ścieżkę z administracji na Data Analytics. To była rewolucja w moim życiu zawodowym. Kasia otworzyła mi oczy na mój prawdziwy potencjał!",
        name: "Joanna P.",
        role: "Przekwalifikowanie, 29 lat",
        avatar: "J"
    }
];

let currentTestimonialIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriter() {
    const textElement = document.getElementById('testimonial-text');
    const nameElement = document.getElementById('testimonial-name');
    const roleElement = document.getElementById('testimonial-role');
    const avatarElement = document.getElementById('testimonial-avatar');
    const dots = document.querySelectorAll('.testimonials__dot');

    if (!textElement) return;

    const currentTestimonial = testimonials[currentTestimonialIndex];

    if (!isDeleting && charIndex <= currentTestimonial.text.length) {
        // Typing
        textElement.textContent = currentTestimonial.text.substring(0, charIndex);
        charIndex++;
        typewriterTimeout = setTimeout(typeWriter, 30); // Speed of typing
    } else if (!isDeleting && charIndex > currentTestimonial.text.length) {
        // Finished typing, wait before deleting
        typewriterTimeout = setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 5000); // Wait 5 seconds before switching to next
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        textElement.textContent = currentTestimonial.text.substring(0, charIndex);
        charIndex--;
        typewriterTimeout = setTimeout(typeWriter, 15); // Speed of deleting (faster)
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next testimonial
        isDeleting = false;
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;

        // Update name, role, avatar
        const nextTestimonial = testimonials[currentTestimonialIndex];
        nameElement.textContent = nextTestimonial.name;
        roleElement.textContent = nextTestimonial.role;
        avatarElement.textContent = nextTestimonial.avatar;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonialIndex);
        });

        typewriterTimeout = setTimeout(typeWriter, 500); // Short pause before typing next
    }
}

function initTestimonials() {
    const dots = document.querySelectorAll('.testimonials__dot');

    // Start typewriter effect
    typeWriter();

    // Allow manual dot selection
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearTimeout(typewriterTimeout);
            currentTestimonialIndex = index;
            charIndex = 0;
            isDeleting = false;

            const textElement = document.getElementById('testimonial-text');
            const nameElement = document.getElementById('testimonial-name');
            const roleElement = document.getElementById('testimonial-role');
            const avatarElement = document.getElementById('testimonial-avatar');

            const testimonial = testimonials[index];
            textElement.textContent = '';
            nameElement.textContent = testimonial.name;
            roleElement.textContent = testimonial.role;
            avatarElement.textContent = testimonial.avatar;

            dots.forEach((d, i) => d.classList.toggle('active', i === index));

            typeWriter();
        });
    });
}

// Initialize testimonials when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
    initTestimonials();
}

// ===== Floating Widgets (Chatbot + Callback) =====
function initWidgets() {
    // Elements
    const chatBtn = document.getElementById('chat-btn');
    const chatWidget = document.getElementById('chatbot-widget');
    const chatClose = document.getElementById('chatbot-close');
    const chatBadge = document.getElementById('chat-badge');

    const callbackBtn = document.getElementById('callback-btn');
    const callbackWidget = document.getElementById('callback-widget');
    const callbackClose = document.getElementById('callback-close');
    const callbackForm = document.getElementById('callback-form');

    const chatMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');
    const quickReplies = document.querySelectorAll('.chatbot-quick-reply');

    // Chatbot knowledge base
    const chatbotKnowledge = {
        cennik: {
            response: "Oto mój cennik:\n\n💼 Konsultacja 1-1: 180 zł\n📄 Budowanie CV: 140 zł\n🎤 Przygotowanie do rozmowy: 200 zł\n📊 Testy predyspozycji: 250 zł\n\nMożesz je zamówić bezpośrednio przez stronę w sekcji Cennik! 😊",
            keywords: ['cennik', 'cena', 'ceny', 'koszt', 'ile', 'płatność', 'zapłać']
        },
        konsultacja: {
            response: "Konsultacja 1-1 to indywidualne spotkanie (60 minut) online lub stacjonarnie, podczas którego:\n\n✓ Analizujemy Twoją sytuację zawodową\n✓ Odkrywamy mocne strony i talenty\n✓ Tworzymy plan działania\n✓ Dostajesz materiały po spotkaniu\n\nMożesz umówić termin przez formularz kontaktowy! 📅",
            keywords: ['konsultacja', 'spotkanie', '1-1', 'rozmowa', 'sesja', 'coaching']
        },
        online: {
            response: "Tak! 💻 Wszystkie usługi oferuję zarówno online (Zoom, Google Meet), jak i stacjonarnie.\n\nSpotkania online są równie efektywne i wygodne, szczególnie dla osób z innych miast. Ty wybierasz formę, która Ci odpowiada! 😊",
            keywords: ['online', 'stacjonarnie', 'gdzie', 'zdalne', 'zoom', 'meet', 'video']
        },
        kontakt: {
            response: "Skontaktuj się z Kasią:\n\n📧 Email: kontakt@kasiadudek.pl\n📞 Telefon: +48 733 111 874\n⏰ Pon-Pt: 9:00 - 18:00\n\nMożesz też wypełnić formularz kontaktowy na stronie lub skorzystać z przycisku 'Oddzwonię do Ciebie' 👈",
            keywords: ['kontakt', 'telefon', 'email', 'napisać', 'zadzwonić', 'umówić']
        },
        cv: {
            response: "Profesjonalne CV to Twoja wizytówka! 📄\n\nOtrzymasz:\n✓ Nowoczesny design dopasowany do branży\n✓ Optymalizację pod systemy ATS\n✓ 2 wersje kolorystyczne\n✓ 2 korekty w cenie\n\nCzas realizacji: 3-5 dni. Cena: 140 zł",
            keywords: ['cv', 'życiorys', 'resume', 'dokument', 'aplikacja']
        },
        czas: {
            response: "Typowy czas współpracy:\n\n📅 Konsultacje: 1-2 spotkania (2-3 tygodnie)\n📄 CV: 3-5 dni roboczych\n🎤 Przygotowanie do rozmowy: 1-2 sesje\n📊 Testy: wyniki w 7 dni\n\nŁącznie: 4-8 tygodni od startu do pierwszych rozmów rekrutacyjnych! ⏱️",
            keywords: ['ile trwa', 'czas', 'kiedy', 'długo', 'szybko', 'termin']
        },
        default: {
            response: "Hmm, nie jestem pewien jak odpowiedzieć na to pytanie. 🤔\n\nNajlepiej napisz bezpośrednio do Kasi:\n📧 kontakt@kasiadudek.pl\n📞 +48 733 111 874\n\nLub kliknij przycisk 'Oddzwonię do Ciebie' i Kasia skontaktu je się z Tobą! 😊"
        }
    };

    // Toggle chatbot
    chatBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        callbackWidget.classList.remove('active');
        if (chatWidget.classList.contains('active')) {
            chatBadge.style.display = 'none';
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    // Toggle callback widget
    callbackBtn.addEventListener('click', () => {
        callbackWidget.classList.toggle('active');
        chatWidget.classList.remove('active');
    });

    callbackClose.addEventListener('click', () => {
        callbackWidget.classList.remove('active');
    });

    // Chatbot message handling
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'chatbot-message--user' : 'chatbot-message--bot'}`;

        messageDiv.innerHTML = `
            <div class="chatbot-message__avatar">${isUser ? 'U' : 'K'}</div>
            <div class="chatbot-message__content">
                <p>${text}</p>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Check knowledge base
        for (const [key, data] of Object.entries(chatbotKnowledge)) {
            if (key === 'default') continue;

            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }

        return chatbotKnowledge.default.response;
    }

    function handleUserMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 800);
    }

    // Send message
    chatSend.addEventListener('click', () => {
        handleUserMessage(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(chatInput.value);
        }
    });

    // Quick replies
    quickReplies.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.dataset.question;
            const questionText = button.textContent.trim();

            addMessage(questionText, true);

            setTimeout(() => {
                const response = chatbotKnowledge[question]?.response || chatbotKnowledge.default.response;
                addMessage(response, false);
            }, 800);
        });
    });

    // Callback form handling
    callbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(callbackForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            preferredTime: formData.get('preferred-time')
        };

        // Here you would send data to your backend
        console.log('Callback request:', data);

        // Show success message
        showNotification('Dziękuję! Oddzwonię do Ciebie jak najszybciej! 📞', 'success');

        // Close widget and reset form
        callbackWidget.classList.remove('active');
        callbackForm.reset();
    });

    // Show badge on initial load (to attract attention)
    setTimeout(() => {
        if (chatBadge) {
            chatBadge.style.display = 'flex';
        }
    }, 3000);
}

// Initialize widgets when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
} else {
    initWidgets();
}

// ===== Export for testing (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        trackEvent,
        debounce
    };
}
