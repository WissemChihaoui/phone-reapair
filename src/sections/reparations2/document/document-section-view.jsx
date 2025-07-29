import React from 'react';

import {
  Box,
  Grid,
  Stack,
  Button,
  Divider,
  Tooltip,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import PieceForm from './forms/piece-form';
import OeuvreForm from './forms/oeuvre-form';
import GroupeForm from './forms/groupe-form';
import ServiceForm from './forms/service-form';
import AbonnementForm from './forms/abonnement-form';

const DocumentComponents = {
  piece: PieceForm,
  oeuvre: OeuvreForm,
  service: ServiceForm,
  group: GroupeForm,
  abonnement: AbonnementForm,
  divider: () => <Divider sx={{ my: 2 }} />,
  subtotal: ({ data, onRemove }) => (
    <Box position="relative">
      <IconButton color="error" onClick={onRemove} sx={{ position: 'absolute', left: 8 }}>
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle2">
          {data?.label || 'Sous-total HT'}: {data?.value?.toFixed(2) || '0.00'} €
        </Typography>
      </Stack>
    </Box>
  ),
  total: ({ data, onRemove }) => (
    <Box position="relative">
      <IconButton color="error" onClick={onRemove} sx={{ position: 'absolute', left: 8 }}>
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle1">
          {data?.label || 'TOTAL'}: {data?.value?.toFixed(2) || '0.00'} €
        </Typography>
      </Stack>
    </Box>
  ),
};

export default function DocumentSectionView({
  articleIndex,
  documents = [],
  onAddDocument,
  onRemoveDocument,
  onUpdateDocument,
  onTotalChange,
}) {
  const popover = usePopover();

  const calculateDocumentTotal = (doc) => {
    switch (doc.type) {
      case 'piece':
        return doc.data.price * doc.data.qte * (1 - doc.data.remise / 100);
      case 'abonnement':
        return doc.data.price * doc.data.qte * (1 - doc.data.remise / 100);
      case 'oeuvre':
      case 'service':
        return doc.data.price || 0;
      case 'group':
        return doc.data.items?.reduce((sum, item) => sum + (item.value || 0), 0) || 0;
      default:
        return 0;
    }
  };

  const updateDocumentAndTotals = (index, updatedDoc) => {
    onUpdateDocument(index, updatedDoc);
    updateArticleTotal();
  };

  const updateArticleTotal = () => {
    const total = documents.reduce((sum, doc) => {
      if (['piece', 'oeuvre', 'service', 'group', 'abonnement'].includes(doc.type)) {
        return sum + calculateDocumentTotal(doc);
      }
      return sum;
    }, 0);

    onTotalChange(total);
  };

  const handleAddElement = (type) => {
    const defaultData = {
      piece: { nom: '', price: 0, qte: 1, remise: 0 },
      abonnement: { nom: '', price: 0, qte: 1, remise: 0 },
      oeuvre: { nom: '', price: 0 },
      service: { nom: '', price: 0 },
      group: { nom: '', items: [] },
      subtotal: { label: 'Sous-total HT', value: 0 },
      total: { label: 'TOTAL', value: 0 },
    };

    const newDoc = {
      id: Date.now().toString(),
      type,
      data: defaultData[type] || {},
    };

    onAddDocument(newDoc);

    // Update totals if adding a priced element
    if (['piece', 'oeuvre', 'service', 'group', 'abonnement'].includes(type)) {
      setTimeout(updateArticleTotal, 100); // Small delay to ensure state updates
    }

    popover.onClose();
  };

  const handleRemoveElement = (index) => {
    const doc = documents[index];
    onRemoveDocument(index);

    // Update totals if removing a priced element
    if (['piece', 'oeuvre', 'service', 'group', 'abonnement'].includes(doc?.type)) {
      setTimeout(updateArticleTotal, 100);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={3}>
          <Box p={4}>
            <Stack spacing={2}>
              <Stack direction="row">
                <Button
                  onClick={() => handleAddElement('piece')}
                  startIcon={<Iconify icon="mdi:plus" />}
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                >
                  Pièce à changer
                </Button>
                
              </Stack>
              <Stack direction="row">
                <Button
                  onClick={() => handleAddElement('group')}
                  startIcon={<Iconify icon="mdi:plus" />}
                  variant="contained"
                  color="warning"
                  sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                >
                  Regroupement
                </Button>
                <Tooltip
                  title={`Cette fonctionnalité permet à la boutique de regrouper plusieurs articles sous un seul nom, afin de :
- Créer des offres commerciales ou des packs (ex. : "Pack protection téléphone" incluant coque + verre trempé + écouteur),
- Simplifier la facture pour le client final, en n’affichant que le nom du regroupement au lieu de la liste détaillée des articles.`}
                >
                  <IconButton>
                    <Iconify icon="material-symbols:info-outline-rounded" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack direction="row">
                <Button
                  onClick={() => handleAddElement('service')}
                  startIcon={<Iconify icon="mdi:plus" />}
                  variant="contained"
                  color="success"
                  sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                >
                  Service
                </Button>
                
              </Stack>
              <Stack direction="row">
                <Button
                  onClick={() => handleAddElement('oeuvre')}
                  startIcon={<Iconify icon="mdi:plus" />}
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                >
                  Main d&apos;oeuvre
                </Button>
                
              </Stack>

              <Button
                onClick={popover.onOpen}
                startIcon={<Iconify icon="mdi:plus" />}
                variant="outlined"
                color="info"
              >
                Ajouter élément
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Grid xs={12} md={9}>
          <Stack spacing={3}>
            {documents.map((doc, index) => {
              const Component = DocumentComponents[doc.type];
              if (!Component) return null;

              return (
                <Component
                  key={doc.id}
                  data={doc.data}
                  onUpdate={(newData) =>
                    updateDocumentAndTotals(index, {
                      ...doc,
                      data: { ...doc.data, ...newData },
                    })
                  }
                  onRemove={() => handleRemoveElement(index)}
                />
              );
            })}
          </Stack>
        </Grid>
      </Grid>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem onClick={() => handleAddElement('subtotal')}>
            <Iconify icon="mdi:calculator" width={20} sx={{ mr: 1 }} />
            Sous-total
          </MenuItem>
          <MenuItem onClick={() => handleAddElement('total')}>
            <Iconify icon="mdi:calculator-variant" width={20} sx={{ mr: 1 }} />
            Total
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleAddElement('divider')}>
            <Iconify icon="mdi:minus" width={20} sx={{ mr: 1 }} />
            Ligne de séparation
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
