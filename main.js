/* =========================================
   1. GLOBAL STATE & SETTINGS
   ========================================= */
let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let currentFilter = 'all';
let currentSubFilter = 'all';
let currentFilteredItems = [];
let lightboxItems = [];
// PAGINATION: Handles 500+ items smoothly by rendering in batches
let itemsDisplayed = (typeof ITEMS_PER_PAGE !== 'undefined') ? ITEMS_PER_PAGE : 24;

/* =========================================
   2. INITIALIZATION
   ========================================= */
async function init() {
    if (typeof portfolioItems === 'undefined') return;

    // Inject Blur Up styles for smooth transitions
    const style = document.createElement('style');
    style.innerHTML = `
        .card img {
            filter: blur(20px);
            transition: filter 0.6s ease-out, opacity 0.6s ease-out;
            opacity: 0.3;
        }
        .card img.loaded {
            filter: blur(0);
            opacity: 1;
        }
        .sub-filters {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
            padding: 10px 0;
            min-height: 50px;
        }
    `;
    document.head.appendChild(style);

    setupLightboxEvents();
    setupInfiniteScroll();
    renderFilters();

    // Initial render
    filterGallery('all');
}

/* =========================================
   3. SCALABLE API, CACHING & HYDRATION
   ========================================= */

// Hydrates placeholders into real cards when they enter the viewport
const cardHydrationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const placeholder = entry.target;
            const itemIndex = parseInt(placeholder.dataset.index);
            if (itemIndex >= itemsDisplayed) {
                itemsDisplayed = itemIndex + 1;
                renderGalleryGrid(currentFilteredItems);
            }
            cardHydrationObserver.unobserve(placeholder);
        }
    });
}, { rootMargin: '400px' });

// Fetches Sketchfab thumbnails only when visible
const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const id = img.dataset.sketchfabId;
            if (id) fetchSingleSketchfabThumb(id, img);
            thumbObserver.unobserve(img);
        }
    });
}, { rootMargin: '200px' });

async function fetchSingleSketchfabThumb(id, imgElement) {
    // Check LocalStorage Cache first
    const cachedUrl = localStorage.getItem(`thumb_${id}`);
    if (cachedUrl) {
        imgElement.src = cachedUrl;
        const item = portfolioItems.find(i => i.sketchfabId === id);
        if (item) item.src = cachedUrl;
        return;
    }

    try {
        let modelId = id.includes('sketchfab.com') ? id.split('/').filter(p => p && p !== 'embed').pop() : id;
        const response = await fetch(`https://api.sketchfab.com/v3/models/${modelId}`);
        const data = await response.json();
        const bestImage = data.thumbnails.images.sort((a, b) => b.width - a.width)[0];

        if (bestImage) {
            localStorage.setItem(`thumb_${id}`, bestImage.url);
            imgElement.src = bestImage.url;
            const item = portfolioItems.find(i => i.sketchfabId === id);
            if (item) item.src = bestImage.url;
        }
    } catch (e) {
        imgElement.src = 'https://placehold.co/600x400?text=Indisponible';
    }
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
        html += `<button data-catid="${cat.id}" onclick="filterGallery('${cat.id}')">${cat.label} <span>(${count})</span></button>`;
    });
    container.innerHTML = html;
}

function renderSubFilters(catId) {
    const container = document.getElementById('subFiltersContainer');
    if (!container) return;

    const subs = (typeof subCategories !== 'undefined') ? subCategories[catId] : null;
    if (!subs || catId === 'all') {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'flex';
    let html = `<button class="${currentSubFilter === 'all' ? 'active' : ''}" onclick="filterSubGallery('all')">Tout ${catId}</button>`;

    subs.forEach(sub => {
        const count = portfolioItems.filter(item => item.category === catId && item.sub === sub.id).length;
        html += `<button class="${currentSubFilter === sub.id ? 'active' : ''}" onclick="filterSubGallery('${sub.id}')">${sub.label} <span>(${count})</span></button>`;
    });
    container.innerHTML = html;
}

window.filterGallery = function(filterId) {
    currentFilter = filterId;
    currentSubFilter = 'all';
    itemsDisplayed = (typeof ITEMS_PER_PAGE !== 'undefined' ? ITEMS_PER_PAGE : 24);

    const buttons = document.querySelectorAll('#filtersContainer button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (filterId === 'all' && btn.innerText.includes('Tous')) btn.classList.add('active');
        if (btn.getAttribute('data-catid') === filterId) btn.classList.add('active');
    });

    renderSubFilters(filterId);
    applyFilters();
};

