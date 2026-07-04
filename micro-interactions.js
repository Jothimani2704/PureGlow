/* ==========================================================================
   Micro-Interactions Engine — Self-Contained Module
   ──────────────────────────────────────────────────
   100% standalone. Auto-discovers elements and attaches interactions.
   Does NOT modify any existing app.js logic or event listeners.
   ========================================================================== */

(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ══════════════════════════════════════════════
       1. MAGNETIC BUTTON
       CTA buttons subtly follow cursor within ~12px
       ══════════════════════════════════════════════ */
    function initMagneticButtons() {
        if (prefersReduced) return;

        const selectors = [
            '.btn-primary',
            '.btn-secondary',
            '.btn-primary-sm',
            '.btn-secondary-sm',
            '.btn-quiz-trigger',
            '.btn-add-to-cart',
            '.btn-quickview'
        ];

        const buttons = document.querySelectorAll(selectors.join(', '));

        buttons.forEach(btn => {
            if (btn.classList.contains('mi-magnetic')) return;
            btn.classList.add('mi-magnetic');

            const maxShift = 8; // max pixels

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                const tx = deltaX * maxShift;
                const ty = deltaY * maxShift;

                btn.style.transform = `translate(${tx}px, ${ty}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }


    /* ══════════════════════════════════════════════
       2. RIPPLE CLICK EFFECT
       Material-design expanding circle from click point
       ══════════════════════════════════════════════ */
    function initRippleEffect() {
        if (prefersReduced) return;

        const selectors = [
            '.btn-primary',
            '.btn-secondary',
            '.btn-primary-sm',
            '.btn-secondary-sm',
            '.filter-btn',
            '.btn-quiz-trigger',
            '.btn-add-to-cart',
            '.btn-quickview',
            '.faq-trigger',
            '.qty-btn'
        ];

        const elements = document.querySelectorAll(selectors.join(', '));

        elements.forEach(el => {
            if (el.classList.contains('mi-ripple-host')) return;
            el.classList.add('mi-ripple-host');

            el.addEventListener('click', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const size = Math.max(rect.width, rect.height);

                const ripple = document.createElement('span');
                ripple.className = 'mi-ripple';

                // Use dark ripple on light backgrounds
                const bgColor = getComputedStyle(el).backgroundColor;
                if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent' ||
                    bgColor.includes('250') || bgColor.includes('255') || bgColor.includes('239')) {
                    ripple.classList.add('mi-ripple-dark');
                }

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (x - size / 2) + 'px';
                ripple.style.top = (y - size / 2) + 'px';

                el.appendChild(ripple);

                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }


    /* ══════════════════════════════════════════════
       3. CARD TILT (3D Perspective)
       Product cards tilt following cursor position
       ══════════════════════════════════════════════ */
    function initCardTilt() {
        if (prefersReduced) return;

        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            if (card.classList.contains('mi-tilt')) return;
            card.classList.add('mi-tilt');

            // Add gloss overlay
            const gloss = document.createElement('div');
            gloss.className = 'mi-tilt-gloss';
            card.style.position = 'relative';
            card.appendChild(gloss);

            const maxRotation = 6; // degrees

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                const rotateY = deltaX * maxRotation;
                const rotateX = -deltaY * maxRotation;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Move gloss to follow cursor
                const glossX = ((e.clientX - rect.left) / rect.width) * 100;
                const glossY = ((e.clientY - rect.top) / rect.height) * 100;
                gloss.style.setProperty('--mi-gloss-x', glossX + '%');
                gloss.style.setProperty('--mi-gloss-y', glossY + '%');
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }


    /* ══════════════════════════════════════════════
       4. IMAGE COLOR BLOOM
       Product images start desaturated, bloom on hover
       ══════════════════════════════════════════════ */
    function initImageBloom() {
        if (prefersReduced) return;

        const imageBoxes = document.querySelectorAll('.product-img-box');

        imageBoxes.forEach(box => {
            if (box.classList.contains('mi-bloom')) return;
            box.classList.add('mi-bloom');
            box.style.position = 'relative';
        });

        // Also apply to Instagram grid items
        const instaItems = document.querySelectorAll('.insta-item');
        instaItems.forEach(item => {
            if (item.classList.contains('mi-bloom')) return;
            item.classList.add('mi-bloom');
            item.style.position = 'relative';
        });
    }


    /* ══════════════════════════════════════════════
       5. PRICE TAG FLIP
       Price values do a 3D Y-axis flip on hover
       ══════════════════════════════════════════════ */
    function initPriceFlip() {
        if (prefersReduced) return;

        const priceVals = document.querySelectorAll('.price-val');

        priceVals.forEach(el => {
            if (el.classList.contains('mi-price-processed')) return;
            el.classList.add('mi-price-processed');

            // Wrap in flip container
            const wrapper = document.createElement('span');
            wrapper.className = 'mi-price-flip';

            const inner = document.createElement('span');
            inner.className = 'mi-price-inner';
            inner.innerHTML = el.innerHTML;

            el.innerHTML = '';
            el.appendChild(wrapper);
            wrapper.appendChild(inner);
        });
    }


    /* ══════════════════════════════════════════════
       6. ADD-TO-CART PARTICLE BURST
       Botanical particles explode on "Add to Bag" click
       + miniature icon flies to cart badge
       ══════════════════════════════════════════════ */
    function initParticleBurst() {
        if (prefersReduced) return;

        const botanicalEmojis = ['🌿', '🍃', '✨', '🌸', '🌱', '💫', '🪻', '☘️'];

        // Use event delegation so it works for all add-to-cart buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add-to-cart');
            if (!btn) return;

            const rect = btn.getBoundingClientRect();
            const originX = rect.left + rect.width / 2;
            const originY = rect.top + rect.height / 2;

            // ── Spawn particles ──
            const particleCount = 12;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.className = 'mi-particle';
                particle.textContent = botanicalEmojis[Math.floor(Math.random() * botanicalEmojis.length)];

                // Random trajectory
                const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.5 - 0.25);
                const distance = 40 + Math.random() * 70;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance - 30; // bias upward
                const rot = (Math.random() * 360 - 180);
                const dur = 0.6 + Math.random() * 0.5;

                particle.style.left = originX + 'px';
                particle.style.top = originY + 'px';
                particle.style.setProperty('--mi-tx', tx + 'px');
                particle.style.setProperty('--mi-ty', ty + 'px');
                particle.style.setProperty('--mi-rot', rot + 'deg');
                particle.style.setProperty('--mi-dur', dur + 's');
                particle.style.fontSize = (12 + Math.random() * 8) + 'px';

                document.body.appendChild(particle);
                particle.addEventListener('animationend', () => particle.remove());
            }

            // ── Fly soap icon to cart badge ──
            const cartBadge = document.getElementById('cart-badge-count');
            if (cartBadge) {
                const badgeRect = cartBadge.getBoundingClientRect();
                const flyIcon = document.createElement('span');
                flyIcon.className = 'mi-fly-to-cart';
                flyIcon.textContent = '🧼';
                flyIcon.style.left = originX + 'px';
                flyIcon.style.top = originY + 'px';

                // Calculate midpoint and endpoint relative to origin
                const endX = badgeRect.left + badgeRect.width / 2 - originX;
                const endY = badgeRect.top + badgeRect.height / 2 - originY;
                const midX = endX * 0.4;
                const midY = endY - 80; // arc above

                flyIcon.style.setProperty('--mi-fly-mx', midX + 'px');
                flyIcon.style.setProperty('--mi-fly-my', midY + 'px');
                flyIcon.style.setProperty('--mi-fly-ex', endX + 'px');
                flyIcon.style.setProperty('--mi-fly-ey', endY + 'px');

                document.body.appendChild(flyIcon);

                // Pulse the badge when icon arrives
                flyIcon.addEventListener('animationend', () => {
                    flyIcon.remove();
                    cartBadge.style.transform = 'scale(1.5)';
                    cartBadge.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    setTimeout(() => {
                        cartBadge.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        });
    }


    /* ══════════════════════════════════════════════
       7. NAV LINK UNDERLINE GROW
       Navigation links get growing underline
       ══════════════════════════════════════════════ */
    function initNavUnderline() {
        if (prefersReduced) return;

        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            if (link.classList.contains('mi-nav-underline')) return;
            link.classList.add('mi-nav-underline');
        });

        // Mobile nav links too
        const mobileLinks = document.querySelectorAll('.mobile-nav-item');
        mobileLinks.forEach(link => {
            if (link.classList.contains('mi-nav-underline')) return;
            link.classList.add('mi-nav-underline');
        });
    }


    /* ══════════════════════════════════════════════
       8. BUTTON GLOW EFFECT
       CTA buttons get a glow aura on hover
       ══════════════════════════════════════════════ */
    function initButtonGlow() {
        if (prefersReduced) return;

        const primaryBtns = document.querySelectorAll('.btn-primary, .btn-primary-sm');
        primaryBtns.forEach(btn => {
            if (btn.classList.contains('mi-btn-glow')) return;
            btn.classList.add('mi-btn-glow');
        });
    }


    /* ══════════════════════════════════════════════
       9. ICON SPIN ON CARD HOVER
       Why-Us icons rotate gently when card is hovered
       ══════════════════════════════════════════════ */
    function initIconSpin() {
        if (prefersReduced) return;

        // Why-Us cards
        const whyCards = document.querySelectorAll('.why-card');
        whyCards.forEach(card => {
            if (card.classList.contains('mi-icon-spin-trigger')) return;
            card.classList.add('mi-icon-spin-trigger');

            const iconContainer = card.querySelector('.why-icon-container');
            if (iconContainer) {
                iconContainer.classList.add('mi-icon-spin');
            }
        });

        // Care cards
        const careCards = document.querySelectorAll('.care-card');
        careCards.forEach(card => {
            if (card.classList.contains('mi-icon-spin-trigger')) return;
            card.classList.add('mi-icon-spin-trigger');

            const iconBox = card.querySelector('.care-icon-box');
            if (iconBox) {
                iconBox.classList.add('mi-icon-spin');
            }
        });

        // About feature items
        const aboutFeats = document.querySelectorAll('.about-feat-item');
        aboutFeats.forEach(item => {
            if (item.classList.contains('mi-icon-spin-trigger')) return;
            item.classList.add('mi-icon-spin-trigger');

            const iconBox = item.querySelector('.feat-icon-box');
            if (iconBox) {
                iconBox.classList.add('mi-icon-spin');
            }
        });
    }


    /* ══════════════════════════════════════════════
       10. HOVER LIFT ON CARDS
       Cards float upward with enhanced shadow
       ══════════════════════════════════════════════ */
    function initHoverLift() {
        if (prefersReduced) return;

        const liftTargets = document.querySelectorAll('.why-card, .care-card, .faq-item, .testimonial-card');
        liftTargets.forEach(el => {
            if (el.classList.contains('mi-hover-lift')) return;
            el.classList.add('mi-hover-lift');
        });
    }


    /* ══════════════════════════════════════════════
       11. BADGE PULSE
       Product badges get a subtle pulsing ring
       ══════════════════════════════════════════════ */
    function initBadgePulse() {
        if (prefersReduced) return;

        const badges = document.querySelectorAll('.product-badge');
        badges.forEach(badge => {
            if (badge.classList.contains('mi-badge-pulse')) return;
            badge.classList.add('mi-badge-pulse');
        });
    }


    /* ══════════════════════════════════════════════
       12. ENHANCED FOCUS RINGS
       Better keyboard focus indicators
       ══════════════════════════════════════════════ */
    function initFocusRings() {
        const focusTargets = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
        focusTargets.forEach(el => {
            if (el.classList.contains('mi-focus-ring')) return;
            el.classList.add('mi-focus-ring');
        });
    }


    /* ══════════════════════════════════════════════
       BOOT: Initialize all micro-interactions
       ══════════════════════════════════════════════ */
    function boot() {
        initMagneticButtons();
        initRippleEffect();
        initCardTilt();
        initImageBloom();
        initPriceFlip();
        initParticleBurst();
        initNavUnderline();
        initButtonGlow();
        initIconSpin();
        initHoverLift();
        initBadgePulse();
        initFocusRings();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
