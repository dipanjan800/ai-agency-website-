document.addEventListener("DOMContentLoaded", () => {
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // 1. Initialize Lucide Icons
    initIcons();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
            navbar.classList.remove("py-6");
        } else {
            navbar.classList.remove("scrolled");
            navbar.classList.add("py-6");
        }
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex");
        // Update icon based on state
        const isHidden = mobileMenu.classList.contains("hidden");
        menuBtn.innerHTML = isHidden 
            ? '<i data-lucide="menu" class="w-6 h-6"></i>' 
            : '<i data-lucide="x" class="w-6 h-6"></i>';
        initIcons();
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            initIcons();
        });
    });

    // 4. Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-up").forEach(el => {
        observer.observe(el);
    });

    // 5. FAQ Accordion
    const faqButtons = document.querySelectorAll(".faq-button");
    faqButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector(".faq-icon");
            
            // Toggle active state
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = "rotate(0deg)";
            } else {
                // Close all others first
                document.querySelectorAll(".faq-content").forEach(c => {
                    c.style.maxHeight = null;
                });
                document.querySelectorAll(".faq-icon").forEach(i => {
                    i.style.transform = "rotate(0deg)";
                });
                
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = "rotate(180deg)";
            }
        });
    });

    // 6. Word Cycler Animation
    const animatedWord = document.getElementById('animated-word');
    if (animatedWord) {
        const words = ['business', 'institute', 'clinic', 'store', 'shop'];
        let wordIndex = 0;
        let isDeleting = false;
        let text = 'business';
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                text = currentWord.substring(0, text.length - 1);
                typingSpeed = 50;
            } else {
                text = currentWord.substring(0, text.length + 1);
                typingSpeed = 100;
            }

            animatedWord.textContent = text;

            let nextTimeout = typingSpeed;

            if (!isDeleting && text === currentWord) {
                isDeleting = true;
                nextTimeout = 2000; // Pause at end of word
            } else if (isDeleting && text === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                nextTimeout = 500; // Pause before typing new word
            }

            setTimeout(type, nextTimeout);
        }

        setTimeout(type, 2000); // Start after 2s
    }
});
