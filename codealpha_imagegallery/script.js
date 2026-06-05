const filterButtons = document.querySelectorAll('.filter-buttons .btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let visibleImages = [...galleryItems];

// ==========================================
// 1. ADVANCED FILTER WITH SMOOTH ANIMATION
// ==========================================
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-buttons .active').classList.remove('active');
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.remove('fade-out');
                item.classList.add('fade-in');
                // Display property ko CSS handles karega taaki structure na toote
                setTimeout(() => item.style.display = 'block', 0);
            } else {
                item.classList.remove('fade-in');
                item.classList.add('fade-out');
                // Animation poori hone ke baad display none hoga
                setTimeout(() => item.style.display = 'none', 400);
            }
        });

        // Visible images update karne me thoda delay taaki display change reflect ho sake
        setTimeout(() => {
            visibleImages = [...galleryItems].filter(item => item.style.display !== 'none');
        }, 401);
    });
});

// ==========================================
// 2. LIGHTBOX WITH DYNAMIC CAPTIONS & KEYBOARD
// ==========================================

function updateLightbox() {
    const currentItem = visibleImages[currentIndex];
    const imgSrc = currentItem.querySelector('img').src;
    const imgTitle = currentItem.querySelector('.overlay h3').innerText;
    
    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = imgTitle;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('show');
}

function closeLightbox() {
    lightbox.classList.remove('show');
}

function nextImage() {
    if(visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    updateLightbox();
}

function prevImage() {
    if(visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightbox();
}

// Click Event Listeners
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const index = visibleImages.indexOf(item);
        if(index !== -1) openLightbox(index);
    });
});

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// EXTRA: Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return; // Agar lightbox band hai toh kuch mat karo
    
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});
