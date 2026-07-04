/* ==========================================================================
   Ambient & Decorative Animations Engine — Self-Contained Premium Module
   Namespace: aa (Ambient Animation)
   Features:
   1. Floating Soap Bubbles inside the Hero Section with popping physics
   2. Interactive Cursor Follower and Botanical/Sparkle Trail particles
   3. Auto-highlights featured/bestseller cards with breathing glowing glow
   4. Text shimmer styling on premium gradients
   ========================================================================== */

(function () {
    'use strict';

    // Global config
    const config = {
        maxBubbles: 18,
        bubbleSpawnRate: 2000, // spawn bubble every 2s
        particleTrailDensity: 3, // spawn particle every N mousemove steps
        trailEmojiList: ['🌿', '✨', '🌸', '✨', '🍃', '🫧']
    };

    // ────────────────────────────────────────────────────────────────────────
    // 1. Soap Bubbles Generator (Hero Ambient)
    // ────────────────────────────────────────────────────────────────────────
    function initSoapBubbles() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        // Create bubble container
        const container = document.createElement('div');
        container.className = 'aa-bubble-container';
        hero.appendChild(container);

        let activeBubbles = 0;

        function spawnBubble() {
            if (activeBubbles >= config.maxBubbles) return;
            if (document.hidden) return; // Don't run in background tab

            const bubble = document.createElement('div');
            bubble.className = 'aa-bubble';

            // Randomize size between 20px and 70px
            const size = Math.random() * 50 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            // Randomize starting X position
            bubble.style.left = `${Math.random() * 100}%`;

            // Randomize animation duration (8s to 18s)
            const duration = Math.random() * 10 + 8;
            bubble.style.animationDuration = `${duration}s`;

            // Randomize sideways sway amount using custom properties
            // Custom horizontal offset
            const sway = (Math.random() - 0.5) * 150;
            bubble.style.setProperty('--sway-x', `${sway}px`);

            // Pop sound / pop particle burst helper
            function popBubble(e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                // Bubble burst physics
                const rect = bubble.getBoundingClientRect();
                createBurstParticles(rect.left + size / 2, rect.top + size / 2);

                bubble.style.transform = 'scale(1.2)';
                bubble.style.opacity = '0';
                bubble.style.pointerEvents = 'none';

                setTimeout(() => {
                    if (bubble.parentNode) {
                        bubble.parentNode.removeChild(bubble);
                    }
                    activeBubbles--;
                }, 100);
            }

            // Click or tap to pop!
            bubble.addEventListener('mousedown', popBubble);
            bubble.addEventListener('touchstart', popBubble);

            // Pop automatically when animation completes
            bubble.addEventListener('animationend', () => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                    activeBubbles--;
                }
            });

            container.appendChild(bubble);
            activeBubbles++;
        }

        // Periodically spawn bubbles
        setInterval(spawnBubble, config.bubbleSpawnRate);
        
        // Spawn a few initial bubbles immediately
        for (let i = 0; i < 5; i++) {
            setTimeout(spawnBubble, Math.random() * 4000);
        }
    }

    // Spawn tiny popping splash particles
    function createBurstParticles(x, y) {
        const count = 8;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'aa-particle';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Angle and distance to throw particle
            const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5);
            const dist = Math.random() * 40 + 20;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;

            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 2. Interactive Botanical/Sparkle Cursor Trail
    // ────────────────────────────────────────────────────────────────────────
    function initCursorTrail() {
        // Skip on touch-only mobile devices to save battery
        if (window.matchMedia('(pointer: coarse)').matches) return;

        // Create main cursor dot & outer ring
        const follower = document.createElement('div');
        follower.className = 'aa-cursor-follower';
        
        const ring = document.createElement('div');
        ring.className = 'aa-cursor-ring';

        document.body.appendChild(follower);
        document.body.appendChild(ring);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let ringX = 0, ringY = 0;

        let mouseMoved = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseMoved = true;

            // Make follower and ring visible on first move
            follower.style.opacity = '0.65';
            ring.style.opacity = '0.5';

            // Spawn trails with custom densities
            spawnTrailParticle(e.clientX, e.clientY);
        });

        document.addEventListener('mouseleave', () => {
            follower.style.opacity = '0';
            ring.style.opacity = '0';
        });

        // Click animations on cursor ring
        document.addEventListener('mousedown', () => {
            ring.style.width = '20px';
            ring.style.height = '20px';
            ring.style.borderColor = 'var(--terracotta)';
        });

        document.addEventListener('mouseup', () => {
            ring.style.width = '32px';
            ring.style.height = '32px';
            ring.style.borderColor = 'var(--sage)';
        });

        // Smooth physics-based cursor follow (lerping)
        function updateCursorPositions() {
            if (mouseMoved) {
                // Lerp follower (faster)
                followerX += (mouseX - followerX) * 0.25;
                followerY += (mouseY - followerY) * 0.25;
                follower.style.left = `${followerX}px`;
                follower.style.top = `${followerY}px`;

                // Lerp outer ring (slower lag-behind feel)
                ringX += (mouseX - ringX) * 0.12;
                ringY += (mouseY - ringY) * 0.12;
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }

            requestAnimationFrame(updateCursorPositions);
        }

        requestAnimationFrame(updateCursorPositions);

        // Spawn beautiful leaves / sparkles on move
        let steps = 0;
        function spawnTrailParticle(x, y) {
            steps++;
            if (steps % config.particleTrailDensity !== 0) return;

            const particle = document.createElement('div');
            particle.className = 'aa-particle';
            
            // Randomly choose an emoji (sparkle or leaf)
            const emoji = config.trailEmojiList[Math.floor(Math.random() * config.trailEmojiList.length)];
            particle.innerText = emoji;
            particle.style.fontFamily = 'serif';
            particle.style.fontSize = `${Math.random() * 8 + 8}px`;
            
            // Position
            particle.style.left = `${x + (Math.random() - 0.5) * 10}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 10}px`;

            // Drift variables
            const dx = (Math.random() - 0.5) * 30;
            const dy = Math.random() * 30 + 15; // float down slightly

            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);

            document.body.appendChild(particle);

            // Clean up particle
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // 3. Glowing Card & Text Auto-Highlighting
    // ────────────────────────────────────────────────────────────────────────
    function initCardHighlights() {
        // Auto-discover product cards featuring the terracotta bestseller/featured badge
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            const hasBestseller = card.querySelector('.product-badge.bestseller') || 
                                 card.querySelector('.product-badge.top-seller') ||
                                 card.innerText.includes('Best Seller') ||
                                 card.innerText.includes('Bestseller');

            if (hasBestseller) {
                card.classList.add('aa-featured-glow');
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────
    // Initialize everything on DOMContentLoaded
    // ────────────────────────────────────────────────────────────────────────
    function init() {
        document.addEventListener('DOMContentLoaded', () => {
            initSoapBubbles();
            initCursorTrail();
            initCardHighlights();
        });
    }

    init();

})();
