import React from 'react'

import { Card, Stack, Button, Select, MenuItem, CardHeader, CardActions, FormControl } from '@mui/material'

export default function ReparationDetailsCode() {
  return (
    <Card>
        <>
              <CardHeader
                title="Casier de rangement"
              />
              <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
              <FormControl>
                <Select>
                    <MenuItem value="casier 1">Casier 1</MenuItem>
                </Select>
              </FormControl>
              </Stack>
              <CardActions sx={{justifyContent:'flex-end', display: 'flex', p:2}}>
                <Button variant='contained'>Enregistrer</Button>
              </CardActions>
            </>
    </Card>
  )
}
