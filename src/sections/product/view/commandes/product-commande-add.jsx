import React, { useState, useCallback } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Fab,
  Card,
  Link,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  FormControl,
  Autocomplete,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { AddArticleDialog } from 'src/components/form-dialogs/article-rapide';

const TABLE_HEAD = [
  { id: 'article', label: 'Article' },
  { id: 'add', label: '' },
  { id: 'price', label: "Prix d'achat HT" },
  { id: 'quantity', label: 'Quantité' },
  { id: 'totalAmount', label: 'Prix totale', align: 'right' },
  { id: '' },
];

const _FOURNISSEURS = ['fournisseur 1', ' fournisseur 2'];

const ARTICLES = [
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    category: 'Ecran',
    sousCategory: 'Tables',
    name: 'Ecran LCD T44 ',
    coverUrl: 'https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg',
    refInterne: 'Prompec',
    available: 72,
    quantity: 80,
    inventoryType: 'en stock',
    price: 82,
    buy_price: 65,
    fournisseur: 'fournisseur 2',
  },
  {
    id: 'e99f09a7-dd88-79d5-b1c8-1daf80c2d7b1',
    category: 'Ecran',
    sousCategory: 'Tables',
    name: 'Ecran LCD 5 ',
    coverUrl: 'https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg',
    refInterne: 'Prompec',
    available: 72,
    quantity: 80,
    inventoryType: 'en stock',
    price: 82,
    buy_price: 65,
    fournisseur: 'fournisseur 2',
  },
];

export default function ProductCommandeAdd() {
  const open = useBoolean();
  const [order, setOrder] = useState({
    id: '',
    fournisseur: '',
    note: fDate(Date.now()),
    total: 0,
    products: [],
  });

  const handleArticlesChange = useCallback((newValue, index) => {
    setOrder((prev) => {
      const updatedProducts = prev.products.map((product, i) =>
        i === index
          ? {
              ...product,
              id: newValue?.id || '',
              name: newValue?.name || '',
              price: newValue?.price || null,
              coverUrl: newValue?.coverUrl || '',
            }
          : product
      );

      return { ...prev, products: updatedProducts, total: calculateTotal(updatedProducts) };
    });
  }, []);

  const handleAddRow = () => {
    setOrder((prev) => {
      const updatedProducts = [
        ...prev.products,
        { id: '', name: '', price: null, quantity: null, coverUrl: '' },
      ];
      return { ...prev, products: updatedProducts };
    });
  };

  const handleRemoveRow = (index) => {
    setOrder((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts, total: calculateTotal(updatedProducts) };
    });
  };

  const handleProductChange = (index, key, value) => {
    setOrder((prev) => {
      const updatedProducts = prev.products.map((product, i) =>
        i === index ? { ...product, [key]: value } : product
      );
      return { ...prev, products: updatedProducts, total: calculateTotal(updatedProducts) };
    });
  };

  const calculateTotal = (products) =>
    products.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 0), 0);

  const empty = !order.fournisseur || !order.total;

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Ajouter une commande"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Liste des commandes', href: paths.dashboard.stock.commande },
            { name: 'Ajouter' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={<Typography variant="h6">Ajouter Articles</Typography>}
                sx={{ mb: 3 }}
              />
              <CardContent>
                <Scrollbar>
                  <Table sx={{ minWidth: 720 }}>
                    <TableHeadCustom headLabel={TABLE_HEAD} />
                    <TableBody>
                      {order.products.map((row, index) => (
                        <TableRow key={index}>
                          {/* <TableCell>
                          {row.coverUrl && (
                            <Avatar
                              alt={row.name}
                              src={row.coverUrl}
                              variant="rounded"
                              sx={{ width: 64, height: 64, mr: 2 }}
                            />
                          )}
                        </TableCell> */}
                          <TableCell>
                            <FormControl sx={{ my: 3, minWidth: 200 }}>
                              <Autocomplete
                                noOptionsText="Pas de données"
                                options={ARTICLES}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, newValue) => handleArticlesChange(newValue, index)}
                                renderInput={(params) => <TextField {...params} label="Article" />}
                              />

                              <Link target="_blank" variant="caption" href="#">
                                Consulter l&apos;article(sur le site du fournisseur)
                              </Link>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => open.onTrue()}>
                              +
                            </Button>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={row.price || ''}
                              onChange={(e) => handleProductChange(index, 'price', +e.target.value)}
                              label="Prix d'achat"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={row.quantity || ''}
                              onChange={(e) =>
                                handleProductChange(index, 'quantity', +e.target.value)
                              }
                              label="Quantité"
                            />
                          </TableCell>
                          <TableCell align="right">
                            {row.price && row.quantity ? fCurrency(row.price * row.quantity) : ''}
                          </TableCell>
                          <TableCell>
                            <Fab size="small" color="error" onClick={() => handleRemoveRow(index)}>
                              <Iconify icon="solar:trash-bin-minimalistic-bold" />
                            </Fab>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell align="right" colSpan={6}>
                          <Button color="primary" onClick={handleAddRow} variant="contained">
                            Ajouter un article
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Scrollbar>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <FormControl sx={{ mb: 4, width: '100%' }}>
                  <Autocomplete
                    noOptionsText="Pas de données"
                    options={_FOURNISSEURS}
                    value={order.fournisseur} // Ensure this is always a defined value
                    onChange={(_, newValue) =>
                      setOrder((prev) => ({ ...prev, fournisseur: newValue || '' }))
                    }
                    renderInput={(params) => <TextField {...params} label="Fournisseur" />}
                  />
                </FormControl>
                <FormControl sx={{ mb: 4, width: '100%' }}>
                  <TextField
                    label="Note"
                    value={order.note}
                    onChange={(e) => setOrder({ ...order, note: e.target.value })}
                  />
                </FormControl>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box display="flex">
                  <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
                    Total
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      sx={{ display: 'block', color: 'error.main' }}
                    >
                      {fCurrency(order.total)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Button fullWidth size="large" type="submit" variant="contained" disabled={empty}>
              Confirmer la commande
            </Button>
          </Grid>
        </Grid>
      </DashboardContent>
      <AddArticleDialog open={open.value} onClose={open.onFalse} />
    </>
  );
}




