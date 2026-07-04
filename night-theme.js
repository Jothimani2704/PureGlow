/* ==========================================================================
   Spa-Theme Night Mode (Dark Skincare Ritual Theme) — Engine Module
   Namespace: nt (Night Theme)
   Features:
   1. Dynamic creation of premium floating Candle/Sun toggler
   2. Persists active theme choice inside LocalStorage
   3. Handles beautiful transitioning states
   ========================================================================== */

(function () {
    'use strict';

    // Check localStorage preference early to prevent layout flashes
    const savedTheme = localStorage.getItem('nt-theme-preference');
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'night' || (!savedTheme && isSystemDark)) {
        document.body.classList.add('nt-active');
    }

    // Initialize once DOM is ready
    function initNightTheme() {
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.className = 'nt-toggle-btn';
        toggle.id = 'nt-theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle Spa-Theme Night Mode');

        // Initial icon state
        updateToggleIcon(toggle, document.body.classList.contains('nt-active'));

        document.body.appendChild(toggle);

        // Click event to toggle classes
        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            // Perform elegant smooth transitions
            document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
            const mainWrap = document.getElementById('pt-perspective-wrap');
            if (mainWrap) {
                mainWrap.style.transition = 'background-color 0.8s ease, color 0.8s ease';
            }

            const isNight = document.body.classList.toggle('nt-active');
            
            // Save state
            localStorage.setItem('nt-theme-preference', isNight ? 'night' : 'day');

            // Swap icon
            updateToggleIcon(toggle, isNight);

            // Trigger minor tactile micro-flash ripple animation
            createFlashRipple(e.clientX, e.clientY, isNight);

            // Clean up transition inline styles after completion
            setTimeout(() => {
                document.body.style.transition = '';
                if (mainWrap) mainWrap.style.transition = '';
            }, 1000);
        });
    }

    // Switch between Candle and Sun SVGs dynamically
    function updateToggleIcon(btn, isNight) {
        if (isNight) {
            // Glowing Sun icon to return to Day mode
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            btn.style.backgroundColor = '#C87A53'; // warm terracotta base
            btn.style.color = '#FFFFFF';
        } else {
            // Cozy Candle / Moon spa icon to go to Night mode
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
            `;
            btn.style.backgroundColor = '#849B89'; // serene sage base
            btn.style.color = '#FFFFFF';
        }
    }

    // Creates an elegant glowing circle expanding ripple from clicked point
    function createFlashRipple(x, y, isNight) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        
        // Use soft candle light glow for night shift, and soft sage light for day shift
        const color = isNight ? 'rgba(229, 193, 88, 0.15)' : 'rgba(132, 155, 137, 0.15)';
        ripple.style.boxShadow = `0 0 80px 40px ${color}`;
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '99995';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.transition = 'all 0.8s cubic-bezier(0.1, 0.8, 0.3, 1)';
        
        document.body.appendChild(ripple);

        // Force reflow
        ripple.offsetHeight;

        // Animate
        ripple.style.width = '400px';
        ripple.style.height = '400px';
        ripple.style.opacity = '0';

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 850);
    }

    // Initialize when DOMContentLoaded triggers
    document.addEventListener('DOMContentLoaded', initNightTheme);

})();
