// data.js

const categories = [
  { id: 'drawings', label: 'Dessins' },
  { id: 'digital',  label: 'Créations numériques' },
  { id: 'photos',   label: 'Photographie' },
  { id: '3d',       label: 'Modèles 3D' }
];

const portfolioItems = [
  // --- Drawings ---
  {
    src: 'assets/dessin1.jpg',
    category: 'drawings',
    title: 'Étude au crayon',
    desc: 'Esquisse rapide sur papier grain.'
  },
  {
    src: 'assets/dessin2.jpg',
    category: 'drawings',
    title: 'Portrait au fusain'
  },

  // --- Digital ---
  {
    src: 'assets/digital1.jpg',
    category: 'digital',
    title: 'Affiche numérique',
    desc: 'Projet réalisé sur Photoshop.'
  },
  {
    src: 'assets/digital2.jpg',
    category: 'digital',
    title: 'Composition 3D',
    desc: 'Rendu Blender et post-prod.'
  },

  // --- Photos ---
  {
    src: 'assets/photo1.jpg',
    category: 'photos',
    title: 'Paysage urbain',
    desc: 'Paris, au petit matin.'
  },
  {
    src: 'assets/photo2.jpg',
    category: 'photos',
    title: 'Scène nocturne'
  },

  // --- 3D Models (Sketchfab) ---
  {
    category: '3d',
    title: 'Flying Appa',
    sketchfabId: '7abd7df5f32442b38d0a4b10fa3f22cf',
    desc: 'Modèle inspiré de la série Avatar. Animation par mes soins.'
  },
  {
    category: '3d',
    title: 'Evil Lich',
    sketchfabId: 'bad449f651984135bdd56df323e92115'
  },
  {
    category: '3d',
    title: 'Spectre',
    sketchfabId: '1c2b5348b574400b9a59d64276a16650'
  }
];