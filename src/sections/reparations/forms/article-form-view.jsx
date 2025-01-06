import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';
import SingleArticleForm from '../single-article-form';

export default function ArticleFormView() {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'products' });
  const [expanded, setExpanded] = useState(null);

  const handleAdd = () => {
    append({});
    setExpanded(null); // Collapse all accordions
  };

  const handleRemove = (index) => {
    remove(index);
    setExpanded(null); // Optionally collapse all after removal
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const total = fields.reduce((sum, field) => sum + (field.total || 0), 0);
  // const totalRemise = fields.reduce((sum, field) => sum + (parseFloat(field.totalRemise) || 0), 0);
  const totalRemise = fields.reduce((sum, field) => sum + (parseFloat(field.totalRemise) || 0), 0);

  const setTotalProducts = useCallback(
    () => {
      setValue('totalHT',total)
      setValue('totalRemise',totalRemise)
      setValue('totalTTC',total-totalRemise)
    },[setValue,total,totalRemise]
)
useEffect(()=> {
  setTotalProducts()
},[total, totalRemise, setTotalProducts,watch])
  return (
    <Box sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Article à réparer
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((_, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
          >
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Stack
                display="flex"
                flexDirection="row"
                width={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">Produit {index + 1}</Typography>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                  onClick={() => handleRemove(index)}
                >
                  Supprimer
                </Button>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <SingleArticleForm index={index}/>
            </AccordionDetails>
          </Accordion>
        ))}
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
          >
            Ajouter Article
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
