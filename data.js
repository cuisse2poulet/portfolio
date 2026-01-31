// data.js
const SLIDESHOW_SPEED = 2000; //  Time in ms between images
const GRID_COLUMNS    = 4;    //  Grid width
const ITEMS_PER_PAGE  = 16;   //  Limits initial DOM nodes

const categories = [
  { id: '3d'         , label: 'Modèles 3D' },
  { id: 'charadesign', label: 'CharaDesign' },
  { id: 'digital'    , label: 'Créations numériques' },
  { id: 'drawings'   , label: 'Dessins' },
  { id: 'photos'     , label: 'Photographie'},
];

const subCategories = {
  'photos': [
    { id: 'animal', label: 'Animaux' },
    { id: 'urban', label: 'Architecture' }
  ],
  'drawings': [
    { id: 'faces', label: 'Visages' },
    { id: 'jojo', label: 'JoJo\'s' },
    { id: 'archi', label: 'Architecture' }
  ],
  'digital': [
    { id: 'anatomy', label: 'Etudes : Anatomie' },
    { id: 'color', label: 'Etudes : Couleur' },
  ]
};
const portfolioItems = [
  // --- ARCHITECTURE ---
  {
    src: 'assets/architecture/archi1.jpg',
    category: 'drawings',
    sub: 'archi',
    title: 'Coin de Rue',
    desc: 'Etude de perspective - Crayon sur papier'
  },
  // --- JOJO ---
  {
    src: 'assets/jojo/wonder_of_u.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'Wonder Of U',
    sub: 'stands',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/killer_queen.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'Killer Queen',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/pesci.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'Pesci',
    sub: 'characters',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/white_snake.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'White Snake',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/silver_chariot.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'Silver Chariot',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },
  {
    src: 'assets/jojo/polnareff.jpg',
    category: 'drawings',
    sub: 'jojo',
    title: 'Jean-Pierre Polnareff',
    desc: 'Inspiré par Hirohiko Araki - Feutre sur papier'
  },  {
    src: 'assets/jojo/soft_wet.jpg',
    category: 'drawings',
    sub: 'jojo',
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
  {
    src: 'assets/charadesign/axolotl_aztec_race-v1.png',
    category: 'charadesign',
    title: 'Aztec Inspired Axolotl Race - 1',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/charadesign/axolotl_aztec_race-v2.png',
    category: 'charadesign',
    title: 'Aztec Inspired Axolotl Race - 2',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/charadesign/red_squadron.png',
    category: 'charadesign',
    title: 'R3D SQUADRON',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/charadesign/swordsman-ref.png',
    category: 'charadesign',
    title: 'Swordsman - Travail de référence',
    desc: 'Projet réalisé sur Krita.'
  },
  // --- VISAGES ---
  {
    src: 'assets/faces/faces1.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces2.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces3.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/faces4.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
  {
    src: 'assets/faces/face5.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Etudes préliminaires pour visages',
    desc: 'Crayon sur papier'
  },
{
    src: 'assets/faces/skibidi_demon.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Skibidi Demon',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/faces/subway_surfer.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'Subway Surfer',
    desc: 'Feutre et peinture sur cadre toile'
  },
  {
    src: 'assets/faces/john_pork.jpg',
    category: 'drawings',
    sub: 'faces',
    title: 'John Pork',
    desc: 'Feutre et peinture sur cadre toile'
  },

  // --- Digital ---
  {
    src: 'assets/digital/anatomy/full_upper_torso.png',
    category: 'digital',
    sub: 'anatomy',
    title: 'Full Upper Torso',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/anatomy/random.png',
    category: 'digital',
    sub: 'anatomy',
    title: 'Random',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/anatomy/shapes.png',
    category: 'digital',
    sub: 'anatomy',
    title: 'Shapes',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/anatomy/upper_boody.png',
    category: 'digital',
    sub: 'anatomy',
    title: 'Upper Boody',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/anatomy/upper_tordo.png',
    category: 'digital',
    sub: 'anatomy',
    title: 'Upper Tordo',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/basic_girl_first digital_drawing.png',
    category: 'digital',
    sub: 'color',
    title: 'Basic Girl',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/boy_in_forest.png',
    category: 'digital',
    sub: 'color',
    title: 'Boy In The Forest',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/dalek_art.png',
    category: 'digital',
    sub: 'color',
    title: 'Dalek',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/Drunk_tubies.png',
    category: 'digital',
    sub: 'color',
    title: 'Drunk Tubies',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/Fashion_outfit_TriangleBased.png',
    category: 'digital',
    sub: 'color',
    title: 'Triangle Based Fashion Outfit',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/fiin_and_huntress_drawing2.png',
    category: 'digital',
    sub: 'color',
    title: 'Fiin And Huntress',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/jim_the_machine_redsquadron.png',
    category: 'digital',
    sub: 'color',
    title: 'Jim The Machine - Redsquadron',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/lesbcouple.png',
    category: 'digital',
    sub: 'color',
    title: 'Lesbian Couple',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/magic_voom.png',
    category: 'digital',
    sub: 'color',
    title: 'Magic Voom',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/oc_chair_empty.png',
    category: 'digital',
    sub: 'color',
    title: 'Vintage Leather Chair',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/oc_chair1.png',
    category: 'digital',
    sub: 'color',
    title: 'Soviet Girl',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/oc_comu_picnic.png',
    category: 'digital',
    sub: 'color',
    title: 'Picnic',
    desc: 'Projet réalisé sur Krita.'
  },
  {
    src: 'assets/digital/color/pb_marcie_final.png',
    category: 'digital',
    sub: 'color',
    title: 'Princess Bubblegum & Marcelline',
    desc: 'Projet réalisé sur Krita.'
  },

  // --- Photos ---
  {
    src: 'assets/photos/animal/animal1.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Chat',
  },
  {
    src: 'assets/photos/animal/animal2.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Chat',
  },
  {
    src: 'assets/photos/animal/animal3.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Chat',
  },
  {
    src: 'assets/photos/animal/animal4.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Chat',
  },
  {
    src: 'assets/photos/animal/animal5.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Canard',
  },
  {
    src: 'assets/photos/animal/animal6.jpg',
    category: 'photos',
    sub: 'animal',
    title: 'Canard',
  },

  {
    src: 'assets/photos/architecture/archi01.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi02.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi03.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi04.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi05.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi06.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi07.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi08.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi09.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },
  {
    src: 'assets/photos/architecture/archi10.jpg',
    category: 'photos',
    sub: 'urban',
    title: 'ARCHI',
  },

  // --- 3D Models (Sketchfab) ---
  {
    category: '3d',
    title: 'New Born Strampler',
    sketchfabId: '163fbe99020e4ffb9530ee60f626db55'
  },
  {
    category: '3d',
    title: 'Baby Strampler',
    sketchfabId: '0cd70b544df64718b45fb7dbf8e2bc09'
  },
  {
    category: '3d',
    title: 'Strampler Familly',
    sketchfabId: '0fddd22c1a9e4f2d80906e0c46083c75'
  },
  {
    category: '3d',
    title: 'Ancient Strampler',
    sketchfabId: '42a63b3bd32249f1b9e3872ecdeae7ed'
  },
  {
    category: '3d',
    title: 'Indigo Scyphozoa',
    sketchfabId: 'e983601f21ad435b8ce933d14b49ff86'
  },

  {
    category: '3d',
    title: 'Baby Indigo Salamander',
    sketchfabId: '1292a84c96614f18907a413e8226dc2e'
  },
  {
    category: '3d',
    title: 'Indigo Salamander',
    sketchfabId: '658b495dccf74715b3d7e80f1001925d'
  },

  {
    category: '3d',
    title: 'Salamander Familly',
    sketchfabId: '6a31812525214e4b89dd0b33122fd766'
  },
  {
    category: '3d',
    title: 'Evil Lich',
    sketchfabId: 'bad449f651984135bdd56df323e92115'
  },
  {
    category: '3d',
    title: 'Striker',
    sketchfabId: '27c47d97bb564828a42df5c72247f6dd'
  },

  {
    category: '3d',
    title: 'Spectre',
    sketchfabId: '1c2b5348b574400b9a59d64276a16650'
  },
  {
    category: '3d',
    title: 'Indigo Mantis',
    sketchfabId: '42009cbba6c74857ba15e2ddcb97d253'
  },
  {
    category: '3d',
    title: 'Silkloom',
    sketchfabId: '279414ad66eb40f9a0b7712ab0bbd8d9'
  },
  {
    category: '3d',
    title: 'Silkloin',
    sketchfabId: 'b3087191d7df496ba2dd1ad9bc692de0'
  },
  {
    category: '3d',
    title: 'Ravaa',
    sketchfabId: '3b7ab81a9348423db3479c0c334d2231'
  },
  {
    category: '3d',
    title: 'Flying Appa',
    sketchfabId: '7abd7df5f32442b38d0a4b10fa3f22cf',
    desc: 'Modèle inspiré de la série Avatar. Animation par mes soins.'
  },
];