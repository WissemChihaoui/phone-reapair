import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EditReparationView from 'src/sections/reparations2/views/edit-reparation-view';
import ReparationAddView from 'src/sections/reparations3/views/reparation-add-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Réparation - ${CONFIG.appName}` };

export default function Page() {
const testData = {
  article: {
    accessoire: [
      { label: "Accessoire 2", value: "2" }
    ],
    dateRestitution: "2025-08-12",
    etat: { label: "Comme neuf", value: "new" },
    imei: "SN99887766",
    marque: { label: "Apple", value: "apple" },
    materiel: { label: "Tablet", value: "tablet" },
    modele: { label: "iPad Pro", value: "ipadpro" },
    noteClient: "",
    noteInterne: "",
    noteIntervention: "Nettoyage et remplacement port USB",
    rapport: {
      allumage: undefined,
      arrier: "Vitre cassée et tactile non fonctionnel",
      cameraArriere: true,
      cameraAvant: true,
      capteurProximite: undefined,
      charge: true,
      choc: undefined,
      ecouteur: undefined,
      ecran: "Vitre tactile et LCD fonctionnel",
      hautParleur: undefined,
      lecteur: true,
      micro: undefined,
      priseJack: undefined,
      reseau: undefined,
      tactile: undefined,
      teste: undefined,
      vibreur: undefined,
      wifi: undefined
    },
    observation: "Problème de port USB",
    schemaVer: [0, 3, 4, 7, 5],
    technicien: { label: "Ahmed", value: "tech2" }
  },
  client: {
    addressType: "Home",
    company: "Gleichner, Mueller and Tromp",
    email: "ashlynn.ohara62@gmail.com",
    fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    name: "Jayvion Simon",
    phoneNumber: "+1 202-555-0143",
    primary: true
  },
  documents: [
    {
      type: "piece",
      data: {
        champ: "",
        nom: { label: "Connecteur de charge Huawei P30", value: "connecteur_charge_huawei", price: 35 },
        price: 35,
        qte: 1
      },
      remise: 10,
      total: 25,
      totalNet: 35
    },
    {
      type: "regroupement",
      nom: "Smartphone Repair Kit",
      data: [
        { nom: "Screen", price: 89.99, qte: 1 },
        { nom: "Battery", price: 39.99, qte: 1 }
      ],
      regroupement: undefined,
      remise: 0,
      total: 129.98,
      totalNet: 129.98
    },
    {
      type: "service",
      data: {
        champ: "",
        nom: { label: "Formatage + installation", value: "format", price: 40 },
        price: 40
      },
      remise: 0,
      total: 40,
      totalNet: 40
    },
    {
      type: "main_oeuvre",
      data: {
        champ: "",
        nom: { label: "Soudure composant", value: "soudure", price: 45 },
        price: 45
      },
      remise: 0,
      total: 45,
      totalNet: 45
    },
    {
      type: "piece",
      data: {
        champ: "",
        nom: { value: "ecran_samsung_s21", label: "Écran Samsung Galaxy S21", price: 120 },
        price: 120,
        qte: 1
      },
      remise: "40",
      total: 80,
      totalNet: 120
    }
  ],
  id: "",
  notification: {
    casier: "",
    delai: "48",
    devis: "2",
    email: true,
    etat: "rep_en_cours",
    materiel: true,
    materielTitle: "azerty",
    sms: true
  },
  paid: -0.02,
  payment: {
    data: [
      {
        amount: 200,
        date: "2025-08-08T00:00:00+01:00",
        methode: { label: "Virement", value: "virement" }
      },
      {
        id: 1,
        amount: 70,
        date: "2025-08-08T00:00:00+01:00",
        methode: { label: "Éspece", value: "espece" }
      }
    ],
    quali: true
  },
  remise: 50,
  rest: -0.02,
  total: 319.98
};

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ReparationAddView currentReparation={testData}/>
    </>
  );
}
