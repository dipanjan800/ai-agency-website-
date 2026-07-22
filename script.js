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

    // 7. Industry & Sub-Category Dynamic Dropdowns
    const industrySelect = document.getElementById("industry-select");
    const subcategorySelect = document.getElementById("subcategory-select");

    const subcategoryData = {
        business: [
            "General Business",
            "E-Commerce & Retail",
            "Real Estate & Construction",
            "Finance & Banking",
            "IT Services & Agency",
            "Manufacturing & Logistics"
        ],
        brand: [
            "Fashion & Apparel",
            "Beauty & Cosmetics",
            "Food & Beverage",
            "Luxury & Lifestyle",
            "Media & Entertainment"
        ],
        institute: [
            "School (K-12)",
            "College & University",
            "Coaching & EdTech",
            "Research Center",
            "Training Academy"
        ],
        shop: [
            "Retail Store",
            "Grocery Shop",
            "Electronics & Gadgets",
            "Fashion Boutique",
            "Specialty & Craft Shop"
        ],
        clinic: [
            "Allopathic / General Clinic",
            "Homeopathic Clinic",
            "Dental Clinic",
            "Dermatology & Skincare",
            "Eye Care / Ophthalmology",
            "Ayurvedic & Wellness Center"
        ],
        club: [
            "Sports & Fitness Club",
            "Gym & Health Club",
            "Nightclub & Lounge",
            "Social & Country Club"
        ],
        portfolio: [
            "Software Developer / Engineer",
            "UI/UX & Graphic Designer",
            "Content Creator / Influencer",
            "Executive / Founder",
            "Consultant & Coach"
        ]
    };

    if (industrySelect && subcategorySelect) {
        industrySelect.addEventListener("change", (e) => {
            const selectedIndustry = e.target.value;
            const subcategories = subcategoryData[selectedIndustry] || [];

            // Clear previous subcategory options
            subcategorySelect.innerHTML = '<option value="" disabled selected class="bg-gray-900 text-gray-400">Select Sub-Category</option>';

            if (subcategories.length > 0) {
                subcategories.forEach(sub => {
                    const opt = document.createElement("option");
                    opt.value = sub.toLowerCase().replace(/[^a-z0-9]/g, "-");
                    opt.textContent = sub;
                    opt.className = "bg-gray-900 text-white";
                    subcategorySelect.appendChild(opt);
                });
                subcategorySelect.disabled = false;
                subcategorySelect.classList.remove("opacity-60", "cursor-not-allowed");
            } else {
                subcategorySelect.disabled = true;
                subcategorySelect.classList.add("opacity-60", "cursor-not-allowed");
            }
        });
    }

    // 8. Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
                scrollToTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
            } else {
                scrollToTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
                scrollToTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
