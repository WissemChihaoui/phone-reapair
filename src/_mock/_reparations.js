export const PREVIOUS_ARTICLE = [
  {
    value: '1',
    label: 'iPhone 13 - SN1234567890',
    article: {
      materiel: { value: 'smartphone', label: 'Smartphone' },
      marque: { value: 'apple', label: 'Apple' },
      modele: { value: 'iphone13', label: 'iPhone 13' },
      imei: 'SN1234567890',
      accessoire: [
        { value: '1', label: 'Accessoire 1' },
        { value: '2', label: 'Accessoire 2' },
      ],
      etat: { value: 'new', label: 'Comme neuf' },
      rapport: {
        items: {
          arrier: 'Vitre cassée et tactile non fonctionnel',
          cameraArriere: true,
          cameraAvant: true,
          charge: true,
          ecran: 'Vitre tactile et LCD fonctionnel',
          lecteur: true,
        },
        observation: 'Client signale une autonomie réduite.',
      },
      noteClient: 'Code de déverrouillage: 1234',
      noteIntervention: 'Remplacement écran et batterie',
      noteInterne: 'Vérifier connecteurs internes',
      schemaVer: [0, 3, 4, 7, 5],
      dateRestitution: '2025-08-10',
      technicien: { value: 'tech1', label: 'Wissem' },
    },
  },
  {
    value: '2',
    label: 'iPad Pro - SN99887766',
    article: {
      materiel: { value: 'tablet', label: 'Tablet' },
      marque: { value: 'apple', label: 'Apple' },
      modele: { value: 'ipadpro', label: 'iPad Pro' },
      imei: 'SN99887766',
      accessoire: [{ value: '2', label: 'Accessoire 2' }],
      etat: { value: 'new', label: 'Comme neuf' },
      rapport: {
        items: {
          arrier: 'Vitre cassée et tactile non fonctionnel',
          cameraArriere: true,
          cameraAvant: true,
          charge: true,
          ecran: 'Vitre tactile et LCD fonctionnel',
          lecteur: true,
        },
        observation: 'Problème de port USB',
      },
      noteClient: '',
      noteIntervention: 'Nettoyage et remplacement port USB',
      noteInterne: '',
      schemaVer: [0, 3, 4, 7, 5],
      dateRestitution: '2025-08-12',
      technicien: { value: 'tech2', label: 'Ahmed' },
    },
  },
  {
    value: '3',
    label: 'Galaxy S22 - SN44556677',
    article: {
      materiel: { value: 'smartphone', label: 'Smartphone' },
      marque: { value: 'samsung', label: 'Samsung' },
      modele: { value: 'galaxy22', label: 'Galaxy S22' },
      imei: 'SN44556677',
      accessoire: [{ value: '3', label: 'Accessoire 3' }],
      etat: { value: 'new', label: 'Comme neuf' },
      rapport: {
        items: {
          arrier: 'Vitre cassée et tactile non fonctionnel',
          cameraArriere: true,
          cameraAvant: true,
          charge: true,
          ecran: 'Vitre tactile et LCD fonctionnel',
          lecteur: true,
        },
        observation: '',
      },
      noteClient: 'Pas de mot de passe',
      noteIntervention: 'Réinitialisation logicielle',
      noteInterne: 'RAS',
      schemaVer: [0, 3, 4, 7, 5],
      dateRestitution: '2025-08-15',
      technicien: { value: 'tech3', label: 'Yassine' },
    },
  },
];

export const MATERIAL_TYPES = [
  { value: '', label: 'Choisir ...' },
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'laptop', label: 'Laptop' },
];
export const BRANDS = [
  { value: '', label: 'Choisir ...' },
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
];
export const MODELS = [
  { value: '', label: 'Choisir ...' },
  { value: 'iphone13', label: 'iPhone 13' },
  { value: 'galaxy22', label: 'Galaxy S22' },
];
export const ACCESSOIRE = [
  { value: '1', label: 'Accessoire 1' },
  { value: '2', label: 'Accessoire 2' },
  { value: '3', label: 'Accessoire 3' },
];

export const CONDITIONS = [
  { value: '', label: 'Choisir ...' },
  { value: 'new', label: 'Comme neuf' },
  { value: 'good', label: 'Bon état' },
];

export const TECHNICIANS = [
  { value: '', label: 'Choisir ...' },
  { value: 'tech1', label: 'Jean Dupont' },
  { value: 'tech2', label: 'Marie Martin' },
];


export const piecesList = [
  {
    value: 'batterie_iphone_12',
    label: 'Batterie iPhone 12',
    price: 75,
  },
  {
    value: 'ecran_samsung_s21',
    label: 'Écran Samsung Galaxy S21',
    price: 120,
  },
  {
    value: 'connecteur_charge_huawei',
    label: 'Connecteur de charge Huawei P30',
    price: 35,
  },
  {
    value: 'camera_arriere_redmi',
    label: 'Caméra arrière Redmi Note 10',
    price: 45,
  },
  {
    value: 'haut_parleur_ipad',
    label: 'Haut-parleur iPad Air 4',
    price: 60,
  },
];
export const servicesList = [
  { value: 'cleaning', label: 'Nettoyage interne', price: 25 },
  { value: 'format', label: 'Formatage + installation', price: 40 },
  { value: 'diagnostic', label: 'Diagnostic complet', price: 20 },
];

export const mainOeuvreList = [
  { value: 'diagnostic', label: 'Diagnostic et analyse', price: 30 },
  { value: 'soudure', label: 'Soudure composant', price: 45 },
  { value: 'remplacement_ecran', label: 'Remplacement écran', price: 60 },
];

export const regroupementList = [
  {
    value: 'pack-iph11',
    label: 'Pack iPhone 11 - Écran + Batterie',
    pieces: [
      { value: 'ecran-iph11', label: 'Écran iPhone 11', price: 70 },
      { value: 'batt-iph11', label: 'Batterie iPhone 11', price: 30 },
    ],
  },
  {
    value: 'pack-iph12',
    label: 'Pack iPhone 12 - Écran + Connecteur',
    pieces: [
      { value: 'ecran-iph12', label: 'Écran iPhone 12', price: 80 },
      { value: 'connecteur-iph12', label: 'Connecteur de charge', price: 35 },
    ],
  },
];
