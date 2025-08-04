import React, { useState, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Box,
  Stack,
  Button,
  Divider,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import SingleArticleForm from '../single-article-form';

export default function ArticleFormView() {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'articles' // Changed from 'products' to 'articles'
  });
  const [expanded, setExpanded] = useState('panel0');

  const handleAddArticle = () => {
    append({
      type: "",
      marque: "",
      modele: "",
      serie: "",
      etat: "",
      accessoire: "",
      rapport: {
        items: [],
        observation: "",
      },
      noteClient: "",
      noteIntervention: "",
      noteInterne: "",
      schemaVer: [],
      dateRestitution: null,
      technicien: "",
      documents: [
        {
          id: "",
          type: "",
          data: {},
        },
      ],
      total: 0,
    });
    setExpanded(`panel${fields.length}`);
  };

  const handleRemoveArticle = (index) => {
    remove(index);
    setExpanded(null);
  };

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Calculate totals across all articles
  const calculateTotals = useCallback(() => {
    const articlesTotal = fields.reduce((sum, article) => sum + (article.total || 0), 0);
    setValue('total', articlesTotal);
    
    // Calculate remaining amount if needed
    const paid = watch('paid') || 0;
    const remise = watch('remise') || 0;
    setValue('rest', articlesTotal - paid - remise);
  }, [fields, setValue, watch]);

  // Watch for changes and recalculate totals
  React.useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name?.startsWith('articles') || name === 'paid' || name === 'remise') {
        calculateTotals();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, calculateTotals]);

  return (
    <Box sx={{ p: 3 }}>
      
      
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((field, index) => (
         <>
              <Stack
                display="flex"
                flexDirection="row"
                width={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  {field.type || `Article ${index + 1}`}
                </Typography>
               
              </Stack>
           
              <SingleArticleForm 
                articleIndex={index} 
                onTotalChange={calculateTotals}
              />
              </>
        ))}

        {/* <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleAddArticle}
            sx={{ flexShrink: 0 }}
          >
            Ajouter Article
          </Button>
        </Stack> */}
      </Stack>
    </Box>
  );
}