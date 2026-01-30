// ===== Valentine's Day - Will You Be My Valentine, Chloe? =====

// DOM Elements
const heartsContainer = document.getElementById('heartsContainer');
const sparklesContainer = document.getElementById('sparklesContainer');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');
const letterPopup = document.getElementById('letterPopup');
const envelopeHint = document.getElementById('envelopeHint');

// ===== Configuration =====
const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '💓', '💞', '💘', '💝', '🌹', '✨'];
const MAX_HEARTS = 15;
const MAX_SPARKLES = 20;

// ===== Floating Hearts System =====
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    // Random properties
    const startX = Math.random() * 100;
    const size = Math.random() * 20 + 15;
    const duration = Math.random() * 5 + 8;
    const delay = Math.random() * 5;

    heart.style.cssText = `
        left: ${startX}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    heartsContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

function initFloatingHearts() {
    // Create initial hearts
    for (let i = 0; i < MAX_HEARTS; i++) {
        setTimeout(() => createFloatingHeart(), i * 500);
    }

    // Continuously create hearts
    setInterval(createFloatingHeart, 2000);
}

// ===== Sparkles System =====
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 2;
    const size = Math.random() * 3 + 2;

    sparkle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
    `;

    sparklesContainer.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 4000);
}

function initSparkles() {
    for (let i = 0; i < MAX_SPARKLES; i++) {
        setTimeout(() => createSparkle(), i * 200);
    }

    setInterval(createSparkle, 500);
}

// ===== Envelope Interaction =====
function openLetter() {
    // Add open class to envelope for flap animation
    envelope.classList.add('open');

    // Hide the hint
    envelopeHint.style.display = 'none';

    // Show the big letter popup after a short delay
    setTimeout(() => {
        letterPopup.classList.add('show');
        createCelebrationHearts();
    }, 600);
}

envelopeContainer.addEventListener('click', openLetter);

// Close popup when clicking outside the letter
letterPopup.addEventListener('click', (e) => {
    if (e.target === letterPopup) {
        letterPopup.classList.remove('show');
    }
});

// ===== Celebration Hearts =====
function createCelebrationHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => createFloatingHeart(), i * 80);
    }
}

// ===== Yes Button - Kisses Everywhere! =====
const yesBtn = document.getElementById('yesBtn');

function createKiss(x, y) {
    const kiss = document.createElement('div');
    kiss.className = 'kiss';
    kiss.textContent = '💋';
    kiss.style.left = x + 'px';
    kiss.style.top = y + 'px';
    document.body.appendChild(kiss);

    setTimeout(() => kiss.remove(), 3000);
}

function kissesEverywhere() {
    // Create lots of kisses all over the screen
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createKiss(x, y);
        }, i * 100);
    }

    // Show success message
    setTimeout(() => {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = 'I Love You! 💕<br>Happy Valentine\'s Day!';
        document.body.appendChild(message);

        // More kisses!
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createKiss(x, y);
            }, i * 150);
        }
    }, 1000);
}

yesBtn.addEventListener('click', kissesEverywhere);

// ===== Initialize Everything =====
function init() {
    initFloatingHearts();
    initSparkles();
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
