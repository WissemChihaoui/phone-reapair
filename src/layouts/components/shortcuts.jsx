import React from 'react'

import { Fab, Stack } from '@mui/material'

import { Iconify } from 'src/components/iconify'

export default function Shortcuts() {
  return (
    <Stack direction="row" spacing={1}>
        <Fab size='small' color='primary'>
            <Iconify icon="uil:processor" />
        </Fab>
        <Fab size='small' color='info'>
            <Iconify icon="mdi:printer-outline" />
        </Fab>
        <Fab size='small' color='warning'>
            <Iconify icon="famicons:card-outline" />
        </Fab>
        <Fab size='small' color='success'>
            <Iconify icon="akar-icons:file" />
        </Fab>
        <Fab size='small' color='inherit'>
            <Iconify icon="majesticons:calendar-line" />
        </Fab>
    </Stack>
  )
}
