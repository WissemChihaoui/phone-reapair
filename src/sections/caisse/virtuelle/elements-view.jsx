import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ProductItem } from './product-item';
import { ProductSort } from './product-sort';

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

export default function ElementsView() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

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
    append({
        name: row.name,
        stock: row.stock,
        qte: 1,
        remise: 0,
        price: row.price,
        total: 0,
    });
  };

  const renderList = filteredProducts.map((product) => (
    <ProductItem key={product.name} product={product} handleAdd={handleAdd}/>
  ));

  return (
    <Stack display="flex" rowGap={2}>
      <Stack display="flex" flexDirection="row" columnGap={2.5} rowGap={3}>
        <Stack flex={1}>
          <TextField
            label="Rechercher un produit"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </Stack>
        <ProductSort sort={sortOption} sortOptions={SORT_OPTIONS} />
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
          fullWidth
          options={CATEGORIES}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={(event, newValue) => {
            setSelectedCategory(newValue);
            setSelectedSubcategory(null); // Reset subcategory when category changes
          }}
          renderInput={(params) => <TextField {...params} label="Catégories" margin="none" />}
        />

        {/* Subcategories Dropdown */}
        <Autocomplete
          fullWidth
          options={selectedCategory ? SUBCATEGORIES[selectedCategory.id] : []}
          getOptionLabel={(option) => option.name}
          value={selectedSubcategory}
          onChange={(event, newValue) => setSelectedSubcategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Sous Catégories" margin="none" />}
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
  );
}
