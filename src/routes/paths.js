// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    reparations:{
      root: `${ROOTS.DASHBOARD}/reparations`,
      add: `${ROOTS.DASHBOARD}/reparations/add`,
      display:(id) => `${ROOTS.DASHBOARD}/reparations/${id}/display`,
    },
    client: {
      root: `${ROOTS.DASHBOARD}/client`,
      add: `${ROOTS.DASHBOARD}/client/add`,
    },
    stock: {
      root: `${ROOTS.DASHBOARD}/stock`,
      categories: `${ROOTS.DASHBOARD}/stock/categories`,
      stockage: `${ROOTS.DASHBOARD}/stock/stockage`,
      fournisseurs: `${ROOTS.DASHBOARD}/stock/fournisseurs`,
      addArticle: `${ROOTS.DASHBOARD}/stock/add`,
      addCommande: `${ROOTS.DASHBOARD}/stock/commande/add`,
      commande: `${ROOTS.DASHBOARD}/stock/commande`,
      destockage: `${ROOTS.DASHBOARD}/stock/destockage`,
      alertStock: `${ROOTS.DASHBOARD}/stock/alert-stock`,
      editCommande: (id) => `${ROOTS.DASHBOARD}/stock/commande/${id}/edit`,
      editArticle: (id) => `${ROOTS.DASHBOARD}/stock/${id}/edit`,
      duplicate: (id) => `${ROOTS.DASHBOARD}/stock/${id}/duplicate`,
    },
    vente: {
      root: `${ROOTS.DASHBOARD}/vente`,
      add: `${ROOTS.DASHBOARD}/vente/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/vente/${id}/edit`
    },

    rachat: {
      root: `${ROOTS.DASHBOARD}/rachat`,
      add: `${ROOTS.DASHBOARD}/rachat/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/rachat/${id}/edit`
    },

    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`
    },
    caisse: {
      depot: `${ROOTS.DASHBOARD}/caisse/depot`,
      exportComptable: `${ROOTS.DASHBOARD}/caisse/export-comptable`,
      exportComptableMarge: `${ROOTS.DASHBOARD}/caisse/export-comptable-marge`,
      statistiques: `${ROOTS.DASHBOARD}/caisse/statistics`,
    },
    boutique: {
      root: `${ROOTS.DASHBOARD}/boutique`,
      partenaires: `${ROOTS.DASHBOARD}/boutique/partenaires`,
      status: `${ROOTS.DASHBOARD}/boutique/status`,
      methodes: `${ROOTS.DASHBOARD}/boutique/methodes`,
      types: `${ROOTS.DASHBOARD}/boutique/client-types`,
      materialTypes: `${ROOTS.DASHBOARD}/boutique/material-types`,
      conditions: `${ROOTS.DASHBOARD}/boutique/conditions`,
      configurations: `${ROOTS.DASHBOARD}/boutique/configurations`,
      cassierRangements: `${ROOTS.DASHBOARD}/boutique/cassier-rangements`,
      fonctions: `${ROOTS.DASHBOARD}/boutique/fonctions`,
    },
    abonnement: {
      root: `${ROOTS.DASHBOARD}/abonnement`,
      parrainage: `${ROOTS.DASHBOARD}/abonnement/parrainage`,
    },
    calendrier: {
      root: `${ROOTS.DASHBOARD}/calendrier`
    },
    idee: {
      root: `${ROOTS.DASHBOARD}/idee`
    },
    news: {
      root: `${ROOTS.DASHBOARD}/news`,
      view: (title) => `${ROOTS.DASHBOARD}/news/${title}/view`
    },
    support: {
      root: `${ROOTS.DASHBOARD}/support`,
      add: `${ROOTS.DASHBOARD}/support/add`,
      edit: (title) => `${ROOTS.DASHBOARD}/support/${title}/edit`,
    },
  },
};
