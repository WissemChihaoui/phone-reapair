import React from 'react';

import { Tab, Card, Stack, Button, CardContent } from '@mui/material';

import { today } from 'src/utils/format-time';

import { CustomTabs } from 'src/components/custom-tabs';

const TABS = [
  { value: 'fond', label: 'Fond de la caisse', component: <p>Hey</p> },
  { value: 'retrait', label: 'Retrait / Dépot', component: <p>Hey</p> },
  { value: 'verification', label: 'Vérification Caisse', component: <p>Hey</p> },
];

export default function CaisseToolbar({ date = today(), tabs }) {
  console.log(date);


  return (
    <Card>
        <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          
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
  );
}
