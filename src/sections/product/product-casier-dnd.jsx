import React, { useState } from 'react'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import CasierCard from './components/casier-card'

export default function ProductCasierDnd({ deleteData, data, addData, editData }) {
    const openAdd = useBoolean()

    const [addField, setAddField] = useState('')

    console.log(openAdd);

    const addCasier = () => {
       if(addField){
        addData(addField);
        openAdd.onFalse();
        setAddField('')
       }
    }
    
  return (
    <>
    <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' }}
      >
        {data.map((item) => <CasierCard deleteData={deleteData} item={item} editData={editData}/>)}
        <CasierCard add openAdd={openAdd}/>
    </Box>

    <Dialog open={openAdd.value} onClose={openAdd.onFalse}>
        <DialogTitle>Ajouter une casier de stockage</DialogTitle>

        <DialogContent>
          
          <Alert sx={{ mb : 2}} severity='warning'>
            Veuillez vérifier que le nom de caissier n&apos;existe pas
          </Alert>

          <TextField value={addField} onChange={(e)=> setAddField(e.target.value)} autoFocus fullWidth type="text" variant="outlined" label="Nom du cassier" />
        </DialogContent>

        <DialogActions>
          <Button onClick={openAdd.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={()=>addCasier()} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
