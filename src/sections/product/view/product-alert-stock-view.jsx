import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbar
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductTableToolbar } from '../product-table-toolbar';
import { ProductTableFiltersResult } from '../product-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderRefInterne,
  RenderCellPriceBuy,
} from '../product-table-row';
import { ProductQuantityAdjust } from '../product-quantity-adjust';
import ProductAlertToolbar from '../product-alert-toolbar';
// import { ProductAlertToolbar } from '../product-alert-toolbar';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];
// const categoryOptions = [
//     { value: 'Ecran', label: 'Ecran'},
//     { value: 'Furniture', label: 'Furniture'},
//     { value: 'Clothing', label: 'Clothing'},
// ]
const categoryOptions = [
  {
    label: 'Ecran',
    value: 'Ecran',
    childrens: [
      {
        label: 'Ecran LCD',
        value: 'Ecran LCD'
      },
      {
        label: 'TV',
        value: 'TV'
      }
    ]
  },
  {
    label: 'Catégorie 1',
    value: 'Catégorie 1',
    childrens: [
      {
        label: 'Sous 1',
        value: 'Sous 1'
      },
      {
        label: 'Sous 2',
        value: 'Sous 2'
      }
    ]
  }
]
const HIDE_COLUMNS = { category: false, sousCategory: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProductAlertStockView() {
  const confirmRows = useBoolean();
  const confirmRow = useBoolean();

  const router = useRouter();

  // const { products, productsLoading } = useGetProducts();
//   const categoryOptions = ['Ecran', 'Furniture', 'Clothing'];
const sousCategoryOptions = ['Ecran LCD', 'Tables', 'Shirts'];


  const [products, setProducts] = useState(
    [
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "category": "Ecran",
        "sousCategory": 'Tables',
        "name": "Ecran LCD T44 ",
        "coverUrl": "https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg",
        "refInterne": "Prompec",
        "available": 72,
        "quantity": 80,
        "inventoryType": "en stock",
        "price":82,
        "buy_price":65,
        "fournisseur": "fournisseur 2",
      },
      {
        "id": "e99f09b7-dd88-49d5-b1c8-1daf80c2d7b1",
        "category": "Ecran",
        "sousCategory": "Ecran LCD",
        "name": "Ecran LCD T44 ",
        "coverUrl": "https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg",
        "refInterne": "Prompec",
        "available": 72,
        "quantity": 100,
        "inventoryType": "en stock",
        "price":82,
        "buy_price":65,
        "fournisseur": "fournisseur 2",
      },
      {
        "id": "e99fz9b7-dd88-49d5-b1c8-1daf80c2d7b1",
        "category": "Ecran",
        "sousCategory": "TV",
        "name": "TV T44 ",
        "coverUrl": "https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg",
        "refInterne": "Prompec",
        "available": 0,
        "quantity": -5,
        "inventoryType": "Repture de stock",
        "price":82,
        "buy_price":65,
        "fournisseur": "fournisseur 2",
      },
    ]
  )
  const [selectedRowAdjust, setSelectedRowAdjust] = useState(
    {
      "quantity": 0,
      "fournisseur": "",
      "category": ""
    }
  )
  const adjustDialog = useBoolean();

  const filters = useSetState({ category:"", sousCategory:"" });

  const [tableData, setTableData] = useState([]);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [toDelete, setToDelete] = useState({})

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (products.length) {
      setTableData(products.filter((p)=>p.quantity <= 0));
    }
  }, [products]);

  const canReset = filters.state.category !== "" || filters.state.sousCategory !== "";

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const showDeleteModal = (row) => {
      setToDelete(row)
      confirmRow.onTrue()
    }


  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Delete success!');

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

  function handleAdjust (row){
    console.log(row);
    setSelectedRowAdjust(
      {
        "quantity": row.quantity,
        "fournisseur": row.fournisseur,
        "category": row.category
      }
    )
    adjustDialog.onTrue()
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
      field: 'category',
      headerName: 'Category',
      width: 200,
      type: 'singleSelect',
      valueOptions: categoryOptions,
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
      headerName: 'Sous Catégorie',
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
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="Voir"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Adjustement Quantité"
          onClick={() => handleAdjust(params.row)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:copy-bold-duotone" />}
          label="Dupliquer"
          onClick={() => handleDuplicateRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Supprimer"
          onClick={() => {
            showDeleteModal(params.row);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Alerte de stock"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Stock', href: paths.dashboard.stock.root },
            { name: 'Alerte de stock' },
          ]}
          action={
            <Button
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              href={paths.dashboard.stock.addArticle}
            >
              Ajouter un article
            </Button>
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
            filterMode='client'
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
      {adjustDialog.value && <ProductQuantityAdjust currentProduct={selectedRowAdjust} open={adjustDialog.value} onClose={adjustDialog.onFalse} />}
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
        
        <ProductAlertToolbar filters={filters}
          options={{ category: categoryOptions }} />
        <GridToolbarQuickFilter placeholder='Rechercher...'/>

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

          <GridToolbarColumnsButton />
          <GridToolbarFilterButton ref={setFilterButtonEl} />
          <GridToolbarExport />
          
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
  const { category, sousCategory } = filters;
  
  console.log(filters);
  

  console.log('from applyFilter',category);
  
  if (category) {
    inputData = inputData.filter((product) => category === product.category);
  }
  if (sousCategory) {
    inputData = inputData.filter((product) => sousCategory === product.sousCategory);
  }

  return inputData;
}
