import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Fab,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { fCurrency } from 'src/utils/format-number';
import { Field } from 'src/components/hook-form';
import { IncrementerButton } from 'src/sections/product/components/incrementer-button';
import { Label } from 'src/components/label';
import { TableHeadCustom } from 'src/components/table';
import { CONFIG } from 'src/config-global';
import { EmptyContent } from 'src/components/empty-content';
import { toast } from 'sonner';
import Grid from '@mui/material/Unstable_Grid2';
import ElementsView from './elements-view';
import { ProductSort } from './product-sort';
import { ProductItem } from './product-item';
import TotalView from './total-view';

const TABLE_HEAD = [
  { id: 'name', label: 'Article' },
  { id: 'qte', label: 'Quantité' },
  { id: 'remise', label: 'Remise' },
  { id: 'total', label: 'Total' },
  { id: 'action', label: '' },
];

// Sample categories and subcategories data
export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'appliances', name: 'Appliances' },
];

export const SUBCATEGORIES = {
  electronics: [
    { id: 'phones', name: 'Phones' },
    { id: 'laptops', name: 'Laptops' },
  ],
  appliances: [
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'home', name: 'Home' },
  ],
};

export const PRODUCTS_LIST = [
  {
    name: 'Iphone 12',
    stock: 0,
    price: 500,
    coverUrl:
      'https://images.unsplash.com/photo-1604409273943-ed5b1a083a51?q=80&w=1647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'electronics',
    subcategory: 'phones',
  },
  {
    name: 'MacBook Air',
    stock: 5,
    price: 1200,
    coverUrl:
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'electronics',
    subcategory: 'laptops',
  },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export default function CartView() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const values = watch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_LIST);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('best_seller');

  const SORT_OPTIONS = [
    { value: 'best_seller', label: 'Classer par meilleure vente' },
    { value: 'newest', label: 'Classer par dernier ajout' },
    { value: 'alphabetical', label: 'Classer de A à Z' },
  ];

  const isEmpty = !fields.length;

  const handleRemove = (index) => {
    remove(index);
  };

  const updateOverAllTotal = useCallback(() => {
    const totalQuantities = values.items.reduce((sum, item) => sum + (item.qte || 0), 0);
    const totalWithoutRemise = values.items.reduce(
      (sum, item) => sum + (item.qte || 0) * item.price,
      0
    );
    const totalRemise = values.items.reduce((sum, item) => sum + (item.remise || 0), 0);
    const totalWithRemise = totalWithoutRemise - totalRemise;

    setValue('quantities', totalQuantities);
    setValue('remiseTotale', totalRemise);
    setValue('total', totalWithRemise);
    setValue('subTotal', totalWithoutRemise);

    console.log(totalQuantities, totalRemise, totalWithRemise, totalWithoutRemise);
  }, [setValue, values.items]);

  const handleQuantityChange = (index, newQuantity) => {
    const item = fields[index];
    const remise = values.items[index]?.remise || 0;

    setValue(`items.${index}.qte`, newQuantity);
    updateTotal(index, newQuantity, remise, item.price);
    updateOverAllTotal();
  };

  const handleRemiseChange = (index, newRemise) => {
    const item = fields[index];
    const quantity = values.items[index]?.qte || 1;

    setValue(`items.${index}.remise`, newRemise);
    updateTotal(index, quantity, newRemise, item.price);
    updateOverAllTotal();
  };

  const updateTotal = (index, quantity, remise, price) => {
    const total = price * quantity - remise;
    console.log(total);

    setValue(`items.${index}.total`, total);
  };

  useEffect(() => {
    let filtered = PRODUCTS_LIST;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory.id);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((product) => product.subcategory === selectedSubcategory.id);
    }

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortOption) {
      if (sortOption === 'best_seller') {
        filtered.sort((a, b) => b.sales - a.sales);
      } else if (sortOption === 'newest') {
        filtered.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      } else if (sortOption === 'alphabetical') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, searchText, sortOption]);

  const handleAdd = (row) => {
    const existingIndex = fields.findIndex((item) => item.name === row.name);

    if (existingIndex > -1) {
      // Update the quantity of the existing item
      const newQuantity = values.items[existingIndex].qte + 1;

      if (newQuantity <= row.stock) {
        handleQuantityChange(existingIndex, newQuantity);
      } else {
        toast.error('Limite de stock atteinte !');
      }
    } else {
      // Add new item
      append({
        name: row.name,
        stock: row.stock,
        qte: 1,
        remise: 0,
        price: row.price,
        total: row.price,
      });
    }
  };

  useEffect(() => {
    updateOverAllTotal();
  }, [updateOverAllTotal]);

  const renderList = filteredProducts.map((product) => (
    <ProductItem key={product.name} product={product} handleAdd={handleAdd} />
  ));
  return (
    <>
      <Grid xs={12} lg={6}>
        <Card>
          <CardContent>
            <>
              {isEmpty ? (
                <EmptyContent
                  title="Panier est vide !"
                  description="Veuillez choisir des articles!"
                  imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-cart.svg`}
                  sx={{ pt: 5, pb: 10 }}
                />
              ) : (
                <Table>
                  <TableHeadCustom headLabel={TABLE_HEAD} />
                  <TableBody>
                    {fields.map((item, index) => (
                      <TableRow key={item.id}>
                        {/* Article Name */}
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                              {item.name}
                            </Typography>
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{ typography: 'body2', color: 'text.secondary' }}
                            >
                              Prix: <Label sx={{ ml: 0.5 }}> {fCurrency(item.price)} </Label>
                            </Stack>
                          </Stack>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell>
                          <Box sx={{ width: 88, textAlign: 'right' }}>
                            <IncrementerButton
                              quantity={values.items[index]?.qte || 1}
                              onDecrease={() =>
                                handleQuantityChange(index, (values.items[index]?.qte || 1) - 1)
                              }
                              onIncrease={() =>
                                handleQuantityChange(index, (values.items[index]?.qte || 1) + 1)
                              }
                              disabledDecrease={values.items[index]?.qte <= 1}
                              disabledIncrease={values.items[index]?.qte >= item.stock}
                            />
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: 'text.secondary', mt: 1 }}
                            >
                              Stock: {item.stock}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Remise */}
                        <TableCell>
                          <Field.Text
                            name={`items.${index}.remise`}
                            size="small"
                            sx={{ width: 140 }}
                            onChange={(e) =>
                              handleRemiseChange(index, parseFloat(e.target.value) || 0)
                            }
                            defaultValue={values.items[index]?.remise || 0}
                          />
                        </TableCell>

                        {/* Total */}
                        <TableCell>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {fCurrency(values.items[index]?.total)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Fab onClick={() => handleRemove(index)} size="small" color="error">
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </Fab>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          </CardContent>
        </Card>
        <TotalView />
      </Grid>
      <Grid xs={12} lg={6}>
        <Card>
          <CardContent>
            <Stack display="flex" rowGap={2}>
              <Stack display="flex" flexDirection="row" columnGap={2.5} rowGap={3}>
                <Stack flex={1}>
                  <TextField
                    label="Rechercher un produit"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                </Stack>
                {/* <ProductSort sort={sortOption} sortOptions={SORT_OPTIONS} /> */}
              </Stack>
              <Stack
                display="grid"
                columnGap={2.5}
                rowGap={3}
                gridTemplateColumns={{
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                {/* Categories Dropdown */}
                <Autocomplete
                  noOptionsText="Pas de données"
                  fullWidth
                  options={CATEGORIES}
                  getOptionLabel={(option) => option.name}
                  value={selectedCategory}
                  onChange={(event, newValue) => {
                    setSelectedCategory(newValue);
                    setSelectedSubcategory(null); // Reset subcategory when category changes
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Catégories" margin="none" />
                  )}
                />

                {/* Subcategories Dropdown */}
                <Autocomplete
                  noOptionsText="Pas de données"
                  fullWidth
                  options={selectedCategory ? SUBCATEGORIES[selectedCategory.id] : []}
                  getOptionLabel={(option) => option.name}
                  value={selectedSubcategory}
                  onChange={(event, newValue) => setSelectedSubcategory(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Sous Catégories" margin="none" />
                  )}
                />
              </Stack>

              {/* Product List */}
              <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                {renderList}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
