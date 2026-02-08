// ================================
// LANDING PAGE REVEAL
// ================================

function initLandingPage() {
    const landingOverlay = document.getElementById('landingOverlay');
    const landingEnterBtn = document.getElementById('landingEnterBtn');
    
    if (landingEnterBtn && landingOverlay) {
        landingEnterBtn.addEventListener('click', () => {
            // Add dramatic reveal animation
            landingEnterBtn.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                landingOverlay.classList.add('hidden');
                
                // Optional: Start background music
                const bgMusic = document.getElementById('bgMusic');
                if (bgMusic) {
                    bgMusic.play().catch(err => {
                        console.log('Audio autoplay prevented:', err);
                    });
                }
                
                // Trigger confetti effect
                createEntranceConfetti();
            }, 300);
        });
    }
}

// ================================
// ENTRANCE CONFETTI EFFECT
// ================================

function createEntranceConfetti() {
    const colors = ['#d4af6a', '#e8b4b8', '#f5d4d7', '#c9a961'];
    const confettiCount = 100;
    const container = document.createElement('div');
    
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 99998;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        const size = Math.random() * 10 + 5;
        
        confetti.style.cssText = `
            position: absolute;
            left: ${startX}%;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: 0.8;
            animation: confettiFall ${duration}s ${delay}s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        container.appendChild(confetti);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                top: 100vh;
                transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(container);
        document.head.removeChild(style);
    }, 5000);
}

// ================================
// GIFT BOX INTERACTIONS
// ================================

function initGiftBoxes() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    giftBoxes.forEach(box => {
        const wrapper = box.querySelector('.gift-wrapper');
        
        wrapper.addEventListener('click', () => {
            if (!box.classList.contains('opened')) {
                // Open animation
                box.classList.add('opened');
                
                // Play celebratory effect
                createGiftConfetti(box);
                
                // Optional: Play a sound
                playGiftSound();
            } else {
                // Close animation
                box.classList.remove('opened');
            }
        });
    });
}

// ================================
// GIFT CONFETTI EFFECT
// ================================

function createGiftConfetti(giftBox) {
    const rect = giftBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);
    
    const emojis = ['✨', '💖', '💝', '🎊', '🎉', '⭐', '💕'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 150 + 100;
        
        particle.textContent = emoji;
        particle.style.cssText = `
            position: absolute;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${Math.random() * 20 + 20}px;
            pointer-events: none;
            animation: giftExplode 1.5s ease-out forwards;
            --angle: ${angle}rad;
            --velocity: ${velocity}px;
        `;
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes giftExplode {
            to {
                transform: translate(
                    calc(cos(var(--angle)) * var(--velocity)),
                    calc(sin(var(--angle)) * var(--velocity) + 200px)
                ) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(container);
        document.head.removeChild(style);
    }, 2000);
}

// ================================
// GIFT SOUND EFFECT
// ================================

function playGiftSound() {
    // Create a simple celebratory beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ================================
// PHOTO GALLERY LIGHTBOX
// ================================

function initPhotoGallery() {
    const photos = document.querySelectorAll('.photo-container');
    
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            const img = photo.querySelector('.gallery-photo');
            const caption = photo.querySelector('.photo-caption');
            
            createLightbox(img.src, caption.textContent);
        });
    });
}

function createLightbox(imageSrc, caption) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 2rem;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        border-radius: 15px;
        box-shadow: 0 30px 90px rgba(212, 175, 106, 0.3);
        animation: zoomIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    const captionEl = document.createElement('p');
    captionEl.textContent = caption;
    captionEl.style.cssText = `
        font-family: var(--font-script);
        font-size: 1.5rem;
        color: var(--color-rose-light);
        margin-top: 2rem;
        font-style: italic;
        text-align: center;
        animation: fadeIn 0.5s ease 0.3s both;
    `;
    
    const closeHint = document.createElement('p');
    closeHint.textContent = 'Click anywhere to close';
    closeHint.style.cssText = `
        font-size: 0.9rem;
        color: var(--color-champagne);
        margin-top: 1rem;
        opacity: 0.6;
    `;
    
    lightbox.appendChild(img);
    lightbox.appendChild(captionEl);
    lightbox.appendChild(closeHint);
    
    lightbox.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(lightbox);
}

// ================================
// PARTICLE SYSTEM
// ================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth > 768 ? 50 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.5 + 0.2;
        
        // Random color from palette
        const colors = [
            'rgba(212, 175, 106, 0.6)',
            'rgba(232, 180, 184, 0.5)',
            'rgba(250, 248, 243, 0.4)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}px;
            background: ${color};
            box-shadow: 0 0 ${size * 3}px ${color};
            --duration: ${duration}s;
            --delay: ${delay}s;
            --drift: ${drift}px;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// ================================
// SMOOTH SCROLLING
// ================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// SCROLL REVEAL ANIMATIONS
// ================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 150);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ================================
// FINALE SECTION REVEAL
// ================================

function initFinaleReveal() {
    const finaleSection = document.querySelector('.finale-section');
    const finaleElements = document.querySelectorAll('[data-finale]');
    
    const finaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                finaleElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, index * 800);
                });
                finaleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (finaleSection) {
        finaleObserver.observe(finaleSection);
    }
}

// ================================
// HERO CTA BUTTON
// ================================

function initHeroButton() {
    const enterButton = document.getElementById('enterButton');
    
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            const storySection = document.getElementById('story');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ================================
// MUSIC TOGGLE
// ================================

function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            } else {
                bgMusic.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
                musicToggle.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }
}

// ================================
// FLOATING HEARTS ANIMATION
// ================================

function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    if (!heartsContainer) return;
    
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const startX = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 5;
        
        heart.style.cssText = `
            left: ${startX}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        heartsContainer.appendChild(heart);
    }
}

