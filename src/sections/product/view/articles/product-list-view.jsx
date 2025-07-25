import { PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  Box,
  Fab,
  Input,
  Dialog,
  MenuItem,
  MenuList,
  InputLabel,
  DialogActions,
} from '@mui/material';
import {
  DataGrid,
  gridClasses,
  GridToolbar,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { _articlesList } from 'src/_mock/_articles';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ProductTableToolbar } from '../../product-table-toolbar';
import { ProductQuantityAdjust } from '../../product-quantity-adjust';
import { ProductTableFiltersResult } from '../../product-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderRefInterne,
  RenderCellProduct,
  RenderCellPriceBuy,
} from '../../product-table-row';
import EtatStockPdf from '../../etat-stock-pdf';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false, sousCategory: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProductListView() {
  const confirmRows = useBoolean();
  const confirmRow = useBoolean();
  const view = useBoolean();

  const popover = usePopover();
  const stock = usePopover();

  const router = useRouter();

  const categoryOptions = ['Ecran', 'Furniture', 'Clothing'];
  const sousCategoryOptions = ['Ecran LCD', 'Tables', 'Shirts'];
  const newCategories = [
    {
      label: 'Ecran',
      childrens: [
        {
          label: 'Ecran LCD',
        },
        {
          label: 'TV',
        },
      ],
    },
    {
      label: 'Catégorie 1',
      childrens: [
        {
          label: 'Sous 1',
        },
        {
          label: 'Sous 2',
        },
      ],
    },
  ];

  const [products, setProducts] = useState(_articlesList);
  const [selectedRowAdjust, setSelectedRowAdjust] = useState({
    quantity: 0,
    fournisseur: '',
    category: '',
  });
  const adjustDialog = useBoolean();

  const filters = useSetState({ publish: [], stock: [] });

  const [tableData, setTableData] = useState([]);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [toDelete, setToDelete] = useState({});

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const showDeleteModal = (row) => {
    setToDelete(row);
    confirmRow.onTrue();
  };

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Suppression du succès !');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Suppression du succès !');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.stock.editArticle(id));
    },
    [router]
  );

  const handleDuplicateRow = useCallback(
    (id) => {
      router.push(paths.dashboard.stock.duplicate(id));
    },
    [router]
  );

  function handleAdjust(row) {
    console.log(row);
    setSelectedRowAdjust({
      quantity: row.quantity,
      fournisseur: row.fournisseur,
      category: row.category,
    });
    adjustDialog.onTrue();
  }

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
        categoryOptions={categoryOptions}
        sousCategoryOptions={sousCategoryOptions}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns = [
    {
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 210,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack display="flex" gap={1} flexDirection="row" flexWrap="wrap">
          <Fab
            whileTap="tap"
            whileHover="hover"
            color="primary"
            size="small"
            onClick={() => handleEditRow(params.row.id)}
          >
            <Iconify icon="solar:eye-bold" />
          </Fab>
          <Fab
            whileTap="tap"
            whileHover="hover"
            color="success"
            size="small"
            onClick={() => handleAdjust(params.row)}
          >
            <Iconify icon="solar:pen-bold" />
          </Fab>
          <Fab
            whileTap="tap"
            whileHover="hover"
            color="warning"
            size="small"
            onClick={() => handleDuplicateRow(params.row.id)}
          >
            <Iconify icon="solar:copy-bold-duotone" />
          </Fab>
          <Fab
            whileTap="tap"
            whileHover="hover"
            color="error"
            size="small"
            onClick={() => showDeleteModal(params.row)}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </Fab>
        </Stack>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      type: 'singleSelect',
      valueOptions: newCategories,
    },
    {
      field: 'name',
      headerName: 'Article',
      flex: 1,
      minWidth: 360,
      hideable: false,
      filterable: false,
      renderCell: (params) => (
        <RenderCellProduct params={params} onViewRow={() => handleEditRow(params.row.id)} />
      ),
    },
    {
      field: 'sousCategory',
      headerName: 'Sous Category',
      width: 200,
      type: 'singleSelect',
      valueOptions: sousCategoryOptions,
    },
    {
      field: 'refInterne',
      headerName: 'Ref Interne',
      filterable: false,
      width: 160,
      renderCell: (params) => <RenderRefInterne params={params} />,
    },
    {
      field: 'inventoryType',
      headerName: 'Stock',
      filterable: false,
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'price',
      headerName: 'Prix TTC',
      filterable: false,
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: 'buy_price',
      headerName: "Prix d'achat",
      filterable: false,
      width: 110,
      editable: true,
      renderCell: (params) => <RenderCellPriceBuy params={params} />,
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const handleCsvDownload = () => {
    const csvContent = 'category,name,sousCategory,refInterne,inventoryType,price,buy_price\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_articles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCsvImport = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      toast.success(`Fichier CSV "${file.name}" prêt à être importé.`);
    } else {
      toast.error('Veuillez sélectionner un fichier CSV valide.');
    }
  };

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Liste des articles"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Stock', href: paths.dashboard.stock.root },
            { name: 'Liste des articles' },
          ]}
          action={
            <Stack spacing={2} flexDirection="row">
              <Button
                component={RouterLink}
                color='primary'
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                href={paths.dashboard.stock.addArticle}
              >
                Ajouter un article
              </Button>
              <Button
                color='primary'
                variant="outlined"
                onClick={popover.onOpen}
                startIcon={<Iconify icon="solar:import-bold" />}
              >
                Importer CSV
              </Button>
              <Button
                color='primary'
                variant="outlined"
                onClick={stock.onOpen}
                startIcon={<Iconify icon="solar:import-bold" />}
              >
                Etat du stock
              </Button>
              <Button
                color='primary'
                variant="outlined"
                LinkComponent={RouterLink}
                href={paths.dashboard.stock.import}
                startIcon={<Iconify icon="solar:import-bold" />}
              >
                Importer une facture
              </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            filterMode="client"
            components={{
              Toolbar: GridToolbar, // Add filter button
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true, // Optional: Quick filter for searching
              },
            }}
            // loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback,
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="Pas de données" />,
            }}
            slotProps={{
              panel: { anchorEl: filterButtonEl },
              toolbar: { setFilterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>
      {/* <UserQuickEditForm currentUser={products[0]} open={adjustDialog.value} onClose={adjustDialog.onFalse} /> */}
      {adjustDialog.value && (
        <ProductQuantityAdjust
          currentProduct={selectedRowAdjust}
          open={adjustDialog.value}
          onClose={adjustDialog.onFalse}
        />
      )}
      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {selectedRowIds.length} </strong> articles?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />
      <ConfirmDialog
        open={confirmRow.value}
        onClose={confirmRow.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {toDelete.name} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRow(toDelete.id);
              confirmRow.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem onClick={handleCsvDownload}>Télécharger format</MenuItem>
          <MenuItem>
            <InputLabel htmlFor="csv-import" style={{ cursor: 'pointer', width: '100%' }}>
              Importer le fichier CSV
            </InputLabel>
            <Input
              id="csv-import"
              type="file"
              inputProps={{ accept: '.csv' }}
              sx={{ display: 'none' }}
              onChange={handleCsvImport}
            />
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <CustomPopover open={stock.open} anchorEl={stock.anchorEl} onClose={stock.onClose}>
        <MenuList>
          <MenuItem onClick={() => {
            view.onTrue();
            stock.onClose();
          }}>PDF</MenuItem>
          <MenuItem onClick={stock.onClose}>CSV</MenuItem>
        </MenuList>

      </CustomPopover>

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <EtatStockPdf
                data={[
                  { title: 'article 1', qty: 10, buyPrice: 5, sellPrice: 6 },
                  // ...
                ]}
                company={{
                  name: 'demo reparateur',
                  address: 'Rue Général Delacroix - Bazin\n97139 Les Abymes',
                  phone: '0690751575',
                  siret: '',
                  tva: '',
                }}
              />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}) {
  return (
    <>
      <GridToolbarContainer>
        <ProductTableToolbar
          filters={filters}
          options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
        />

        <GridToolbarQuickFilter placeholder="Rechercher..." />

        <Stack
          spacing={1}
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              Supprimer ({selectedRowIds.length})
            </Button>
          )}
{/* 
          <GridToolbarColumnsButton />
          <GridToolbarExport /> */}
        </Stack>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
