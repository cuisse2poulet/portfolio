// --- DOM Elements ---
const filtersContainer = document.getElementById('filtersContainer');
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbFrame = document.getElementById('lbFrame');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc'); // NEW
const lbPlayPause = document.getElementById('lbPlayPause');

// --- Settings ---
const SLIDESHOW_SPEED = 3000;

// --- State ---
let currentFilter = 'all';
let filteredItems = [];
let lightboxItems = [];
let currentIdx = 0;
let slideTimer = null;
let isPlaying = false;

// --- Initialization ---
async function init() {
  renderFilters();
  await fetchSketchfabThumbnails();
  filterGallery('all');
  setupLightboxEvents();
}

// --- API Helper ---
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
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      const bestImage = data.thumbnails.images.sort((a, b) => b.width - a.width)[0];
      if (bestImage) item.src = bestImage.url;
    } catch (error) {
      console.warn(`Could not fetch thumbnail for ${item.title}`, error);
      item.src = 'https://placehold.co/600x400?text=No+Preview';
    }
  });

  await Promise.all(promises);
}

// --- Rendering ---
function renderFilters() {
  let html = `<button class="active" onclick="filterGallery('all')">Tous</button>`;
  categories.forEach(cat => {
    html += `<button onclick="filterGallery('${cat.id}')">${cat.label}</button>`;
  });
  filtersContainer.innerHTML = html;
}

function renderGallery(items) {
  galleryGrid.innerHTML = items.map(item => {
    const subText = item.desc || categories.find(c => c.id === item.category)?.label || '';
    const altText = item.desc ? `${item.title} — ${item.desc}` : item.title;

    return `
      <article class="card" onclick="openLightbox('${item.src}')">
        <img src="${item.src}" alt="${altText}" loading="lazy">
        <div class="card-overlay">
          <h3>${item.title}</h3>
          <p>${subText}</p>
        </div>
      </article>
    `;
  }).join('');
}

// --- Filtering ---
window.filterGallery = function(filterId) {
  currentFilter = filterId;
  const buttons = filtersContainer.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if(btn.textContent==='Tous' && filterId==='all') btn.classList.add('active');
    const cat = categories.find(c => c.id === filterId);
    if(cat && btn.textContent===cat.label) btn.classList.add('active');
  });

  if (filterId === 'all') filteredItems = portfolioItems;
  else filteredItems = portfolioItems.filter(item => item.category === filterId);

  renderGallery(filteredItems);
};

// --- Lightbox Logic ---
window.openLightbox = function(src) {
  const clickedItem = portfolioItems.find(item => item.src === src);
  if (!clickedItem) return;

  lightboxItems = portfolioItems.filter(item => item.category === clickedItem.category);
  currentIdx = lightboxItems.findIndex(item => item.src === src);

  updateLightboxContent();
  lightbox.classList.add('open');

  if (clickedItem.sketchfabId) {
    stopSlideshow();
    lbPlayPause.style.display = 'none';
  } else {
    startSlideshow();
    lbPlayPause.style.display = 'flex';
  }
};

function closeLightbox() {
  lightbox.classList.remove('open');
  stopSlideshow();
  lbFrame.src = "";
}

function updateLightboxContent() {
  if(currentIdx < 0) return;
  const item = lightboxItems[currentIdx];

  lbTitle.textContent = item.title;
  // UPDATED: Fill the description
  lbDesc.textContent = item.desc || '';

  if (item.sketchfabId) {
    lbImg.style.display = 'none';
    lbFrame.style.display = 'block';

    let id = item.sketchfabId;
    if (id.includes('sketchfab.com')) {
      const parts = id.split('/').filter(p => p && p !== 'embed' && !p.includes('?'));
      id = parts[parts.length - 1];
    }
    lbFrame.src = `https://sketchfab.com/models/${id}/embed?autostart=1&ui_theme=dark&dnt=1`;

    stopSlideshow();
    lbPlayPause.style.display = 'none';
  } else {
    lbFrame.style.display = 'none';
    lbFrame.src = "";
    lbImg.style.display = 'block';
    lbImg.style.opacity = 0;
    setTimeout(() => {
      lbImg.src = item.src;
      lbImg.style.opacity = 1;
    }, 150);
    lbPlayPause.style.display = 'flex';
  }
}

function nextSlide() {
  currentIdx = (currentIdx + 1) % lightboxItems.length;
  updateLightboxContent();
}

function prevSlide() {
  currentIdx = (currentIdx - 1 + lightboxItems.length) % lightboxItems.length;
  updateLightboxContent();
}

// --- Toggle Logic ---
function startSlideshow() {
  if (slideTimer) clearInterval(slideTimer);
  isPlaying = true;
  updatePlayPauseUI();
  slideTimer = setInterval(() => { nextSlide(); }, SLIDESHOW_SPEED);
}

function stopSlideshow() {
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
  isPlaying = false;
  updatePlayPauseUI();
}

function toggleSlideshow() {
  if (isPlaying) stopSlideshow();
  else startSlideshow();
}

function updatePlayPauseUI() {
  if (isPlaying) lbPlayPause.textContent = "⏸ Pause";
  else lbPlayPause.textContent = "▶ Lecture";
}

// --- Events ---
function setupLightboxEvents() {
  document.getElementById('lbClose').onclick = closeLightbox;
  lightbox.onclick = (e) => { if(e.target === lightbox) closeLightbox(); };
  lbPlayPause.onclick = (e) => { e.stopPropagation(); toggleSlideshow(); };
  lbImg.onclick = (e) => { e.stopPropagation(); toggleSlideshow(); };
  document.getElementById('lbPrev').onclick = (e) => { e.stopPropagation(); prevSlide(); };
  document.getElementById('lbNext').onclick = (e) => { e.stopPropagation(); nextSlide(); };

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === ' ') {
        if(lbFrame.style.display === 'none') { e.preventDefault(); toggleSlideshow(); }
    }
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

init();