window.filterSubGallery = function(subId) {
    currentSubFilter = subId;
    const buttons = document.querySelectorAll('#subFiltersContainer button');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    applyFilters();
};

function applyFilters() {
    currentFilteredItems = portfolioItems.filter(item => {
        const matchCat = currentFilter === 'all' || item.category === currentFilter;
        const matchSub = currentSubFilter === 'all' || item.sub === currentSubFilter;
        return matchCat && matchSub;
    });
    renderGalleryGrid(currentFilteredItems);
}

function renderGalleryGrid(items) {
    const mainContainer = document.getElementById('galleryGrid');
    if (!mainContainer) return;
    mainContainer.innerHTML = '';

    const columns = (typeof GRID_COLUMNS !== 'undefined') ? GRID_COLUMNS : 4;
    mainContainer.style.setProperty('--grid-cols', columns);

    const groupedData = {};
    items.forEach((item, index) => {
        if (!groupedData[item.category]) groupedData[item.category] = [];
        groupedData[item.category].push({ data: item, originalIndex: index });
    });

    categories.forEach(catDef => {
        const allItemsInSection = groupedData[catDef.id];
        if (allItemsInSection && allItemsInSection.length > 0) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'category-separator';
            headerDiv.id = `scroll-target-${catDef.id}`;
            headerDiv.innerHTML = `<h2>${catDef.label}</h2>`;
            mainContainer.appendChild(headerDiv);

            const subGrid = document.createElement('div');
            subGrid.className = 'sub-grid';

            allItemsInSection.forEach((wrapper) => {
                const item = wrapper.data;
                const indexInFiltered = wrapper.originalIndex;
                const card = document.createElement('article');
                card.className = 'card';

                if (indexInFiltered < itemsDisplayed) {
                    const isSketchfab = !!item.sketchfabId;
                    // Blur Up: start with tiny placeholder for models
                    const initialSrc = isSketchfab ? 'https://placehold.co/20x10?text=...' : item.src;

                    card.innerHTML = `
                        <img src="${initialSrc}"
                             alt="${item.title}"
                             onload="this.classList.add('loaded')"
                             loading="lazy"
                             ${isSketchfab ? `data-sketchfab-id="${item.sketchfabId}"` : ''}>
                        <div class="card-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.desc || catDef.label}</p>
                        </div>
                    `;

                    if (isSketchfab) thumbObserver.observe(card.querySelector('img'));
                    card.onclick = () => openLightbox(item.src || item.sketchfabId);
                } else {
                    card.classList.add('placeholder-card');
                    card.dataset.index = indexInFiltered;
                    card.innerHTML = `<div style="height:200px; width:100%; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; opacity:0.3;">...</div>`;
                    cardHydrationObserver.observe(card);
                }
                subGrid.appendChild(card);
            });
            mainContainer.appendChild(subGrid);
        }
    });

    // Auto-scroll logic (Offset increased for sub-filters)
    if (currentFilter !== 'all' && itemsDisplayed <= 24) {
        const target = document.getElementById(`scroll-target-${currentFilter}`);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
            if (itemsDisplayed < currentFilteredItems.length) {
                itemsDisplayed += (typeof ITEMS_PER_PAGE !== 'undefined' ? ITEMS_PER_PAGE : 24);
                renderGalleryGrid(currentFilteredItems);
            }
        }
    });
}

/* =========================================
   5. LIGHTBOX & SLIDESHOW LOGIC
   ========================================= */
