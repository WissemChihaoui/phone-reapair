import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import { DatePicker } from '@mui/x-date-pickers';
import { Tab, Box, Card, Stack, Button, Dialog, CardContent, DialogActions } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { today } from 'src/utils/format-time';

import { CustomTabs } from 'src/components/custom-tabs';
import ClotureCaissePDF from './ClotureCaissePDF';

const TABS = [
  { value: 'fond', label: 'Fond de la caisse', component: <p>Hey</p> },
  { value: 'retrait', label: 'Retrait / Dépot', component: <p>Hey</p> },
  { value: 'verification', label: 'Vérification Caisse', component: <p>Hey</p> },
];

export default function CaisseToolbar({ date = today(), tabs }) {
  console.log(date);

  const open = useBoolean();

  return (
    <>
      <Card>
        <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Stack display="flex" flexDirection="row" gap={2}>
            <DatePicker name="date" />
            <Button variant="contained" color="primary">
              Voir la caisse
            </Button>
            <Button onClick={open.onTrue} variant="contained" color="success">
              Z de Caisse
            </Button>
          </Stack>
          <Stack sx={{ flex: 1, mx: 2 }}>
            <CustomTabs
              value={tabs.value}
              onChange={tabs.onChange}
              variant="fullWidth"
              slotProps={{ tab: { px: 0 } }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </CustomTabs>
          </Stack>
          <Stack display="flex" flexDirection="row" gap={2}>
            <Button variant="contained">Ouvrir tiroir caisse</Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog fullScreen open={open.value} onClose={open.onFalse}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={open.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <ClotureCaissePDF date="08-08-2025"/>
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
