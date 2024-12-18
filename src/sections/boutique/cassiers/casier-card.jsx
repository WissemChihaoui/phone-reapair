import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItemText, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ConfirmDialog } from 'src/components/custom-dialog'
import { useBoolean } from 'src/hooks/use-boolean'

export default function CasierCard({ item, add, openAdd, deleteData, editData }) {
    const openDelete = useBoolean()
    const openEdit = useBoolean()

    const [nameField, setNameField] = useState(item?.name)


    const editCassier = () => {
        if(nameField){
            editData(nameField, item.id);
            openEdit.onFalse()
        }
    }
  
  return (
    <>
    {item && 
    <Card variant='outlined'>
    <Stack sx={{ p: 3, pb: 2, textAlign: 'center' }}>
        <Typography variant='h6'> {item.name}</Typography>      
    </Stack>
    <Divider sx={{ borderStyle: 'dashed' }} />
    <Box display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}>
        <Button color='error' sx={{borderRadius: "0"}}  onClick={()=>openDelete.onTrue()}>Supprimer</Button>
        <Button variant='contained' onClick={()=>openEdit.onTrue()} sx={{borderRadius: "0"}} >Modifier</Button>
    </Box>
</Card>
    }
    {add &&
        <Button variant='outlined' onClick={()=>openAdd.onTrue()}>
            <Stack sx={{ textAlign: 'center', height: "100%", display:"flex", alignItems:'center', justifyContent: 'center', minHeight: '80px' }}>
                <Typography variant='h6'> Ajouter</Typography>
            </Stack>
        </Button>
    }

<ConfirmDialog
        open={openDelete.value}
        onClose={openDelete.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer la caissier <strong> {item?.name} </strong> ?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
                deleteData(item.id)
                openDelete.onFalse()
            }}
          >
            Supprimer
          </Button>
        }
      />


<Dialog open={openEdit.value} onClose={openEdit.onFalse}>
        <DialogTitle>Modifier ce cassier de rangement</DialogTitle>

        <DialogContent>
          
          <Alert sx={{ mb : 2}} severity='warning'>
            Veuillez vérifier que le nom de caissier n&apos;existe pas
          </Alert>

          <TextField value={nameField} onChange={(e)=> setNameField(e.target.value)} autoFocus fullWidth type="text" variant="outlined" label="Nom du cassier" />
        </DialogContent>

        <DialogActions>
          <Button onClick={openEdit.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={()=>editCassier()} variant="contained">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
