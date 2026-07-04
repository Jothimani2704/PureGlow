/* ==========================================================================
   Scroll Animations Engine — Self-Contained Module
   ──────────────────────────────────────────────────
   This file is 100% standalone. It:
     1. Auto-discovers elements and applies [data-sa] animations
     2. Adds staggered delays to sibling groups
     3. Splits headings into word-by-word animated spans
     4. Animates stat counters that roll up from 0
     5. Creates a scroll progress bar
     6. DOES NOT modify any existing .reveal classes or app.js logic.
   ========================================================================== */

(function () {
    'use strict';

    // Bail out for users who prefer reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ──────────────────────────────────────────────
       UTILITY: Throttle
       ────────────────────────────────────────────── */
    function throttle(fn, wait) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= wait) {
                last = now;
                fn.apply(this, args);
            }
        };
    }

    /* ══════════════════════════════════════════════
       1. AUTO-APPLY [data-sa] ATTRIBUTES TO ELEMENTS
       ══════════════════════════════════════════════ */
    function autoApplyAttributes() {

        // ── Product Cards: staggered fade-up ──
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, i) => {
            if (!card.hasAttribute('data-sa')) {
                card.setAttribute('data-sa', 'fade-up');
                card.setAttribute('data-sa-delay', String(i % 6));
            }
        });

        // ── Why-Us Cards: scale-pop ──
        const whyCards = document.querySelectorAll('.why-card');
        whyCards.forEach((card, i) => {
            if (!card.hasAttribute('data-sa')) {
                card.setAttribute('data-sa', 'scale-pop');
                card.setAttribute('data-sa-delay', String(i));
            }
        });

        // ── About Feature Items: slide-left ──
        const aboutFeats = document.querySelectorAll('.about-feat-item');
        aboutFeats.forEach((item, i) => {
            if (!item.hasAttribute('data-sa')) {
                item.setAttribute('data-sa', 'slide-left');
                item.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Ritual Step Items: fade-up staggered ──
        const ritualSteps = document.querySelectorAll('.ritual-step-item');
        ritualSteps.forEach((step, i) => {
            if (!step.hasAttribute('data-sa')) {
                step.setAttribute('data-sa', 'fade-up');
                step.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Care Cards: scale-pop staggered ──
        const careCards = document.querySelectorAll('.care-card');
        careCards.forEach((card, i) => {
            if (!card.hasAttribute('data-sa')) {
                card.setAttribute('data-sa', 'scale-pop');
                card.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── FAQ Items: fade-up staggered ──
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, i) => {
            if (!item.hasAttribute('data-sa')) {
                item.setAttribute('data-sa', 'fade-up');
                item.setAttribute('data-sa-delay', String(i));
            }
        });

        // ── Instagram Grid Items: zoom-in staggered ──
        const instaItems = document.querySelectorAll('.insta-item');
        instaItems.forEach((item, i) => {
            if (!item.hasAttribute('data-sa')) {
                item.setAttribute('data-sa', 'zoom-in');
                item.setAttribute('data-sa-delay', String(i));
            }
        });

        // ── Testimonial Card: flip-up ──
        const testCards = document.querySelectorAll('.testimonial-card');
        testCards.forEach(card => {
            if (!card.hasAttribute('data-sa')) {
                card.setAttribute('data-sa', 'flip-up');
            }
        });

        // ── Bulk List Items: slide-left staggered ──
        const bulkItems = document.querySelectorAll('.bulk-list li');
        bulkItems.forEach((item, i) => {
            if (!item.hasAttribute('data-sa')) {
                item.setAttribute('data-sa', 'slide-left');
                item.setAttribute('data-sa-delay', String(i));
            }
        });

        // ── Perk Boxes: scale-pop staggered ──
        const perkBoxes = document.querySelectorAll('.perk-box');
        perkBoxes.forEach((box, i) => {
            if (!box.hasAttribute('data-sa')) {
                box.setAttribute('data-sa', 'scale-pop');
                box.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Section Tags: tag-slide ──
        const sectionTags = document.querySelectorAll('.section-tag');
        sectionTags.forEach(tag => {
            if (!tag.hasAttribute('data-sa')) {
                tag.setAttribute('data-sa', 'tag-slide');
            }
        });

        // ── Filter Buttons: fade-up staggered ──
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach((btn, i) => {
            if (!btn.hasAttribute('data-sa')) {
                btn.setAttribute('data-sa', 'fade-up');
                btn.setAttribute('data-sa-delay', String(i));
            }
        });

        // ── Hero Trust Metrics: fade-up staggered ──
        const metrics = document.querySelectorAll('.metric');
        metrics.forEach((m, i) => {
            if (!m.hasAttribute('data-sa')) {
                m.setAttribute('data-sa', 'fade-up');
                m.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Footer Columns: fade-up staggered ──
        const footerCols = document.querySelectorAll('.footer-col');
        footerCols.forEach((col, i) => {
            if (!col.hasAttribute('data-sa')) {
                col.setAttribute('data-sa', 'fade-up');
                col.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Quiz Banner: fade-up ──
        const quizBanner = document.querySelector('.quiz-trigger-banner');
        if (quizBanner && !quizBanner.hasAttribute('data-sa')) {
            quizBanner.setAttribute('data-sa', 'fade-up');
        }

        // ── Contact Info Blocks: slide-left ──
        const contactBlocks = document.querySelectorAll('.contact-info-block');
        contactBlocks.forEach((block, i) => {
            if (!block.hasAttribute('data-sa')) {
                block.setAttribute('data-sa', 'slide-left');
                block.setAttribute('data-sa-delay', String(i * 2));
            }
        });

        // ── Lifespan Calculator Block: zoom-in ──
        const lifespanBlock = document.querySelector('.lifespan-calc-block');
        if (lifespanBlock && !lifespanBlock.hasAttribute('data-sa')) {
            lifespanBlock.setAttribute('data-sa', 'zoom-in');
        }
    }


    /* ══════════════════════════════════════════════
       2. INTERSECTION OBSERVER FOR [data-sa] ELEMENTS
       ══════════════════════════════════════════════ */
    function initScrollObserver() {
        const saElements = document.querySelectorAll('[data-sa]');

        if (prefersReduced) {
            // Instantly show everything
            saElements.forEach(el => el.classList.add('sa-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('sa-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        saElements.forEach(el => observer.observe(el));
    }


    /* ══════════════════════════════════════════════
       3. HEADING WORD STAGGER ANIMATION
       ══════════════════════════════════════════════ */
    function initHeadingStagger() {
        if (prefersReduced) return;

        const headings = document.querySelectorAll('.section-title');

        headings.forEach(heading => {
            // Skip if already processed
            if (heading.classList.contains('sa-heading-processed')) return;
            heading.classList.add('sa-heading-processed');

            const originalText = heading.innerHTML;
            // Split into words, preserving HTML tags like <span>
            const words = heading.textContent.trim().split(/\s+/);

            // Build word-spans
            let wordIndex = 0;
            const wrappedHTML = originalText.replace(/(\S+)/g, (match) => {
                const delay = wordIndex * 0.06;
                wordIndex++;
                return `<span class="sa-word" style="transition-delay: ${delay}s">${match}</span>`;
            });

            heading.innerHTML = wrappedHTML;

            // Observe heading entry
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        heading.classList.add('sa-heading-active');
                        observer.unobserve(heading);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(heading);
        });
    }


    /* ══════════════════════════════════════════════
       4. COUNTER ROLL-UP ANIMATION
       ══════════════════════════════════════════════ */
    function initCounterRollUp() {
        if (prefersReduced) return;

        const counterTargets = document.querySelectorAll('.metric-num, .perk-num');

        counterTargets.forEach(el => {
            if (el.classList.contains('sa-counter-processed')) return;
            el.classList.add('sa-counter-processed');

            const originalText = el.textContent.trim();

            // Extract numeric value and suffix
            const match = originalText.match(/^([\d,.]+)(\+|%|★| ★)?$/);
            if (!match) return; // Skip non-numeric content like "Custom" or "Fast"

            const targetNum = parseFloat(match[1].replace(/,/g, ''));
            const suffix = match[2] || '';
            const hasDecimal = match[1].includes('.');
            const decimalPlaces = hasDecimal ? match[1].split('.')[1].length : 0;

            // Store original for reset
            el.setAttribute('data-sa-counter-target', String(targetNum));
            el.setAttribute('data-sa-counter-suffix', suffix);
            el.setAttribute('data-sa-counter-decimals', String(decimalPlaces));

            // Set initial display
            el.textContent = hasDecimal ? '0.' + '0'.repeat(decimalPlaces) : '0';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(el, targetNum, suffix, decimalPlaces);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(el);
        });
    }

    function animateCounter(el, target, suffix, decimals) {
        const duration = 1800; // ms
        const startTime = performance.now();

        el.classList.add('sa-counter-active', 'sa-counter-glow');

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (decimals > 0) {
                el.textContent = current.toFixed(decimals) + suffix;
            } else {
                el.textContent = Math.round(current).toLocaleString() + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Final exact value
                if (decimals > 0) {
                    el.textContent = target.toFixed(decimals) + suffix;
                } else {
                    el.textContent = target.toLocaleString() + suffix;
                }
                // Remove glow after a moment
                setTimeout(() => el.classList.remove('sa-counter-glow'), 600);
            }
        }

        requestAnimationFrame(update);
    }


    /* ══════════════════════════════════════════════
       5. SCROLL PROGRESS BAR
       ══════════════════════════════════════════════ */
    function initScrollProgress() {
        if (prefersReduced) return;

        // Create the progress bar element
        const bar = document.createElement('div');
        bar.className = 'sa-scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);

        function updateProgress() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }

        window.addEventListener('scroll', throttle(updateProgress, 16), { passive: true });
        updateProgress(); // initial call
    }


    /* ══════════════════════════════════════════════
       6. SECTION DIVIDER DRAW-ON LINES
       ══════════════════════════════════════════════ */
    function initDrawOnLines() {
        if (prefersReduced) return;

        // Find horizontal rule / divider elements and add draw-on
        const dividers = document.querySelectorAll('.metric-divider');
        dividers.forEach(div => {
            if (div.classList.contains('sa-line-draw')) return;
            div.classList.add('sa-line-draw');

            // Replace with SVG line
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '20');
            svg.setAttribute('viewBox', '0 0 2 20');
            svg.setAttribute('preserveAspectRatio', 'none');

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '1');
            line.setAttribute('y1', '0');
            line.setAttribute('x2', '1');
            line.setAttribute('y2', '20');
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('opacity', '0.3');

            svg.appendChild(line);
            div.innerHTML = '';
            div.appendChild(svg);

            // Observe
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        div.classList.add('sa-visible');
                        observer.unobserve(div);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(div);
        });
    }


    /* ══════════════════════════════════════════════
       BOOT: Initialize everything on DOMContentLoaded
       ══════════════════════════════════════════════ */
    function boot() {
        autoApplyAttributes();       // Step 1: tag elements with data-sa
        initScrollObserver();         // Step 2: observe [data-sa] elements
        initHeadingStagger();         // Step 3: word-by-word section titles
        initCounterRollUp();          // Step 4: stat number counters
        initScrollProgress();         // Step 5: top progress bar
        initDrawOnLines();            // Step 6: SVG line dividers
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        // DOM already loaded (e.g. script loaded with defer)
        boot();
    }
})();