window.openLightbox = function(id) {
    const clickedItem = portfolioItems.find(item => item.src === id || item.sketchfabId === id);
    if (!clickedItem) return;

    lightboxItems = portfolioItems.filter(item => item.category === clickedItem.category);
    currentIndex = lightboxItems.findIndex(item => item.src === id || item.sketchfabId === id);

    updateLightboxContent();
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (!clickedItem.sketchfabId) startSlideshow(); else stopSlideshow();
};

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
    stopSlideshow();
    if (document.getElementById('lbFrame')) document.getElementById('lbFrame').src = "";
    document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
    if (currentIndex < 0) return;
    const item = lightboxItems[currentIndex];
    const total = lightboxItems.length;
    const lbImg = document.getElementById('lbImg');
    const lbFrame = document.getElementById('lbFrame');

    document.getElementById('lbTitle').innerHTML = `${item.title} <span class="lb-counter">[${currentIndex + 1} / ${total}]</span>`;
    document.getElementById('lbDesc').textContent = item.desc || '';

    if (item.sketchfabId) {
        if (lbImg) lbImg.style.display = 'none';
        if (lbFrame) {
            lbFrame.style.display = 'block';
            let sid = item.sketchfabId.includes('sketchfab.com') ? item.sketchfabId.split('/').filter(p => p && p !== 'embed').pop() : item.sketchfabId;
            lbFrame.src = `https://sketchfab.com/models/${sid}/embed?autostart=1&ui_theme=dark&dnt=1`;
        }
        stopSlideshow();
    } else {
        if (lbFrame) { lbFrame.style.display = 'none'; lbFrame.src = ""; }
        if (lbImg) {
            lbImg.style.display = 'block';
            lbImg.style.opacity = 0;
            setTimeout(() => { lbImg.src = item.src; lbImg.style.opacity = 1; }, 150);
        }
    }
    updatePlayPauseUI();
}

function nextSlide() { currentIndex = (currentIndex + 1) % lightboxItems.length; updateLightboxContent(); }
function prevSlide() { currentIndex = (currentIndex - 1 + lightboxItems.length) % lightboxItems.length; updateLightboxContent(); }

function startSlideshow() {
    if (slideTimer) clearInterval(slideTimer);
    isPlaying = true;
    updatePlayPauseUI();
    const speed = (typeof SLIDESHOW_SPEED !== 'undefined') ? SLIDESHOW_SPEED : 3000;
    slideTimer = setInterval(nextSlide, speed);
}

function stopSlideshow() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
    isPlaying = false;
    updatePlayPauseUI();
}

window.toggleSlideshow = function() { isPlaying ? stopSlideshow() : startSlideshow(); };

function updatePlayPauseUI() {
    let btn = document.getElementById('lbPlayPause');
    const lbContent = document.querySelector('.lb-content');
    const item = lightboxItems[currentIndex];

    if (item && item.sketchfabId) {
        if (btn) btn.style.display = 'none';
        return;
    }

    let controlLayer = document.getElementById('lbControlLayer');
    if (!controlLayer && lbContent) {
        controlLayer = document.createElement('div');
        controlLayer.id = 'lbControlLayer';
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
        btn.style.display = 'inline-flex';
    }
}

/* =========================================
   6. EVENTS
   ========================================= */
function setupLightboxEvents() {
    const lb = document.getElementById('lightbox');
    if (document.getElementById('lbClose')) document.getElementById('lbClose').onclick = closeLightbox;
    if (lb) lb.onclick = (e) => { if (e.target === lb) closeLightbox(); };
    if (document.getElementById('lbPrev')) document.getElementById('lbPrev').onclick = (e) => { e.stopPropagation(); stopSlideshow(); prevSlide(); };
    if (document.getElementById('lbNext')) document.getElementById('lbNext').onclick = (e) => { e.stopPropagation(); stopSlideshow(); nextSlide(); };

    document.addEventListener('keydown', (e) => {
        if (!lb || !lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === ' ') { e.preventDefault(); toggleSlideshow(); }
        if (e.key === 'ArrowLeft') { stopSlideshow(); prevSlide(); }
        if (e.key === 'ArrowRight') { stopSlideshow(); nextSlide(); }
    });
}

init();