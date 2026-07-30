/* ==========================================================================
   PureGlow Soaps Premium JavaScript Interactions
   Smooth scroll, carousel, dynamic quick view modal, and interactive forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. Global Elements & Configs
       ---------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger-toggle');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Product Data Repository
    const productsData = {
        'aloe-vera': {
            name: 'Aloe Vera Soap',
            category: 'Soothing & Calming',
            price: '₹120',
            image: 'assets/soap_aloe_vera.png',
            desc: 'A deeply soothing and refreshing bar formulated with 100% pure organic Aloe Vera gel extracted by hand. Perfect for cooling sunburns, reducing light skin rashes, and providing oil-free hydration for a glowing complexion.',
            benefits: [
                'Deeply cools and hydrates parched skin cells',
                'Calms skin inflammation, redness, and minor rashes',
                'Natural antibacterial properties keep breakouts away',
                'Ideal for oily, sensitive, and combination skin types'
            ],
            ingredients: ['Fresh Aloe Vera Gel', 'Organic Tea Tree Essential Oil', 'Cold-Pressed Olive Oil', 'Pure Coconut Oil', 'Vitamin E']
        },
        'charcoal': {
            name: 'Charcoal Soap',
            category: 'Deep Cleansing',
            price: '₹140',
            image: 'assets/soap_charcoal.png',
            desc: 'Formulated with premium steam-activated bamboo charcoal to serve as a magnet for impurities. This purifying bar deeply cleanses clogged pores, pulls out dirt, absorbs excess sebum, and helps treat stubborn blackheads and body acne.',
            benefits: [
                'Draws out toxins, oil, and micro-particles from deep within pores',
                'Controls excessive facial oil without stripping moisture',
                'Gently exfoliates dead skin layers for a clean finish',
                'Excellent for oily, acne-prone, and active-lifestyle skin'
            ],
            ingredients: ['Activated Bamboo Charcoal', 'Peppermint Essential Oil', 'Raw Shea Butter', 'Saponified Coconut Oil', 'Castor Oil']
        },
        'turmeric': {
            name: 'Turmeric Soap',
            category: 'Deep Cleansing',
            price: '₹130',
            image: 'assets/soap_turmeric.png',
            desc: 'Infused with traditional Kasturi turmeric (wild turmeric) and natural cold-pressed oils. Rich in anti-inflammatory and antiseptic properties, it clarifies skin tone, fades dark spots, reduces pigmentation, and brings back a natural golden radiance.',
            benefits: [
                'Brightens hyperpigmentation and clears blemishes',
                'Soothes active skin infections and minor irritation',
                'Fights free radicals to delay signs of fine lines',
                'Suitable for normal, combination, and dull skin looking for glow'
            ],
            ingredients: ['Organic Kasturi Turmeric Root Extract', 'Pure Neem Oil', 'Sweet Almond Oil', 'Cold-Pressed Palm Oil', 'Orange Essential Oil']
        },
        'rose': {
            name: 'Rose Soap',
            category: 'Nourishing Hydration',
            price: '₹150',
            image: 'assets/soap_rose.png',
            desc: 'A premium moisturizing soap enriched with real Damascus rose water and rich organic butter. Designed to indulge your senses, it provides a thick, velvety lather that replenishes dry skin barriers, improves elasticity, and leaves a luxurious floral scent.',
            benefits: [
                'Provides intense hydration, leaving skin silky smooth',
                'Improves skin texture, cell regeneration, and elasticity',
                'Rich floral aromatherapy reduces stress and freshens skin',
                'Excellent for dry, normal, mature, and sensitive skin types'
            ],
            ingredients: ['Organic Damascus Rose Hydrosol', 'Pure Shea Butter', 'Golden Jojoba Oil', 'Rose Geranium Essential Oil', 'Almond Oil']
        },
        'sandal': {
            name: 'Sandal Soap',
            category: 'Nourishing Hydration',
            price: '₹160',
            image: 'assets/soap_sandal.png',
            desc: 'A true royal treat featuring rare East Indian Sandalwood (Chandan) oil and delicate strands of Kashmiri saffron. This premium bar deeply nourishes the skin, refines pores, lightens blemishes, and surrounds you with an exquisite, woody aroma that lingers.',
            benefits: [
                'Intensely hydrates skin while promoting a smooth texture',
                'Evens out skin tone and heals sun tan damage',
                'Exquisite premium fragrance acts as a natural calmative',
                'Highly recommended for dry, normal, and combination skin types'
            ],
            ingredients: ['Pure East Indian Sandalwood Essential Oil', 'Kashmiri Saffron Extract', 'Organic Goat Milk Base', 'Cold-Pressed Castor Oil', 'Raw Honey']
        },
        'herbal': {
            name: 'Herbal Soap',
            category: 'Soothing & Calming',
            price: '₹125',
            image: 'assets/soap_herbal.png',
            desc: 'An authentic Ayurvedic blend of cooling neem, refreshing basil, active camphor, and organic green herbs. This medicinal bar serves as a powerful shield against germs, relieves skin itching, fights body odor, and leaves you feeling thoroughly revitalized.',
            benefits: [
                'Provides powerful natural defense against germs and body odor',
                'Relieves itchy, dry skin and reduces minor skin allergy symptoms',
                'Delivers a refreshing herbal aromatherapy cooling sensation',
                'Perfect for everyday hygiene across all skin types'
            ],
            ingredients: ['Fresh Neem Leaf Puree', 'Holy Basil (Tulsi) Extract', 'Active Camphor Crystals', 'Avocado Butter', 'Eucalyptus Essential Oil']
        }
    };

    /* ----------------------------------------------------------------------
       2. Sticky Header & Active Link Scroll Tracking
       ---------------------------------------------------------------------- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        trackActiveSection();
    });

    function trackActiveSection() {
        const scrollPosition = window.scrollY + 200; // Offset for header
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            if (section.id) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                
                if (scrollPosition >= top && scrollPosition < top + height) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${section.id}`) {
                            item.classList.add('active');
                        }
                    });
                }
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. Mobile Navigation Controls (Hamburger Panel)
       ---------------------------------------------------------------------- */
    function openMobileMenu() {
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop scroll
    }

    function closeMobileMenu() {
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = 'auto'; // Enable scroll
    }

    hamburger.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu on overlay click
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking link items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    /* ----------------------------------------------------------------------
       4. Scroll Reveal Animations (Intersection Observer)
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once element is revealed, no need to track it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -40px 0px' // Slightly offset bottom trigger
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ----------------------------------------------------------------------
       5. Interactive Product Gallery Filter
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manage Active Button Style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset reveal styling for card transition
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Trigger soft delay to look smooth
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ----------------------------------------------------------------------
       6. Testimonials Slider Carousel (Aesthetic Transitions)
       ---------------------------------------------------------------------- */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const btnPrev = document.getElementById('slider-prev');
    const btnNext = document.getElementById('slider-next');
    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {
        // Wrap-around bounds checking
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Transition Slide Cards
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetSlideTimer();
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetSlideTimer();
    }

    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Click Indicator Dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
            resetSlideTimer();
        });
    });

    // Auto-Rotation Timer
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, 7000); // Shift review every 7 seconds
    }

    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }

    startSlideTimer();

    /* ----------------------------------------------------------------------
       7. Product Quick View (Premium Modal Injection)
       ---------------------------------------------------------------------- */
    const modal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContent = document.getElementById('modal-product-details');
    const quickViewButtons = document.querySelectorAll('.btn-quickview');

    function openQuickView(productId) {
        const product = productsData[productId];
        if (!product) return;

        // Generate ingredient HTML tags
        let ingredientsHTML = '';
        product.ingredients.forEach(ing => {
            ingredientsHTML += `<span class="ingredient-tag">${ing}</span>`;
        });

        // Generate skin benefits bullet items
        let benefitsHTML = '';
        product.benefits.forEach(ben => {
            benefitsHTML += `<li>${ben}</li>`;
        });

        // Inject Dynamic Layout
        modalContent.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="modal-image">
                </div>
                <div class="modal-info">
                    <span class="modal-category font-alt">${product.category}</span>
                    <h3 class="modal-name">${product.name}</h3>
                    <div class="modal-price-row">
                        <span class="modal-price">${product.price}</span>
                        <span class="price-unit">/ 100g bar</span>
                    </div>
                    <div class="modal-divider"></div>
                    
                    <h4 class="modal-section-title">Product Description</h4>
                    <p class="modal-desc">${product.desc}</p>
                    
                    <h4 class="modal-section-title">Key Skin Benefits</h4>
                    <ul class="modal-benefits">
                        ${benefitsHTML}
                    </ul>
                    
                    <h4 class="modal-section-title">Natural Ingredients</h4>
                    <div class="modal-ingredients">
                        ${ingredientsHTML}
                    </div>
                    
                    <button class="btn btn-primary btn-modal-add-to-cart" data-product="${productId}">
                        <span>Add to Bag</span>
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('open');
        document.body.classList.add('modal-active');
        document.documentElement.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Add to Bag behavior inside modal
        const modalAddBtn = modalContent.querySelector('.btn-modal-add-to-cart');
        modalAddBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.classList.remove('modal-active');
            document.documentElement.classList.remove('modal-active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            addToCart(productId);
        });
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-active');
        document.documentElement.classList.remove('modal-active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product');
            openQuickView(productId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Enquire Button Event (Scrolls directly down to contact form and fills it out)
    const enquireButtons = document.querySelectorAll('.btn-enquire');
    enquireButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const soapName = btn.getAttribute('data-product-name');
            navigateToContactWithProduct(soapName);
        });
    });

    function navigateToContactWithProduct(productName) {
        const contactSection = document.getElementById('contact');
        const subjectInput = document.getElementById('contact-subject');
        const msgInput = document.getElementById('contact-msg');
        
        if (subjectInput && msgInput) {
            subjectInput.value = `Bulk Inquiry: ${productName}`;
            msgInput.value = `Hi PureGlow Soaps, I would like to get more information, detailed pricing, and delivery timelines for ordering the ${productName}. Thank you!`;
            
            // Focus visual styling
            subjectInput.parentElement.classList.add('focused');
        }
        
        // Smooth scroll to Contact block
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    /* ----------------------------------------------------------------------
       8. Interactive Wholesale B2B Form & Sliders
       ---------------------------------------------------------------------- */
    const bulkSlider = document.getElementById('bulk-qty');
    const qtyDisplay = document.getElementById('qty-val');
    const bulkForm = document.getElementById('bulk-order-form');
    const bulkSuccessOverlay = document.getElementById('bulk-success-message');
    const bulkSuccessResetBtn = document.getElementById('bulk-success-reset');

    if (bulkSlider && qtyDisplay) {
        bulkSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            qtyDisplay.textContent = `${val} units`;
        });
    }

    if (bulkForm) {
        bulkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate submit button loader state
            const btn = document.getElementById('bulk-submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<span>Processing Request...</span> <span class="badge-dot" style="margin-left:8px;"></span>`;
            btn.disabled = true;

            setTimeout(() => {
                // Show Gorgeous Success Popup inside container
                bulkSuccessOverlay.classList.add('show');
                
                // Clear inputs
                bulkForm.reset();
                if (qtyDisplay) qtyDisplay.textContent = '250 units';
                
                // Restore button
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1500); // 1.5 second custom simulated database write delay
        });
    }

    if (bulkSuccessResetBtn) {
        bulkSuccessResetBtn.addEventListener('click', () => {
            bulkSuccessOverlay.classList.remove('show');
        });
    }

    /* ----------------------------------------------------------------------
       9. Interactive Contact Inquiry Form
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-query-form');
    const contactSuccessOverlay = document.getElementById('contact-success-message');
    const contactSuccessResetBtn = document.getElementById('contact-success-reset');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = document.getElementById('contact-submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<span>Sending Message...</span> <span class="badge-dot" style="margin-left:8px;"></span>`;
            btn.disabled = true;

            // Get contact form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-msg').value;

            // Construct structured message for WhatsApp
            let waMsg = `🌿 *New Message from PureGlow Soaps Website*\n\n`;
            waMsg += `*Full Name:* ${name}\n`;
            waMsg += `*Email Address:* ${email}\n`;
            waMsg += `*Subject:* ${subject}\n\n`;
            waMsg += `*Message:*\n${message}`;

            const encodedMsg = encodeURIComponent(waMsg);
            const whatsappUrl = `https://wa.me/919585279836?text=${encodedMsg}`;

            setTimeout(() => {
                // Open WhatsApp in new window/tab
                window.open(whatsappUrl, '_blank');

                contactSuccessOverlay.classList.add('show');
                contactForm.reset();
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 1000);
        });
    }

    if (contactSuccessResetBtn) {
        contactSuccessResetBtn.addEventListener('click', () => {
            contactSuccessOverlay.classList.remove('show');
        });
    }

    /* ----------------------------------------------------------------------
       10. Footer Newsletter Form Handler
       ---------------------------------------------------------------------- */
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');

    if (newsletterForm && newsletterStatus) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            
            newsletterStatus.textContent = 'Registering email...';
            newsletterStatus.className = 'newsletter-msg';
            
            setTimeout(() => {
                newsletterStatus.textContent = 'Subscribed successfully! Check your inbox for updates.';
                newsletterStatus.classList.add('success');
                emailInput.value = '';
                
                // Remove success label after 5 seconds
                setTimeout(() => {
                    newsletterStatus.textContent = '';
                }, 5000);
            }, 1000);
        });
    }

    /* ----------------------------------------------------------------------
       11. Skincare FAQ Accordion Toggling
       ---------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other open FAQ items first (accordion effect)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.faq-content');
                    otherContent.style.maxHeight = '0';
                    otherContent.style.opacity = '0';
                    otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                // Calculate actual dynamic scroll height of content
                content.style.maxHeight = `${content.scrollHeight}px`;
                content.style.opacity = '1';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ----------------------------------------------------------------------
       12. Dynamic Geolocation Routing for Directions
       ---------------------------------------------------------------------- */
    const directionsBtn = document.querySelector('.btn-map-directions');
    
    if (directionsBtn && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                // Rewrite Get Directions link to navigate from user coordinates to Vellore HQ
                directionsBtn.setAttribute(
                    'href', 
                    `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=Kaspa,+Vellore,+Tamil+Nadu,+India`
                );
            },
            (error) => {
                // Fallback gracefully (already handled by default href)
                console.log('Geolocation permission denied or not available. Using default routing.');
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    /* ----------------------------------------------------------------------
       13. Premium Interactive Skincare Quiz Controller
       ---------------------------------------------------------------------- */
    const quizModal = document.getElementById('quiz-modal');
    const quizStartBtn = document.getElementById('quiz-start-btn');
    const quizCloseBtn = document.getElementById('quiz-close-btn');
    const btnQuizBegin = document.getElementById('btn-quiz-begin');
    const quizProgressContainer = document.getElementById('quiz-progress-bar-container');
    const quizCurrentStepSpan = document.getElementById('quiz-current-step');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    
    const quizSlides = {
        welcome: document.getElementById('quiz-slide-welcome'),
        q1: document.getElementById('quiz-slide-q1'),
        q2: document.getElementById('quiz-slide-q2'),
        q3: document.getElementById('quiz-slide-q3'),
        result: document.getElementById('quiz-slide-result')
    };

    let quizAnswers = {
        skinType: '',
        concern: '',
        fragrance: ''
    };

    function openQuiz() {
        resetQuiz();
        quizModal.classList.add('open');
        document.body.classList.add('modal-active');
        document.documentElement.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    function closeQuiz() {
        quizModal.classList.remove('open');
        document.body.classList.remove('modal-active');
        document.documentElement.classList.remove('modal-active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    function resetQuiz() {
        quizAnswers = { skinType: '', concern: '', fragrance: '' };
        
        // Hide progress
        quizProgressContainer.style.display = 'none';
        
        // De-select option cards
        document.querySelectorAll('.quiz-option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Activate welcome slide, hide others
        Object.keys(quizSlides).forEach(key => {
            quizSlides[key].classList.remove('active');
        });
        quizSlides.welcome.classList.add('active');
    }

    if (quizStartBtn) quizStartBtn.addEventListener('click', openQuiz);
    if (quizCloseBtn) quizCloseBtn.addEventListener('click', closeQuiz);
    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) closeQuiz();
    });

    if (btnQuizBegin) {
        btnQuizBegin.addEventListener('click', () => {
            quizSlides.welcome.classList.remove('active');
            quizSlides.q1.classList.add('active');
            
            // Show progress bar
            quizProgressContainer.style.display = 'block';
            updateQuizProgress(1);
        });
    }

    function updateQuizProgress(step) {
        quizCurrentStepSpan.textContent = step;
        const fillPercent = (step / 3) * 100;
        quizProgressFill.style.width = `${fillPercent}%`;
    }

    // Slide Option Selection triggers auto-advancing
    const q1Cards = quizSlides.q1.querySelectorAll('.quiz-option-card');
    const q2Cards = quizSlides.q2.querySelectorAll('.quiz-option-card');
    const q3Cards = quizSlides.q3.querySelectorAll('.quiz-option-card');

    q1Cards.forEach(card => {
        card.addEventListener('click', () => {
            q1Cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            quizAnswers.skinType = card.getAttribute('data-val');
            
            // Wait 400ms for hover check animation, then slide to Q2
            setTimeout(() => {
                quizSlides.q1.classList.remove('active');
                quizSlides.q2.classList.add('active');
                updateQuizProgress(2);
            }, 400);
        });
    });

    q2Cards.forEach(card => {
        card.addEventListener('click', () => {
            q2Cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            quizAnswers.concern = card.getAttribute('data-val');
            
            setTimeout(() => {
                quizSlides.q2.classList.remove('active');
                quizSlides.q3.classList.add('active');
                updateQuizProgress(3);
            }, 400);
        });
    });

    q3Cards.forEach(card => {
        card.addEventListener('click', () => {
            q3Cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            quizAnswers.fragrance = card.getAttribute('data-val');
            
            setTimeout(() => {
                quizSlides.q3.classList.remove('active');
                quizSlides.result.classList.add('active');
                quizProgressContainer.style.display = 'none'; // Hide progress
                calculateQuizResult();
            }, 400);
        });
    });

    function calculateQuizResult() {
        let recommendedSoapId = 'aloe-vera'; // Default fallback
        let customReason = '';

        const type = quizAnswers.skinType;
        const concern = quizAnswers.concern;
        const fragrance = quizAnswers.fragrance;

        // Smart Skincare Diagnostic Logic
        if (type === 'oily') {
            if (concern === 'acne' || fragrance === 'fresh' || fragrance === 'herbal') {
                recommendedSoapId = 'charcoal';
                customReason = 'Because you have oily skin and want deep pore acne control, our charcoal soap uses bamboo activated carbon to extract toxins and excessive grease without drying out skin layers.';
            } else {
                recommendedSoapId = 'herbal';
                customReason = 'To regulate oil production while providing organic antibacterial defense, this meditated green herbal blend with active neem and camphor is your ultimate hygiene shield.';
            }
        } 
        else if (type === 'dry') {
            if (fragrance === 'floral' || concern === 'dryness') {
                recommendedSoapId = 'rose';
                customReason = 'For dry skin levels needing buttery soft rehydration, this rose petals bar is formulated with raw shea butter and Damascus hydrosols to lock in rich, continuous hydration.';
            } else {
                recommendedSoapId = 'sandal';
                customReason = 'To soothe dryness while repairing dullness, this royal Sandalwood blend enriched with organic saffron and raw honey feeds your dry cells deep nourishing proteins.';
            }
        } 
        else if (type === 'sensitive' || concern === 'redness') {
            if (fragrance === 'herbal') {
                recommendedSoapId = 'herbal';
                customReason = 'To calm inflamed skin cells while fighting microbial irritations, this holistic herbal neem and camphor bar acts as a protective, calming botanical blanket.';
            } else {
                recommendedSoapId = 'aloe-vera';
                customReason = 'For highly reactive or baby-soft sensitive skin types, this cooling Aloe Vera bar infused with fresh hand-extracted gel and teatree oil provides hypoallergenic, anti-inflammatory comfort.';
            }
        } 
        else if (concern === 'glow' || type === 'normal') {
            if (fragrance === 'wood') {
                recommendedSoapId = 'sandal';
                customReason = 'To bring out a high-gloss polished complexion while nourishing normal skin boundaries, this East Indian Sandalwood and Kashmiri saffron blend promotes a premium resort spa feel.';
            } else {
                recommendedSoapId = 'turmeric';
                customReason = 'To combat dark spots and bring out a golden radiance, our Turmeric soap features Kasturi wild turmeric roots and neem extracts to actively brighten, clarify, and balance tone.';
            }
        }

        const product = productsData[recommendedSoapId];
        if (!product) return;

        // Inject Recommendation card HTML
        quizSlides.result.innerHTML = `
            <div class="quiz-result-box">
                <div class="section-center" style="margin-bottom:2.5rem;">
                    <span class="section-tag font-alt">Your Skin Consultation Result</span>
                    <h3 class="section-title" style="font-size:2.25rem;">Meet Your Perfect Soap Match</h3>
                </div>
                
                <div class="quiz-result-grid">
                    <div class="quiz-result-img-box">
                        <img src="${product.image}" alt="${product.name}" class="quiz-result-img">
                    </div>
                    <div class="quiz-result-info">
                        <span class="quiz-result-tag font-alt">${product.category}</span>
                        <h4 class="quiz-result-title">${product.name}</h4>
                        <div class="quiz-result-price-row">
                            <span class="quiz-result-price">${product.price}</span>
                            <span class="price-unit">/ 100g bar</span>
                        </div>
                        <div class="quiz-result-divider"></div>
                        
                        <div class="quiz-result-why-box">
                            <p class="quiz-result-why-text"><strong>Consultant Note:</strong> ${customReason}</p>
                        </div>
                        
                        <p class="quiz-result-desc">${product.desc.substring(0, 160)}...</p>
                        
                        <div class="quiz-result-actions">
                            <button class="btn btn-secondary btn-result-action" id="btn-quiz-details" data-product="${recommendedSoapId}">Product Details</button>
                            <button class="btn btn-primary btn-result-action" id="btn-quiz-add-to-cart" data-product="${recommendedSoapId}">Add to Bag</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Result slide button event listeners
        const btnDetails = document.getElementById('btn-quiz-details');
        const btnAddToCart = document.getElementById('btn-quiz-add-to-cart');

        if (btnDetails) {
            btnDetails.addEventListener('click', () => {
                closeQuiz();
                // Call existing product quick-view modal handler!
                openQuickView(recommendedSoapId);
            });
        }

        if (btnAddToCart) {
            btnAddToCart.addEventListener('click', () => {
                closeQuiz();
                addToCart(recommendedSoapId);
            });
        }
    }

    /* ----------------------------------------------------------------------
       14. Interactive Shopping Cart Controller (E-Commerce Simulation)
       ---------------------------------------------------------------------- */
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const cartDrawerCloseBtn = document.getElementById('cart-drawer-close-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartDrawerFooter = document.getElementById('cart-drawer-footer');
    const cartSubtotalVal = document.getElementById('cart-subtotal-val');
    const cartBadgeCount = document.getElementById('cart-badge-count');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
    const cartCheckoutBtnSticky = document.getElementById('cart-checkout-btn-sticky');
    const cartShippingMsg = document.getElementById('cart-shipping-msg');

    // Cart state initialized from localStorage
    let cart = JSON.parse(localStorage.getItem('pureglow_cart')) || [];
    let appliedPromo = localStorage.getItem('pureglow_promo') || null;
    let giftState = JSON.parse(localStorage.getItem('pureglow_gift')) || {
        active: false,
        theme: 'sage',
        to: '',
        from: '',
        wishes: ''
    };

    // Helper: Parse currency strings to numbers
    function getPriceNumber(priceStr) {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    }

    // Toggle drawer open
    function openCart() {
        if (cartDrawerOverlay) {
            cartDrawerOverlay.classList.add('open');
            document.body.classList.add('cart-active');
            document.documentElement.classList.add('cart-active');
            document.body.style.overflow = 'hidden'; // Stop main body scroll
            document.documentElement.style.overflow = 'hidden';
        }
    }

    // Toggle drawer closed
    function closeCart() {
        if (cartDrawerOverlay) {
            cartDrawerOverlay.classList.remove('open');
            document.body.classList.remove('cart-active');
            document.documentElement.classList.remove('cart-active');
            // Only restore scroll if no other fullscreen overlay is active
            const isModalOpen = document.getElementById('product-modal').classList.contains('open');
            const isQuizOpen = document.getElementById('quiz-modal').classList.contains('open');
            if (!isModalOpen && !isQuizOpen) {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }
    }

    // Add event listeners to drawer toggle triggers
    if (cartIconBtn) cartIconBtn.addEventListener('click', openCart);
    if (cartDrawerCloseBtn) cartDrawerCloseBtn.addEventListener('click', closeCart);
    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener('click', (e) => {
            if (e.target === cartDrawerOverlay) {
                closeCart();
            }
        });
    }

    // Persist cart array and re-render
    function saveCart() {
        localStorage.setItem('pureglow_cart', JSON.stringify(cart));
        updateBadgeCount();
        renderCart();
    }

    // Render cart items or empty state
    function renderCart() {
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            // Hide footer + checkout bar
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
            const _checkoutBar = document.getElementById('cart-checkout-bar');
            if (_checkoutBar) _checkoutBar.style.display = 'none';

            // Show Botanical Empty State
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <div class="cart-empty-icon-box">
                        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    <h4 class="cart-empty-title font-alt">Your Bag is Empty</h4>
                    <p class="cart-empty-desc">Explore our botanical artisan collection and pick your favorite skin matches!</p>
                    <button class="btn btn-secondary btn-sm" id="cart-continue-shopping-btn" style="margin-top: 1rem; width: auto; padding: 0.75rem 1.5rem;">Explore Products</button>
                </div>
            `;

            // Continue Shopping click event
            const contBtn = document.getElementById('cart-continue-shopping-btn');
            if (contBtn) {
                contBtn.addEventListener('click', () => {
                    closeCart();
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
            return;
        }

        // Render Active Cart Items — show summary panel + sticky checkout bar
        if (cartDrawerFooter) cartDrawerFooter.style.display = 'flex';
        const cartCheckoutBar = document.getElementById('cart-checkout-bar');
        if (cartCheckoutBar) cartCheckoutBar.style.display = 'block';

        let cartHTML = '';
        let subtotal = 0;

        cart.forEach((item) => {
            const product = productsData[item.id];
            if (!product) return;

            const unitPrice = getPriceNumber(product.price);
            const itemSubtotal = unitPrice * item.qty;
            subtotal += itemSubtotal;

            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <!-- Full-bleed image column -->
                    <div class="cart-item-img-col">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                    </div>
                    <!-- Details column -->
                    <div class="cart-item-details">
                        <div>
                            <div class="cart-item-name">${product.name}</div>
                            <span class="cart-item-price">${product.price.replace('₹', '<span class="currency-symbol">₹</span>')} / bar</span>
                        </div>
                        <div class="cart-item-actions">
                            <div class="cart-qty-controls">
                                <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                                <span class="cart-item-qty">${item.qty}</span>
                                <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
                            </div>
                            <span class="cart-item-subtotal"><span class="currency-symbol">₹</span>${itemSubtotal}</span>
                        </div>
                    </div>
                    <!-- Remove button -->
                    <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;

        // Update subtotal val
        if (cartSubtotalVal) {
            cartSubtotalVal.innerHTML = `<span class="currency-symbol">₹</span>${subtotal}`;
        }

        // Calculate Discount
        let discount = 0;
        const discountRow = document.getElementById('cart-discount-row');
        const discountVal = document.getElementById('cart-discount-val');
        
        if (appliedPromo) {
            if (appliedPromo === 'GLOW10') {
                discount = Math.round(subtotal * 0.1);
            } else if (appliedPromo === 'PURE20') {
                discount = Math.round(subtotal * 0.2);
            }
            
            if (discountRow && discountVal) {
                discountRow.style.display = 'flex';
                discountVal.innerHTML = `-<span class="currency-symbol">₹</span>${discount}`;
            }
        } else {
            if (discountRow) {
                discountRow.style.display = 'none';
            }
        }

        // Calculate Shipping
        let shipping = 50; // default flat rate
        const threshold = 500;
        if (subtotal >= threshold || appliedPromo === 'FREESHIP') {
            shipping = 0;
        }

        const shippingVal = document.getElementById('cart-shipping-val');
        if (shippingVal) {
            shippingVal.innerHTML = shipping === 0 ? 'FREE' : `<span class="currency-symbol">₹</span>${shipping}`;
        }

        // Calculate Final Total
        let finalTotal = Math.max(0, subtotal - discount + shipping);
        const totalVal = document.getElementById('cart-total-val');
        if (totalVal) {
            totalVal.innerHTML = `<span class="currency-symbol">₹</span>${finalTotal}`;
        }

        // Elegant Dynamic shipping progress indicator
        if (cartShippingMsg) {
            if (appliedPromo === 'FREESHIP') {
                cartShippingMsg.innerHTML = `<span style="color: var(--color-primary-sage);">🎉 Coupon FREESHIP Applied: Free Delivery in Vellore!</span>`;
            } else if (subtotal >= threshold) {
                cartShippingMsg.innerHTML = `<span style="color: var(--color-primary-sage);">🎉 You qualify for Free Delivery in Vellore!</span>`;
            } else {
                const needed = threshold - subtotal;
                cartShippingMsg.innerHTML = `Add <strong><span class="currency-symbol">₹</span>${needed}</strong> more for Free Delivery in Vellore!`;
            }
        }

        // Render applied coupon tag capsule
        const tagBox = document.getElementById('cart-applied-coupon-tag-box');
        if (tagBox) {
            if (appliedPromo) {
                let ruleDesc = '';
                if (appliedPromo === 'GLOW10') ruleDesc = '10% OFF';
                else if (appliedPromo === 'PURE20') ruleDesc = '20% OFF (VIP)';
                else if (appliedPromo === 'FREESHIP') ruleDesc = 'Free Shipping';
                
                tagBox.innerHTML = `
                    <div class="cart-coupon-tag font-alt">
                        <span>🏷️ ${appliedPromo} (${ruleDesc})</span>
                        <span class="coupon-remove-btn" id="coupon-remove-action" aria-label="Remove coupon">&times;</span>
                    </div>
                `;
                
                // Add listener to remove coupon
                const removeAction = document.getElementById('coupon-remove-action');
                if (removeAction) {
                    removeAction.addEventListener('click', removePromoCode);
                }
            } else {
                tagBox.innerHTML = '';
            }
        }

        // Attach listeners for inner cart buttons
        const decButtons = cartItemsContainer.querySelectorAll('.dec-btn');
        const incButtons = cartItemsContainer.querySelectorAll('.inc-btn');
        const removeButtons = cartItemsContainer.querySelectorAll('.cart-item-remove');

        decButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateQuantity(id, -1);
            });
        });

        incButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateQuantity(id, 1);
            });
        });

        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                removeFromCart(id);
            });
        });

        // Sync gift card panel UI elements
        syncGiftCardUI();
    }

    // Modify Quantity
    function updateQuantity(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart();
    }

    // Remove direct item with fade out
    function removeFromCart(productId) {
        const itemRow = cartItemsContainer.querySelector(`.cart-item[data-id="${productId}"]`);
        if (itemRow) {
            itemRow.style.opacity = '0';
            itemRow.style.transform = 'translateX(50px)';
            itemRow.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                cart = cart.filter(i => i.id !== productId);
                saveCart();
            }, 300);
        } else {
            cart = cart.filter(i => i.id !== productId);
            saveCart();
        }
    }

    // Add item to cart
    function addToCart(productId) {
        const product = productsData[productId];
        if (!product) return;

        const existingItem = cart.find(i => i.id === productId);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }

        saveCart();

        // Bounce notification badge count to draw attention
        if (cartBadgeCount) {
            cartBadgeCount.classList.remove('badge-pop');
            void cartBadgeCount.offsetWidth; // Trigger reflow to restart animation
            cartBadgeCount.classList.add('badge-pop');
        }

        // Auto open cart slideout to showcase success
        setTimeout(() => {
            openCart();
        }, 300);
    }

    // Update Badge display
    function updateBadgeCount() {
        if (!cartBadgeCount) return;
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadgeCount.textContent = totalItems;
    }

    // Intercept clicks on 'Add to Bag' buttons in products gallery
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.btn-add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            const productId = addToCartBtn.getAttribute('data-product');
            if (productId) {
                addToCart(productId);
            }
        }
    });

    // Shared checkout action function
    function triggerWhatsAppCheckout() {
        if (cart.length === 0) return;

        let invoiceText = `🌟 *PureGlow Soaps - New Order Request* 🌟\n`;
        invoiceText += `----------------------------------------\n`;
        invoiceText += `Hello PureGlow Soaps, I would like to place an order for the following natural artisan soaps:\n\n`;

        let subtotal = 0;
        cart.forEach((item, index) => {
            const product = productsData[item.id];
            if (!product) return;
            const unitPrice = getPriceNumber(product.price);
            const itemSubtotal = unitPrice * item.qty;
            subtotal += itemSubtotal;
            invoiceText += `*${index + 1}. ${product.name}* x ${item.qty} (₹${itemSubtotal})\n`;
        });

        let discount = 0;
        if (appliedPromo) {
            if (appliedPromo === 'GLOW10') discount = Math.round(subtotal * 0.1);
            else if (appliedPromo === 'PURE20') discount = Math.round(subtotal * 0.2);
        }

        let shipping = 50;
        if (subtotal >= 500 || appliedPromo === 'FREESHIP') shipping = 0;

        let finalTotal = Math.max(0, subtotal - discount + shipping);

        invoiceText += `\n----------------------------------------\n`;
        invoiceText += `*Subtotal:* ₹${subtotal}\n`;
        if (appliedPromo) invoiceText += `*Coupon Discount (${appliedPromo}):* -₹${discount}\n`;
        invoiceText += `*Shipping:* ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n`;
        invoiceText += `*Grand Total:* ₹${finalTotal}\n\n`;

        if (giftState.active) {
            let themeIcon = '🌿';
            if (giftState.theme === 'rose') themeIcon = '🌸';
            else if (giftState.theme === 'saffron') themeIcon = '🌟';
            invoiceText += `🎁 *Personalized Gift Card Included* 🎁\n`;
            invoiceText += `*Theme:* ${giftState.theme.charAt(0).toUpperCase() + giftState.theme.slice(1)} Card ${themeIcon}\n`;
            invoiceText += `*To:* ${giftState.to.trim() !== '' ? giftState.to : '[Recipient name]'}\n`;
            invoiceText += `*From:* ${giftState.from.trim() !== '' ? giftState.from : '[Sender name]'}\n`;
            invoiceText += `*Wishes:* "${giftState.wishes.trim() !== '' ? giftState.wishes : 'Write your warm wishes here...'}"\n\n`;
        }

        invoiceText += `*Delivery Address:* [Please write your full delivery address here]\n\n`;
        invoiceText += `Thank you! Please let me know the payment and delivery details.`;

        const encodedMsg = encodeURIComponent(invoiceText);
        const whatsappUrl = `https://wa.me/919585279836?text=${encodedMsg}`;
        window.open(whatsappUrl, '_blank');
    }

    // Wire BOTH checkout buttons to the same handler
    if (cartCheckoutBtn) cartCheckoutBtn.addEventListener('click', triggerWhatsAppCheckout);
    if (cartCheckoutBtnSticky) cartCheckoutBtnSticky.addEventListener('click', triggerWhatsAppCheckout);


    // Initial setup on DOMContentLoaded
    updateBadgeCount();
    renderCart();

    /* ----------------------------------------------------------------------
       15. Aesthetic Floating WhatsApp Assistant Controller
       ---------------------------------------------------------------------- */
    const assistantTrigger = document.getElementById('assistant-trigger-btn');
    const assistantTooltip = document.getElementById('assistant-tooltip');
    const tooltipClose = document.getElementById('tooltip-close-btn');
    const assistantCard = document.getElementById('assistant-chat-card');
    const assistantCardClose = document.getElementById('assistant-card-close-btn');
    
    // Quick Tap Buttons
    const tapQuiz = document.getElementById('assistant-tap-quiz');
    const tapBulk = document.getElementById('assistant-tap-bulk');
    const tapMap = document.getElementById('assistant-tap-map');
    const assistantDirectConnect = document.getElementById('assistant-direct-connect-btn');

    // Toggle Chat Card Open
    function openAssistant() {
        if (assistantCard) {
            assistantCard.classList.add('open');
            if (assistantTooltip) {
                assistantTooltip.classList.remove('show');
            }
        }
    }

    // Toggle Chat Card Closed
    function closeAssistant() {
        if (assistantCard) {
            assistantCard.classList.remove('open');
        }
    }

    // Trigger Button Click
    if (assistantTrigger) {
        assistantTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (assistantCard && assistantCard.classList.contains('open')) {
                closeAssistant();
            } else {
                openAssistant();
            }
        });
    }

    // Close Button Click
    if (assistantCardClose) {
        assistantCardClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAssistant();
        });
    }

    // Close on clicking outside the assistant card
    document.addEventListener('click', (e) => {
        if (assistantCard && assistantCard.classList.contains('open')) {
            const container = document.getElementById('whatsapp-assistant-container');
            if (container && !container.contains(e.target)) {
                closeAssistant();
            }
        }
    });

    // Close tooltip bubble
    if (tooltipClose) {
        tooltipClose.addEventListener('click', (e) => {
            e.stopPropagation();
            if (assistantTooltip) {
                assistantTooltip.classList.remove('show');
            }
        });
    }

    // 3-second Delay: Show soft notification speech tooltip above the trigger
    setTimeout(() => {
        if (assistantTooltip && assistantCard && !assistantCard.classList.contains('open')) {
            assistantTooltip.classList.add('show');
            
            // Auto dismiss tooltip after 8 seconds
            setTimeout(() => {
                if (assistantTooltip) {
                    assistantTooltip.classList.remove('show');
                }
            }, 8000);
        }
    }, 3000);

    // Quick Tap 1: Find Skincare Match (Triggers Diagnostic Quiz Modal)
    if (tapQuiz) {
        tapQuiz.addEventListener('click', () => {
            closeAssistant();
            if (typeof openQuiz === 'function') {
                openQuiz();
            }
        });
    }

    // Quick Tap 2: B2B Wholesale Enquiry (Scrolls to B2B Form)
    if (tapBulk) {
        tapBulk.addEventListener('click', () => {
            closeAssistant();
            const bulkSection = document.getElementById('bulk');
            if (bulkSection) {
                bulkSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Quick Tap 3: Store Directions (Scrolls to Location Map)
    if (tapMap) {
        tapMap.addEventListener('click', () => {
            closeAssistant();
            const mapSection = document.getElementById('contact');
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Direct Connect WhatsApp Chat
    if (assistantDirectConnect) {
        assistantDirectConnect.addEventListener('click', () => {
            const customQuery = `Hi PureGlow Soaps! 🌿 I am browsing your artisan collection and have a question about your natural handmade soaps.`;
            const encodedQuery = encodeURIComponent(customQuery);
            const directUrl = `https://wa.me/919585279836?text=${encodedQuery}`;
            window.open(directUrl, '_blank');
        });
    }

    /* ----------------------------------------------------------------------
       16. Promo Code & Coupon Engine Actions
       ---------------------------------------------------------------------- */
    // Promo Code Application logic
    function applyPromoCode(code) {
        const cleanCode = code.trim().toUpperCase();
        const statusMsg = document.getElementById('cart-promo-status-msg');
        const promoInput = document.getElementById('cart-promo-input-field');

        if (!statusMsg) return;

        if (cleanCode === '') {
            statusMsg.innerHTML = `<div class="promo-status-msg error">Please enter a promo code.</div>`;
            return;
        }

        const validCodes = ['GLOW10', 'PURE20', 'FREESHIP'];

        if (validCodes.includes(cleanCode)) {
            appliedPromo = cleanCode;
            localStorage.setItem('pureglow_promo', appliedPromo);
            
            statusMsg.innerHTML = `<div class="promo-status-msg success">🎉 Promo code "${cleanCode}" applied successfully!</div>`;
            if (promoInput) promoInput.value = '';
            
            // Re-render to show discounts
            renderCart();

            // Clear success message after 4 seconds
            setTimeout(() => {
                if (statusMsg) statusMsg.innerHTML = '';
            }, 4000);
        } else {
            statusMsg.innerHTML = `<div class="promo-status-msg error">❌ Invalid promo code. Please try again.</div>`;
            
            // Clear error message after 4 seconds
            setTimeout(() => {
                if (statusMsg) statusMsg.innerHTML = '';
            }, 4000);
        }
    }

    // Remove applied promo code
    function removePromoCode() {
        appliedPromo = null;
        localStorage.removeItem('pureglow_promo');
        
        const statusMsg = document.getElementById('cart-promo-status-msg');
        if (statusMsg) {
            statusMsg.innerHTML = `<div class="promo-status-msg success">Coupon removed.</div>`;
            setTimeout(() => {
                if (statusMsg) statusMsg.innerHTML = '';
            }, 3000);
        }
        
        renderCart();
    }

    // Attach listener for Promo Code Apply Button
    document.addEventListener('click', (e) => {
        if (e.target.id === 'btn-promo-apply-action') {
            e.preventDefault();
            const inputField = document.getElementById('cart-promo-input-field');
            if (inputField) {
                applyPromoCode(inputField.value);
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.id === 'cart-promo-input-field' && e.key === 'Enter') {
            e.preventDefault();
            applyPromoCode(e.target.value);
        }
    });

    /* ----------------------------------------------------------------------
       17. Personalized Botanical Gift Card Actions
       ---------------------------------------------------------------------- */
    // Sync UI states with giftState variable
    function syncGiftCardUI() {
        const giftToggle = document.getElementById('cart-gift-toggle');
        const customizerForm = document.getElementById('cart-gift-customizer-form');
        const toInput = document.getElementById('gift-to-input');
        const fromInput = document.getElementById('gift-from-input');
        const msgInput = document.getElementById('gift-msg-input');
        const previewTo = document.getElementById('preview-to-label');
        const previewFrom = document.getElementById('preview-from-label');
        const previewMsg = document.getElementById('preview-msg-label');
        const previewCard = document.getElementById('cart-gift-card-preview');
        const previewIcon = document.getElementById('preview-botanical-icon');

        if (!giftToggle) return;

        giftToggle.checked = giftState.active;
        if (giftState.active) {
            if (customizerForm) customizerForm.classList.add('expanded');
        } else {
            if (customizerForm) customizerForm.classList.remove('expanded');
        }

        if (toInput) toInput.value = giftState.to;
        if (fromInput) fromInput.value = giftState.from;
        if (msgInput) msgInput.value = giftState.wishes;

        if (previewTo) {
            previewTo.textContent = giftState.to.trim() !== '' ? `To: ${giftState.to}` : 'To: [Recipient name]';
        }
        if (previewFrom) {
            previewFrom.textContent = giftState.from.trim() !== '' ? `— From: ${giftState.from}` : '— From: [Sender name]';
        }
        if (previewMsg) {
            previewMsg.textContent = giftState.wishes.trim() !== '' ? `"${giftState.wishes}"` : '"Write your warm wishes here..."';
        }

        const chips = document.querySelectorAll('.theme-chip');
        chips.forEach(chip => {
            const theme = chip.getAttribute('data-theme');
            if (theme === giftState.theme) {
                chip.classList.add('active');
                chip.style.backgroundColor = 'rgba(78, 101, 81, 0.06)';
                chip.style.borderColor = 'var(--color-primary-sage)';
                chip.style.color = 'var(--color-primary-sage)';
                chip.style.fontWeight = '700';
            } else {
                chip.classList.remove('active');
                chip.style.backgroundColor = 'var(--color-cream-bg)';
                chip.style.borderColor = 'var(--color-sand)';
                chip.style.color = 'var(--color-charcoal-light)';
                chip.style.fontWeight = '600';
            }
        });

        if (previewCard) {
            previewCard.className = `gift-card-preview-mock theme-${giftState.theme}`;
        }
        if (previewIcon) {
            if (giftState.theme === 'sage') previewIcon.textContent = '🌿';
            else if (giftState.theme === 'rose') previewIcon.textContent = '🌸';
            else if (giftState.theme === 'saffron') previewIcon.textContent = '🌟';
        }
    }

    // Save gift card details to localStorage
    function saveGiftState() {
        localStorage.setItem('pureglow_gift', JSON.stringify(giftState));
        syncGiftCardUI();
    }

    // Event listener: Checkbox toggle click
    document.addEventListener('change', (e) => {
        if (e.target.id === 'cart-gift-toggle') {
            giftState.active = e.target.checked;
            saveGiftState();
        }
    });

    // Event listeners: Text inputs keyup
    document.addEventListener('input', (e) => {
        if (e.target.id === 'gift-to-input') {
            giftState.to = e.target.value;
            saveGiftState();
        }
        if (e.target.id === 'gift-from-input') {
            giftState.from = e.target.value;
            saveGiftState();
        }
        if (e.target.id === 'gift-msg-input') {
            giftState.wishes = e.target.value;
            saveGiftState();
        }
    });

    // Event listener: Theme selector chips click
    document.addEventListener('click', (e) => {
        const themeBtn = e.target.closest('.theme-chip');
        if (themeBtn) {
            e.preventDefault();
            const theme = themeBtn.getAttribute('data-theme');
            if (theme) {
                giftState.theme = theme;
                saveGiftState();
            }
        }
    });

    /* ----------------------------------------------------------------------
       18. Soap Lifespan Calculator Controller
       ---------------------------------------------------------------------- */
    const calcUsersSlider = document.getElementById('calc-users-slider');
    const calcFreqSlider = document.getElementById('calc-freq-slider');
    const calcPreserveSelect = document.getElementById('calc-preserve-select');
    
    const calcUsersVal = document.getElementById('calc-users-val');
    const calcFreqVal = document.getElementById('calc-freq-val');
    const calcLifespanDays = document.getElementById('calc-lifespan-days');
    const calcTargetDate = document.getElementById('calc-target-date');
    const calcAdvisorQuote = document.getElementById('calc-advisor-quote');

    function calculateLifespan() {
        if (!calcUsersSlider || !calcFreqSlider || !calcPreserveSelect) return;

        const users = parseInt(calcUsersSlider.value, 10);
        const freq = parseInt(calcFreqSlider.value, 10);
        const preservation = calcPreserveSelect.value;

        // Update Slider Visual Badges
        if (calcUsersVal) {
            calcUsersVal.textContent = users === 1 ? '1 Person' : `${users} People`;
            // Trigger quick pop animation
            calcUsersVal.classList.remove('pop');
            void calcUsersVal.offsetWidth;
            calcUsersVal.classList.add('pop');
        }

        if (calcFreqVal) {
            let freqText = '';
            if (freq === 1) freqText = 'Once / Day';
            else if (freq === 2) freqText = 'Twice / Day';
            else if (freq === 3) freqText = '3 Times / Day';
            else freqText = '4+ Times / Day';
            
            calcFreqVal.textContent = freqText;
            calcFreqVal.classList.remove('pop');
            void calcFreqVal.offsetWidth;
            calcFreqVal.classList.add('pop');
        }

        // Mathematical Lifespan Model
        // Standard 100g PureGlow bar provides ~130 lathers (uses)
        const dailyUses = users * freq;
        let multiplier = 1.0;
        let quoteText = '';

        if (preservation === 'saving-deck') {
            multiplier = 1.5;
            quoteText = '🪵 Excellent choice! Elevating your bar keeps it dry, which extends the lifespan of organic oils by 50%!';
        } else if (preservation === 'half-bar') {
            multiplier = 1.3;
            quoteText = '🔪 Smart strategy! Using only half a bar at a time reduces the surface area exposed to moisture, giving you a 30% longevity boost!';
        } else {
            multiplier = 1.0;
            quoteText = '🌿 Standard dishes collect water, melting the soap faster. We recommend an artisan wooden deck to dry the bar between lathers!';
        }

        const days = Math.round((130 * multiplier) / dailyUses);

        // Update Advisor Quote
        if (calcAdvisorQuote) {
            calcAdvisorQuote.textContent = quoteText;
        }

        // Animate days counting transition nicely
        if (calcLifespanDays) {
            const currentVal = parseInt(calcLifespanDays.textContent, 10) || 0;
            animateDaysCount(currentVal, days);
        }

        // Calculate Future Run-Out Target Date
        const runOutDate = new Date();
        runOutDate.setDate(runOutDate.getDate() + days);
        
        if (calcTargetDate) {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            calcTargetDate.textContent = runOutDate.toLocaleDateString('en-US', options);
        }
    }

    function animateDaysCount(start, end) {
        if (!calcLifespanDays) return;
        
        // Add popping scale to numerical result
        calcLifespanDays.classList.remove('pop');
        void calcLifespanDays.offsetWidth;
        calcLifespanDays.classList.add('pop');

        if (start === end) {
            calcLifespanDays.textContent = end;
            return;
        }

        const duration = 400; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const val = Math.round(start + (end - start) * easeProgress);
            
            calcLifespanDays.textContent = val;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                calcLifespanDays.textContent = end;
                // Remove pop class after animation completes
                setTimeout(() => {
                    calcLifespanDays.classList.remove('pop');
                }, 100);
            }
        }

        requestAnimationFrame(update);
    }

    // Attach listeners
    if (calcUsersSlider) {
        calcUsersSlider.addEventListener('input', calculateLifespan);
    }
    if (calcFreqSlider) {
        calcFreqSlider.addEventListener('input', calculateLifespan);
    }
    if (calcPreserveSelect) {
        calcPreserveSelect.addEventListener('change', calculateLifespan);
    }

    // Initial population on load
    calculateLifespan();
});