// ================================
// LETTER TYPING EFFECT
// ================================

function initLetterTyping() {
    const letterSection = document.querySelector('.letter-section');
    const paragraphs = document.querySelectorAll('.letter-paragraph');
    
    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                paragraphs.forEach((p, index) => {
                    p.style.animationDelay = `${index * 0.3}s`;
                });
                letterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (letterSection) {
        letterObserver.observe(letterSection);
    }
}

// ================================
// CURSOR GLOW EFFECT
// ================================

function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(212, 175, 106, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Only show on desktop
    if (window.innerWidth > 1024) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Enlarge on hover over interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .story-card, .purpose-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// ================================
// PARALLAX SCROLL EFFECT
// ================================

function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax for hero section
                const hero = document.querySelector('.hero-section');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                
                // Parallax for story cards
                const storyCards = document.querySelectorAll('.story-card');
                storyCards.forEach((card, index) => {
                    const cardTop = card.offsetTop;
                    const cardScroll = scrolled - cardTop;
                    if (cardScroll > -window.innerHeight && cardScroll < window.innerHeight) {
                        card.style.transform = `translateY(${cardScroll * 0.1}px)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ================================
// SCROLL PROGRESS INDICATOR
// ================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-champagne), var(--color-rose));
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 0 10px var(--color-glow);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ================================
// CARD TILT EFFECT
// ================================

function initCardTilt() {
    const cards = document.querySelectorAll('.purpose-card, .story-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ================================
// HIDE SCROLL INDICATOR ON SCROLL
// ================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ================================
// TEXT GRADIENT ANIMATION
// ================================

function initTextGradient() {
    const gradientTexts = document.querySelectorAll('.highlight, .highlight-forever, .finale-you');
    
    gradientTexts.forEach(text => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            const gradient = `linear-gradient(135deg, 
                hsl(${hue}, 50%, 60%) 0%, 
                hsl(${(hue + 60) % 360}, 50%, 70%) 100%)`;
            // Subtle animation, uncomment if desired
            // text.style.background = gradient;
        }, 50);
    });
}

// ================================
// LAZY LOADING FOR PERFORMANCE
// ================================

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================
// TYPEWRITER EFFECT FOR HERO
// ================================

function initTypewriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after hero animation
    setTimeout(type, 3000);
}

// ================================
// EASTER EGG: KONAMI CODE
// ================================

function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create special heart explosion
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: ${Math.random() * 30 + 20}px;
            animation: explode ${Math.random() * 2 + 1}s ease-out forwards;
            --angle: ${Math.random() * 360}deg;
            --distance: ${Math.random() * 300 + 100}px;
        `;
        container.appendChild(heart);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            to {
                transform: translate(-50%, -50%) 
                           rotate(var(--angle)) 
                           translateY(var(--distance)) 
                           scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(container);
        document.head.removeChild(style);
    }, 3000);
    
    // Play a special message
    const message = document.createElement('div');
    message.textContent = '💝 You found the secret! Extra love for you! 💝';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(212, 175, 106, 0.95);
        color: var(--color-black);
        padding: 2rem 3rem;
        border-radius: 20px;
        font-family: var(--font-display);
        font-size: 1.5rem;
        text-align: center;
        z-index: 10001;
        animation: fadeInOut 3s ease-in-out;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

function optimizePerformance() {
    // Reduce particle count on mobile
    if (window.innerWidth < 768) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 20) {
                particle.remove();
            }
        });
    }
    
    // Disable parallax on mobile for better performance
    if (window.innerWidth < 768) {
        window.removeEventListener('scroll', initParallax);
    }
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

function initAccessibility() {
    // Add ARIA labels
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.setAttribute('role', 'region');
        section.setAttribute('aria-label', `Section ${index + 1}`);
    });
    
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.purpose-card, .story-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                card.click();
            }
        });
    });
}

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💝 Built with love for my wife 💝', 'font-size: 20px; color: #d4af6a; font-weight: bold;');
    console.log('%c Every line of code, every pixel, every animation - crafted with infinite love', 'font-size: 14px; color: #e8b4b8; font-style: italic;');
    
    // Initialize landing page first
    initLandingPage();
    
    // Initialize all features
    createParticles();
    initSmoothScroll();
    initScrollReveal();
    initFinaleReveal();
    initHeroButton();
    initMusicToggle();
    createFloatingHearts();
    initLetterTyping();
    initCursorGlow();
    initParallax();
    initScrollProgress();
    initCardTilt();
    initScrollIndicator();
    initTextGradient();
    initLazyLoad();
    initGiftBoxes();
    initPhotoGallery();
    // initTypewriter(); // Optional: uncomment for typewriter effect on subtitle
    initEasterEgg();
    optimizePerformance();
    initAccessibility();
});

// ================================
// WINDOW RESIZE HANDLER
// ================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        optimizePerformance();
    }, 250);
});

// ================================
// PREVENT CONTEXT MENU (OPTIONAL)
// ================================

// Uncomment to prevent right-click (makes it feel more app-like)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ================================
// LOADING ANIMATION
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Smooth fade in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ================================
// EXPORT FOR POTENTIAL EXTENSIONS
// ================================

// If you want to add more features later, you can export these functions
window.purposeDayWebsite = {
    createParticles,
    createFloatingHearts,
    initScrollReveal,
    initFinaleReveal
};