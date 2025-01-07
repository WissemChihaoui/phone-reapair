import { Card, CardHeader, IconButton, Stack } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { CONFIG } from 'src/config-global'

export default function ReparationDetailsCode() {
  return (
    <Card>
        <CardHeader
        title="Code à barre "
        action={
          <IconButton>
            <Iconify icon="material-symbols:print" />
          </IconButton>
        }
      />
        <Stack sx={{ p:3 }}>
            <img alt="Barre à code" src={`${CONFIG.assetsDir}/assets/images/barCode.png`}/>
        </Stack>
    </Card>
  )
}
