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
const APPLE_EMOJI_URL = 'https://emojicdn.elk.sh/';
const MAX_HEARTS = 15;
const MAX_SPAM = 80;
const MAX_SPARKLES = 20;
const MAX_STARS = 150;
const MAX_FAIRY_DUST = 40;
const MAGIC_COLORS = ['#ffd700', '#ffb6c1', '#dda0dd', '#f0e68c', '#e0ffff'];

// Helper to get Apple Style Emoji URL
function getAppleEmojiUrl(emoji) {
    return `${APPLE_EMOJI_URL}${emoji}?style=apple`;
}

// ===== Floating Hearts System =====
function createFloatingHeart() {
    const heart = document.createElement('img');
    heart.className = 'floating-heart-img';
    heart.src = getAppleEmojiUrl(HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]);
    heart.alt = 'heart';

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
    setInterval(createFloatingHeart, 3000);
}

// ===== Spam Text System =====
function createSpamText() {
    const totalSpam = document.querySelectorAll('.spam-text').length;
    if (totalSpam > MAX_SPAM) return;

    const spam = document.createElement('div');
    spam.className = 'spam-text';
    spam.textContent = 'chloe my love';

    // Random vertical position
    const startY = Math.random() * 95;
    const duration = Math.random() * 2 + 3; // Fast movement across screen
    const delay = Math.random() * 0.2;
    const size = Math.random() * 10 + 16;

    spam.style.cssText = `
        top: ${startY}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    heartsContainer.appendChild(spam);

    // Remove after animation
    setTimeout(() => {
        spam.remove();
    }, (duration + delay) * 1000);
}

function initSpam() {
    // Rapid creation for "filling the screen" look
    setInterval(createSpamText, 150);
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

// ===== Real Stars System =====
function createStar() {
    const starsField = document.querySelector('.stars-field');
    if (!starsField) return;

    const star = document.createElement('div');
    star.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;

    star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation: twinkle ${duration}s ease-in-out infinite alternate;
        animation-delay: ${delay}s;
    `;

    starsField.appendChild(star);
}

function initStars() {
    for (let i = 0; i < MAX_STARS; i++) {
        createStar();
    }
}

// ===== Magic Effects System =====
function createFairyDust() {
    const magicContainer = document.getElementById('magicContainer');
    if (!magicContainer) return;

    const currentDust = magicContainer.querySelectorAll('.fairy-dust').length;
    if (currentDust > MAX_FAIRY_DUST) return;

    const dust = document.createElement('div');
    dust.className = 'fairy-dust';

    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 5 + 8;
    const color = MAGIC_COLORS[Math.floor(Math.random() * MAGIC_COLORS.length)];

    dust.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 10px ${color};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;

    magicContainer.appendChild(dust);

    setTimeout(() => dust.remove(), (duration + delay) * 1000);
}

function initLightRays() {
    const magicContainer = document.getElementById('magicContainer');
    for (let i = 0; i < 3; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        ray.style.animationDelay = (i * 5) + 's';
        ray.style.opacity = (0.05 + Math.random() * 0.05);
        magicContainer.appendChild(ray);
    }
}

function initMagic() {
    initLightRays();
    for (let i = 0; i < MAX_FAIRY_DUST; i++) {
        setTimeout(createFairyDust, Math.random() * 5000);
    }
    setInterval(createFairyDust, 1000);
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
        // Prevent body scroll
        document.body.classList.add('popup-open');
        createCelebrationHearts();
    }, 600);
}

envelopeContainer.addEventListener('click', openLetter);

// Close popup when clicking outside the letter
letterPopup.addEventListener('click', (e) => {
    if (e.target === letterPopup) {
        letterPopup.classList.remove('show');
        // Re-enable body scroll
        document.body.classList.remove('popup-open');
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
    const kiss = document.createElement('img');
    kiss.className = 'kiss';
    kiss.src = getAppleEmojiUrl('💋');
    kiss.alt = 'kiss';
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
        message.innerHTML = `thank you daddy <img src="${getAppleEmojiUrl('💕')}" alt="heart" class="iphone-emoji-inline"><br>i love you and happy valntiine<br>and we WILL stay together forever<br><span style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px; display: block;">(Click anywhere to close)</span>`;
        document.body.appendChild(message);

        // Click to close
        const closeMessage = () => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
            document.removeEventListener('click', closeMessage);
        };

        // Add click listener after a short delay to prevent immediate closing
        setTimeout(() => {
            document.addEventListener('click', closeMessage);
        }, 500);

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(message)) {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
                document.removeEventListener('click', closeMessage);
            }
        }, 10000);

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

// ===== Dancing Couple Click =====
const coupleContainer = document.getElementById('coupleContainer');

coupleContainer.addEventListener('click', () => {
    coupleContainer.classList.toggle('reveal-names');

    // If revealed, add some extra hearts for fun
    if (coupleContainer.classList.contains('reveal-names')) {
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingHeart, i * 100);
        }
    }
});

