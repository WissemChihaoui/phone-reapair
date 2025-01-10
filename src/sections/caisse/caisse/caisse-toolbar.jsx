import { Button, Card, CardContent, Stack, Tab } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { today } from 'src/utils/format-time'
import { CustomTabs } from 'src/components/custom-tabs'
import { useBoolean } from 'src/hooks/use-boolean'
import FondCaisseModal from './fond-caisse-modal'

const TABS = [
  { value: 'fond', label:'Fond de la caisse', component: <p>Hey</p>},
  { value: 'retrait', label:'Retrait / Dépot', component: <p>Hey</p>},
  { value: 'verification', label:'Vérification Caisse', component: <p>Hey</p>},
]


export default function CaisseToolbar({ date = today(), tabs}) {
  console.log(date)

  const openFond = useBoolean();

  return (
    <>
        <Card>
            <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Stack display="flex" flexDirection="row" gap={2}>
                <DatePicker name='date' />
                <Button variant='contained' color='primary'>Voir la caisse</Button>
            </Stack>
            <Stack sx={{flex: 1, mx: 2}}>
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
              <Button variant='contained' color='info' onClick={()=>openFond.onTrue()}>Fond de caisse</Button>
              <Button variant='contained'>Ouvrir tiroir caisse</Button>
            </Stack>
            </CardContent>
        </Card>
        <FondCaisseModal open={openFond.value} onClose={openFond.onFalse}/>
    </>
  )
}
