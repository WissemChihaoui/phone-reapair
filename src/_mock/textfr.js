export const customLocaleText = {
  // Pagination
  toolbarDensity: 'Densité',
  toolbarColumns: 'Colonnes',
  toolbarFilters: 'Filtres',
  toolbarExport: 'Exporter',
  toolbarQuickFilterPlaceholder: 'Recherche…',

  footerRowSelected: (count) =>
    count > 1 ? `${count.toLocaleString()} lignes sélectionnées` : `${count} ligne sélectionnée`,
  footerTotalRows: 'Total de lignes:',
  footerPaginationRowsPerPage: 'Lignes par page:', // ✅ <- This is the "Rows per page" label
  MuiTablePagination: {
    labelRowsPerPage: 'Lignes par page:', // ✅ <- MUI v5 fallback
  },

  // No rows
  noRowsLabel: 'Aucune ligne',
  noResultsOverlayLabel: 'Pas de résultats',

  // Column menu
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Afficher les colonnes',
  columnMenuFilter: 'Filtrer',
  columnMenuHideColumn: 'Cacher',
  columnMenuUnsort: 'Annuler le tri',
  columnMenuSortAsc: 'Trier par ordre croissant',
  columnMenuSortDesc: 'Trier par ordre décroissant',

  // Filter
  filterPanelOperators: 'Opérateurs',
  filterPanelColumns: 'Colonnes',
  filterPanelInputLabel: 'Valeur',
  filterPanelInputPlaceholder: 'Filtrer la valeur...',

  // Columns panel
  columnsPanelTextFieldLabel: 'Trouver une colonne',
  columnsPanelTextFieldPlaceholder: 'Titre de colonne',
  columnsPanelDragIconLabel: 'Réorganiser la colonne',
  columnsPanelShowAllButton: 'Tout afficher',
  columnsPanelHideAllButton: 'Tout cacher',

  // Other optional keys can be added too
};
