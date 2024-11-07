import { Box, Button, Card, Icon, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Iconify } from 'src/components/iconify'

export default function SearchReparation() {
    const [loading, setLoading] = useState(true)
  return (
    <Card
    sx={{
      display: 'flex',
      alignItems: 'center',
      height:'100%',
      p: 3,
    }}
  >
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ typography: 'body', textAlign: 'center', fontWeight:'700' }}>Chercher Réparation </Box>
      <Box sx={{ mt: 1.5, mb: 1, typography: 'h3', display: 'flex' }}>
        <TextField 
          placeholder='Chercher par Nom, Email, N° Tel, N° Réparation, Code Barre...'
         fullWidth
          InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ml: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {/* {loading ? <Iconify icon="svg-spinners:8-dots-rotate"/> : null} */}
                  <Button 
                    size="large"
                    variant="contained"
                    color='primary'
                    sx={{mr: -1}}
                    >
                       <Iconify icon="mi:enter" />
                    </Button>
                </>
              ),
            }}
        />
       
      </Box>
    </Box>
  </Card>
  )
}
