// Music Control
const bgMusic = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');
let isMusicPlaying = false;

soundToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        soundToggle.textContent = '🔇';
    } else {
        bgMusic.play();
        soundToggle.textContent = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Elements
const notebook = document.getElementById('notebook');
const frontCover = document.getElementById('frontCover');
const openBook = document.getElementById('openBook');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const instruction = document.getElementById('instruction');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Page content
const pages = [
    // Pages 1-2 - The name written
    {
        left: `
            <div class="lined-content">
                <div class="line"></div>
                <div class="line has-text"><span class="handwriting">Chloe</span></div>
                <div class="line"></div>
                <div class="line has-text"><span class="handwriting">kissing me NOW</span></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        `,
        right: `
            <div class="lined-content">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        `
    }
];

// State
let isOpen = false;
let currentSpread = 0;

// Open notebook
function openNotebook() {
    if (isOpen) return;
    isOpen = true;

    notebook.classList.add('open');
    frontCover.classList.add('opened');
    instruction.classList.add('hidden');

    setTimeout(() => {
        openBook.classList.add('visible');
        showSpread(0);
    }, 500);
}

// Close notebook (click on cover)
function closeNotebook() {
    if (!isOpen) return;
    isOpen = false;

    openBook.classList.remove('visible');

    setTimeout(() => {
        frontCover.classList.remove('opened');
        notebook.classList.remove('open');
        instruction.classList.remove('hidden');
    }, 100);
}

// Show spread (2 pages)
function showSpread(index) {
    if (index < 0 || index >= pages.length) return;
    currentSpread = index;

    const spread = pages[index];
    leftPage.querySelector('.page-content').innerHTML = spread.left;
    rightPage.querySelector('.page-content').innerHTML = spread.right;

    // Update page numbers
    leftPage.querySelector('.page-number').textContent = (index * 2) + 1;
    rightPage.querySelector('.page-number').textContent = (index * 2) + 2;

    // Update arrows
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
}

// Event listeners
frontCover.addEventListener('click', () => {
    if (isOpen) {
        closeNotebook();
    } else {
        openNotebook();
    }
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showSpread(currentSpread - 1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showSpread(currentSpread + 1);
});

// Keyboard
document.addEventListener('keydown', (e) => {
    if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ') openNotebook();
    } else {
        if (e.key === 'ArrowRight') showSpread(currentSpread + 1);
        if (e.key === 'ArrowLeft') showSpread(currentSpread - 1);
        if (e.key === 'Escape') closeNotebook();
    }
});

// Init
showSpread(0);
