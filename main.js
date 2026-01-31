/* =========================================
   1. GLOBAL STATE & SETTINGS
   ========================================= */
let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let currentFilter = 'all';
let currentFilteredItems = [];
let lightboxItems = [];

/* =========================================
   2. INITIALIZATION
   ========================================= */
async function init() {
    if (typeof portfolioItems === 'undefined') return;
    setupLightboxEvents();
    await fetchSketchfabThumbnails();
    renderFilters();
    filterGallery('all');
}

/* =========================================
   3. API HELPER (Sketchfab Thumbnails)
   ========================================= */
async function fetchSketchfabThumbnails() {
    const itemsToFetch = portfolioItems.filter(item => item.sketchfabId && !item.src);
    if (itemsToFetch.length === 0) return;

    const promises = itemsToFetch.map(async (item) => {
        try {
            let id = item.sketchfabId;
            if (id.includes('sketchfab.com')) {
                const parts = id.split('/').filter(p => p && p !== 'embed' && !p.includes('?'));
                id = parts[parts.length - 1];
            }
            const response = await fetch(`https://api.sketchfab.com/v3/models/${id}`);
            const data = await response.json();
            const bestImage = data.thumbnails.images.sort((a, b) => b.width - a.width)[0];
            if (bestImage) item.src = bestImage.url;
        } catch (error) {
            item.src = 'https://placehold.co/600x400?text=No+Preview';
        }
    });
    await Promise.all(promises);
}

/* =========================================
   4. RENDERING & FILTERING
   ========================================= */
function renderFilters() {
    const container = document.getElementById('filtersContainer');
    if (!container) return;

    const totalCount = portfolioItems.length;
    let html = `<button class="active" onclick="filterGallery('all')">Tous <span>(${totalCount})</span></button>`;

    categories.forEach(cat => {
        const count = portfolioItems.filter(item => item.category === cat.id).length;
        html += `<button onclick="filterGallery('${cat.id}')">${cat.label} <span>(${count})</span></button>`;
    });
    container.innerHTML = html;
}

window.filterGallery = function(filterId) {
    currentFilter = filterId;
    const buttons = document.querySelectorAll('#filtersContainer button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes('Tous') && filterId === 'all') btn.classList.add('active');
        const cat = categories.find(c => c.id === filterId);
        if (cat && btn.innerText.includes(cat.label)) btn.classList.add('active');
    });

    currentFilteredItems = filterId === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === filterId);

    renderGalleryGrid(currentFilteredItems);
};