// ===== Initialize Everything =====
function init() {
    initStars();
    initMagic();
    initFloatingHearts();
    initSpam();
    initSparkles();
    initReplySystem();
    initReplay();
    initMoonInteraction();
    initPlanetInteraction();
    initMusicPlayer();
    initMetCounter();
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();

    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable copying
    document.addEventListener('copy', (e) => e.preventDefault());

    // Disable select start (additional protection)
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // Disable dragging elements (like images)
    document.addEventListener('dragstart', (e) => e.preventDefault());
});
// ===== Reply Envelope System =====
function initReplySystem() {
    const sendBtn = document.getElementById('sendReplyBtn');
    const input = document.getElementById('replyInput');
    const wrapper = document.querySelector('.reply-envelope-wrapper');
    const whatsappLink = document.getElementById('whatsappLink');

    if (!sendBtn || !input || !wrapper) return;

    sendBtn.addEventListener('click', () => {
        const message = input.value.trim();
        if (!message) {
            alert("Please write a sweet message first! 💕");
            return;
        }

        // 1. Disable input and button
        input.disabled = true;
        sendBtn.disabled = true;
        sendBtn.innerHTML = 'Sealing... 💌';

        // 2. Start Animation Sequence
        wrapper.classList.add('sending');

        // 3. Seal the envelope after paper slides in & flap closes
        setTimeout(() => {
            wrapper.classList.add('sealed');

            // 4. Trigger Pigeon Animation
            createPigeons(sendBtn);

            // Generate WhatsApp Link
            // Replace with actual phone number if needed, or leave blank to let user choose contact
            const phoneNumber = "";
            const encodedMessage = encodeURIComponent(message);
            whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            sendBtn.style.display = 'none'; // Hide button after sending
        }, 1500);
    });
}

function createPigeons(originElement) {
    const rect = originElement.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const pigeon = document.createElement('div');
            pigeon.className = 'pigeon';
            pigeon.textContent = '🕊️';
            pigeon.style.left = startX + 'px';
            pigeon.style.top = startY + 'px';

            // Randomize flight a bit
            const duration = 2 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            pigeon.style.animation = `flyAway ${duration}s ease-in-out ${delay}s forwards`;

            document.body.appendChild(pigeon);

            // Cleanup
            setTimeout(() => pigeon.remove(), (duration + delay) * 1000);
        }, i * 200);
    }
}

// ===== Replay System =====
function initReplay() {
    const replayBtn = document.getElementById('replayBtn');
    const envelope = document.querySelector('.envelope');
    const envelopeHint = document.getElementById('envelopeHint');
    const letterPopup = document.getElementById('letterPopup');

    if (!replayBtn) return;

    replayBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering envelope click

        // Reset Envelope
        envelope.classList.remove('open');
        envelopeHint.style.display = 'block';

        // Hide Popup
        letterPopup.classList.remove('show');
        // Re-enable body scroll
        document.body.classList.remove('popup-open');
    });
}

// ===== Interactive Moon =====
function initMoonInteraction() {
    const moon = document.querySelector('.moon');
    if (!moon) return;

    moon.addEventListener('click', (e) => {
        // Create sparkle and message
        showLoveMessage(e.clientX, e.clientY);

        // Add a pulse effect
        moon.style.transform = 'scale(1.2)';
        setTimeout(() => moon.style.transform = '', 300);
    });
}

// ===== Planet Interaction (Music Trigger) =====
function initPlanetInteraction() {
    const planet = document.getElementById('musicPlanet');
    const bgMusic = document.getElementById('bgMusic');
    if (!planet || !bgMusic) return;

    planet.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(err => console.error("Playback failed:", err));
        } else {
            bgMusic.pause();
        }

        // Small reaction animation
        planet.style.transform = 'scale(0.8)';
        setTimeout(() => planet.style.transform = '', 150);
    });
}

function showLoveMessage(x, y) {
    const text = 'I Love You';

    const el = document.createElement('div');
    el.className = 'floating-love-message'; // Re-using class from before or need to ensure CSS exists
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.position = 'fixed';
    el.style.color = '#ff6b9d';
    el.style.fontFamily = "'Great Vibes', cursive";
    el.style.fontSize = '2rem';
    el.style.textShadow = '0 0 10px rgba(255,107,157,0.8)';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '3000';
    el.style.animation = 'floatUpFade 2.5s ease-out forwards';

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 2500);
}
// ===== Music Player (Local) =====
function initMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    // Set volume and play
    bgMusic.volume = 0.5;
    bgMusic.play().catch(err => console.log("Init playback blocked, waiting for interaction"));

    // Browser Autoplay Fallback: Start music on first interaction if blocked
    document.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(err => console.log("Autoplay blocked, waiting for interaction"));
        }
    }, { once: true });
}

// ===== Met Counter =====
function initMetCounter() {
    const counterDisplay = document.getElementById('metCounterDisplay');
    if (!counterDisplay) return;

    // Start Date: Sept 13, 2025
    const startDate = new Date('2025-09-13T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            counterDisplay.textContent = "See you soon! ❤️";
            return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        counterDisplay.innerHTML = `
            ${days}d ${hours}h ${minutes}m ${seconds}s
        `;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}
