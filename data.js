// data.js
const SLIDESHOW_SPEED = 2000; // Time in ms between images
const GRID_COLUMNS    = 6;    // Grid width

const categories = [
  { id: 'photos'     , label: 'Photographie' },
  { id: '3d'         , label: 'Modèles 3D' },
  { id: 'archi'      , label: 'Architecture' },
  { id: 'charadesign', label: 'Chara Design' },
  { id: 'jojo'       , label: 'JoJo' },
  { id: 'digital'    , label: 'Créations numériques' },
  { id: 'faces'      , label: 'Etudes - Visage' }
];

const portfolioItems = [
  // --- ARCHITECTURE ---
  {
    src: 'assets/architecture/archi1.jpg',
    category: 'archi',
    title: 'Coin de Rue',
    desc: 'Etude de perspective - Crayon sur papier'
  },
  // --- JOJO ---
  {
    src: 'assets/jojo/wonder_of_u.jpg',
    category: 'jojo',
    title: 'Wonder Of U',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/killer_queen.jpg',
    category: 'jojo',
    title: 'Killer Queen',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/pesci.jpg',
    category: 'jojo',
    title: 'Pesci',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/white_snake.jpg',
    category: 'jojo',
    title: 'White Snake',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/silver_chariot.jpg',
    category: 'jojo',
    title: 'Silver Chariot',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/polnareff.jpg',
    category: 'jojo',
    title: 'Jean-Pierre Polnareff',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },  {
    src: 'assets/jojo/soft_wet.jpg',
    category: 'jojo',
    title: 'Soft and Wet',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
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
{
    src: 'assets/faces/skibidi_demon.jpg',
    category: 'faces',
    title: 'Skibidi Demon',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/faces/subway_surfer.jpg',
    category: 'faces',
    title: 'Subway Surfer',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/faces/john_pork.jpg',
    category: 'faces',
    title: 'John Pork',
    desc: 'Feutre et peinture sur cadre toile'
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