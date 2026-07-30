/* ==========================================================================
   Page & Section Transitions Engine — Self-Contained Premium Module
   Namespace: pt (Page Transition)
   Features:
   1. Dynamic Main layout wrapping for 3D Perspective Scale-Back when cart is open
   2. Shared-Element Morphing modal transition for product Quick View
   3. Side Dot Navigation dynamically generated with active scroll highlights
   4. Interactive section transitions
   ========================================================================== */

(function () {
    'use strict';

    // Global state
    const ptState = {
        scrollSnapping: false,
        activeSectionId: 'home',
        isCartOpen: false,
        isModalOpen: false,
        transitioning: false
    };

    // Helper functions
    function wrapElement(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    // ────────────────────────────────────────────────────────────────────────
    // 1. Wrap Main Layout for 3D Perspective Scale-Back
    // ────────────────────────────────────────────────────────────────────────
    function initPerspectiveContainer() {
        const main = document.querySelector('main');
        if (!main) return;

        // Create the wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'pt-perspective-container';
        wrapper.id = 'pt-perspective-wrap';

        const header = document.getElementById('header');
        const footer = document.querySelector('footer');

        if (header) {
            header.parentNode.insertBefore(wrapper, header);
            wrapper.appendChild(header);
        } else {
            main.parentNode.insertBefore(wrapper, main);
        }

        wrapper.appendChild(main);

        if (footer) {
            wrapper.appendChild(footer);
        }

    }

    // ────────────────────────────────────────────────────────────────────────
    // 2. Shared-Element Modal Morph-Open Transition
    // ────────────────────────────────────────────────────────────────────────
    function initModalMorph() {
        const productModal = document.getElementById('product-modal');
        const quizModal = document.getElementById('quiz-modal');
        const modalContainer = productModal ? productModal.querySelector('.modal-container') : null;
        
        if (!productModal || !modalContainer) return;

        // Intercept clicks on Quick View buttons to execute morph
        document.body.addEventListener('click', function (e) {
            const quickBtn = e.target.closest('.btn-quickview');
            if (!quickBtn) return;

            // Find parent product card to use as start bounds
            const productCard = quickBtn.closest('.product-card') || quickBtn.closest('.ritual-step-card') || quickBtn;
            const startRect = productCard.getBoundingClientRect();

            // Store start positions on the modal for the close animation
            productModal.setAttribute('data-morph-start-left', startRect.left);
            productModal.setAttribute('data-morph-start-top', startRect.top);
            productModal.setAttribute('data-morph-start-width', startRect.width);
            productModal.setAttribute('data-morph-start-height', startRect.height);

            // Hide actual modal container momentarily to let the morph finish
            modalContainer.style.opacity = '0';
            modalContainer.style.transform = 'scale(0.92) translateY(30px)';
            modalContainer.style.transition = 'none';

            // Create morphing element
            const morpher = document.createElement('div');
            morpher.className = 'pt-morph-element';
            morpher.style.left = `${startRect.left}px`;
            morpher.style.top = `${startRect.top}px`;
            morpher.style.width = `${startRect.width}px`;
            morpher.style.height = `${startRect.height}px`;
            
            // Get card background color
            const cardStyle = window.getComputedStyle(productCard);
            morpher.style.backgroundColor = cardStyle.backgroundColor || '#FFFFFF';
            morpher.style.borderRadius = cardStyle.borderRadius || '16px';

            document.body.appendChild(morpher);

            // Trigger reflow to ensure the transition is captured by the browser
            morpher.offsetHeight;

            // Target dimensions (Modal Container size)
            // Use static fallback dimensions since modal isn't visible/rendered yet
            const targetWidth = Math.min(window.innerWidth * 0.9, 900);
            const targetHeight = Math.min(window.innerHeight * 0.85, 600);
            const targetLeft = (window.innerWidth - targetWidth) / 2;
            const targetTop = (window.innerHeight - targetHeight) / 2;

            // Expand morphing element
            morpher.style.left = `${targetLeft}px`;
            morpher.style.top = `${targetTop}px`;
            morpher.style.width = `${targetWidth}px`;
            morpher.style.height = `${targetHeight}px`;
            morpher.style.borderRadius = '24px';

            // Once the morph expansion ends, show the real modal content smoothly
            setTimeout(() => {
                modalContainer.style.transition = 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
                modalContainer.style.opacity = '1';
                modalContainer.style.transform = 'scale(1) translateY(0)';
                
                // Clean up morph element
                setTimeout(() => {
                    if (morpher.parentNode) {
                        morpher.parentNode.removeChild(morpher);
                    }
                }, 300);
            }, 650); // Matches the 0.75s transition time slightly earlier for overlap
        });

        // Smooth closing morph
        const closeTriggers = [
            document.getElementById('modal-close-btn'),
            productModal
        ];

        closeTriggers.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', function (e) {
                // If clicking overlay, ensure it was the overlay and not the modal content
                if (e.target === productModal && e.currentTarget === productModal) {
                    executeCloseMorph();
                } else if (e.currentTarget !== productModal) {
                    executeCloseMorph();
                }
            });
        });

        function executeCloseMorph() {
            const startLeft = parseFloat(productModal.getAttribute('data-morph-start-left'));
            const startTop = parseFloat(productModal.getAttribute('data-morph-start-top'));
            const startWidth = parseFloat(productModal.getAttribute('data-morph-start-width'));
            const startHeight = parseFloat(productModal.getAttribute('data-morph-start-height'));

            if (isNaN(startLeft)) return;

            // Capture current modal position
            const modalRect = modalContainer.getBoundingClientRect();

            // Hide actual modal container content instantly
            modalContainer.style.opacity = '0';
            modalContainer.style.transition = 'opacity 0.2s ease';

            // Create closing morpher
            const morpher = document.createElement('div');
            morpher.className = 'pt-morph-element';
            morpher.style.left = `${modalRect.left}px`;
            morpher.style.top = `${modalRect.top}px`;
            morpher.style.width = `${modalRect.width}px`;
            morpher.style.height = `${modalRect.height}px`;
            morpher.style.borderRadius = '24px';
            morpher.style.backgroundColor = '#FFFFFF';

            document.body.appendChild(morpher);

            // Reflow
            morpher.offsetHeight;

            // Morph back down to original card bounds
            morpher.style.left = `${startLeft}px`;
            morpher.style.top = `${startTop}px`;
            morpher.style.width = `${startWidth}px`;
            morpher.style.height = `${startHeight}px`;
            morpher.style.borderRadius = '16px';
            morpher.style.opacity = '0.3';

            setTimeout(() => {
                if (morpher.parentNode) {
                    morpher.parentNode.removeChild(morpher);
                }
                // Clear attributes
                productModal.removeAttribute('data-morph-start-left');
            }, 750);
        }
    }
    // Initialize everything on DOM ready
    // ────────────────────────────────────────────────────────────────────────
    // 
    function init() {
        document.addEventListener('DOMContentLoaded', () => {
            initPerspectiveContainer();
            initModalMorph();
        });
    }

    init();

})();