function renderGalleryGrid(items) {
    const mainContainer = document.getElementById('galleryGrid');
    if (!mainContainer) return;
    mainContainer.innerHTML = '';

    // Inject the column count from data.js into a CSS variable
    const columns = typeof GRID_COLUMNS !== 'undefined' ? GRID_COLUMNS : 4;
    mainContainer.style.setProperty('--grid-cols', columns);

    const grouped = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    categories.forEach(catDef => {
        const itemsInSection = grouped[catDef.id];
        if (itemsInSection && itemsInSection.length > 0) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'category-separator';
            headerDiv.id = `scroll-target-${catDef.id}`;
            headerDiv.innerHTML = `<h2>${catDef.label}</h2>`;
            mainContainer.appendChild(headerDiv);

            const subGrid = document.createElement('div');
            subGrid.className = 'sub-grid';

            itemsInSection.forEach((item) => {
                const subText = item.desc || catDef.label || '';
                const card = document.createElement('article');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="card-overlay">
                        <h3>${item.title}</h3>
                        <p>${subText}</p>
                    </div>
                `;
                card.onclick = () => openLightbox(item.src);
                subGrid.appendChild(card);
            });
            mainContainer.appendChild(subGrid);
        }
    });

    if (currentFilter !== 'all') {
        const target = document.getElementById(`scroll-target-${currentFilter}`);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

/* =========================================
   5. LIGHTBOX & SLIDESHOW LOGIC
   ========================================= */
window.openLightbox = function(src) {
    const clickedItem = portfolioItems.find(item => item.src === src);
    if (!clickedItem) return;

    lightboxItems = portfolioItems.filter(item => item.category === clickedItem.category);
    currentIndex = lightboxItems.findIndex(item => item.src === src);

    updateLightboxContent();
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (!clickedItem.sketchfabId) {
        startSlideshow();
    } else {
        stopSlideshow();
    }
};

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
    stopSlideshow();
    const frame = document.getElementById('lbFrame');
    if (frame) frame.src = "";
    document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
    if (currentIndex < 0) return;
    const item = lightboxItems[currentIndex];
    const total = lightboxItems.length;

    const lbImg = document.getElementById('lbImg');
    const lbFrame = document.getElementById('lbFrame');

    // Displaying X / N wrapped in a span for CSS styling
    document.getElementById('lbTitle').innerHTML = `${item.title} <span class="lb-counter">[${currentIndex + 1} / ${total}]</span>`;
    document.getElementById('lbDesc').textContent = item.desc || '';

    if (item.sketchfabId) {
        if (lbImg) lbImg.style.display = 'none';
        if (lbFrame) {
            lbFrame.style.display = 'block';
            let id = item.sketchfabId;
            if (id.includes('sketchfab.com')) {
                const parts = id.split('/').filter(p => p && p !== 'embed' && !p.includes('?'));
                id = parts[parts.length - 1];
            }
            lbFrame.src = `https://sketchfab.com/models/${id}/embed?autostart=1&ui_theme=dark&dnt=1`;
        }
        stopSlideshow();
        updatePlayPauseUI();
    } else {
        if (lbFrame) { lbFrame.style.display = 'none'; lbFrame.src = ""; }
        if (lbImg) {
            lbImg.style.display = 'block';
            lbImg.style.opacity = 0;
            setTimeout(() => { lbImg.src = item.src; lbImg.style.opacity = 1; }, 150);
        }
        updatePlayPauseUI();
    }
}

function nextSlide() { currentIndex = (currentIndex + 1) % lightboxItems.length; updateLightboxContent(); }
function prevSlide() { currentIndex = (currentIndex - 1 + lightboxItems.length) % lightboxItems.length; updateLightboxContent(); }

function startSlideshow() {
    if (slideTimer) clearInterval(slideTimer);
    isPlaying = true;
    updatePlayPauseUI();

    const speed = SLIDESHOW_SPEED || 3000;
    slideTimer = setInterval(() => { nextSlide(); }, speed);
}

function stopSlideshow() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
    isPlaying = false;
    updatePlayPauseUI();
}

window.toggleSlideshow = function() {
    if (isPlaying) stopSlideshow();
    else startSlideshow();
};

function updatePlayPauseUI() {
    let btn = document.getElementById('lbPlayPause');
    const lbContent = document.querySelector('.lb-content');
    const item = lightboxItems[currentIndex];

    if (item && item.sketchfabId) {
        if (btn) btn.parentElement.style.display = 'none';
        return;
    }

    // Check for our dedicated centering wrapper
    let controlLayer = document.getElementById('lbControlLayer');
    if (!controlLayer && lbContent) {
        controlLayer = document.createElement('div');
        controlLayer.id = 'lbControlLayer';
        // Position it at the very top of the content
        lbContent.prepend(controlLayer);
    }

    if (!btn && controlLayer && item && !item.sketchfabId) {
        btn = document.createElement('button');
        btn.id = 'lbPlayPause';
        btn.className = 'play-pause-btn';
        controlLayer.appendChild(btn);
        btn.onclick = (e) => { e.stopPropagation(); toggleSlideshow(); };
    }

    if (btn) {
        btn.innerHTML = isPlaying ? "⏸ Pause" : "▶ Lecture";
        controlLayer.style.display = 'flex';
        btn.style.setProperty('display', 'inline-flex', 'important');
    }
}

/* =========================================
   6. EVENTS
   ========================================= */
function setupLightboxEvents() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');

    if (document.getElementById('lbClose')) document.getElementById('lbClose').onclick = closeLightbox;
    if (lb) lb.onclick = (e) => { if (e.target === lb) closeLightbox(); };

    if (lbImg) {
        lbImg.onclick = (e) => {
            e.stopPropagation();
            toggleSlideshow();
        };
    }

    if (document.getElementById('lbPrev')) document.getElementById('lbPrev').onclick = (e) => { e.stopPropagation(); stopSlideshow(); prevSlide(); };
    if (document.getElementById('lbNext')) document.getElementById('lbNext').onclick = (e) => { e.stopPropagation(); stopSlideshow(); nextSlide(); };

    document.addEventListener('keydown', (e) => {
        if (!lb || !lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === ' ') {
            const frame = document.getElementById('lbFrame');
            if (frame && frame.style.display === 'none') { e.preventDefault(); toggleSlideshow(); }
        }
        if (e.key === 'ArrowLeft') { stopSlideshow(); prevSlide(); }
        if (e.key === 'ArrowRight') { stopSlideshow(); nextSlide(); }
    });
}

init();