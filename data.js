// data.js

const categories = [
  { id: 'photos'     , label: 'Photographie' },
  { id: '3d'         , label: 'Modèles 3D' },
  { id: 'digital'    , label: 'Créations numériques' },
  { id: 'charadesign', label: 'Chara Design' },
  { id: 'faces'      , label: 'Etudes - Visage' },
  { id: 'genz'       , label: 'Série Gen Z' }
];

const portfolioItems = [
  // --- CHARA DESIGN ---
  {
    src: 'assets/charadesign/music_spirit.jpg',
    category: 'charadesign',
    title: 'Music Spirit',
    desc: 'Etude préliminaire - crayon et feutre sur papier'
  },
  {
    src: 'assets/charadesign/incubus.jpg',
    category: 'charadesign',
    title: 'Incubus',
    desc: 'Feutre sur papier'
  },
  {
    src: 'assets/charadesign/stop_man.jpg',
    category: 'charadesign',
    title: 'Stop! Man',
    desc: 'Feutre sur papier'
  },
  {
    src: 'assets/charadesign/randonneur.jpg',
    category: 'charadesign',
    title: 'Randonneur',
    desc: 'Etude lumiere et pose active - Crayon sur papier'
  },
  {
    src: 'assets/charadesign/zero-g.jpg',
    category: 'charadesign',
    title: 'Zéro G',
    desc: 'Etude de pose - Crayon sur papier'
  },
  // --- GEN Z ---
  {
    src: 'assets/genz/skibidi_demon.jpg',
    category: 'genz',
    title: 'Skibidi Demon',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/genz/subway_surfer.jpg',
    category: 'genz',
    title: 'Subway Surfer',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/genz/john_pork.jpg',
    category: 'genz',
    title: 'John Pork',
    desc: 'Feutre et peinture sur cadre toile'
  },

  // --- VISAGES ---
  {
    src: 'assets/faces/faces1.jpg',
    category: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces2.jpg',
    category: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces3.jpg',
    category: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces4.jpg',
    category: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/face5.jpg',
    category: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
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
  },
  {
    category: '3d',
    title: 'Strampler Familly',
    sketchfabId: '0fddd22c1a9e4f2d80906e0c46083c75'
  },
  {
    category: '3d',
    title: 'Salamander Familly',
    sketchfabId: '6a31812525214e4b89dd0b33122fd766'
  },
  {
    category: '3d',
    title: 'Ravaa',
    sketchfabId: '3b7ab81a9348423db3479c0c334d2231'
  }
];