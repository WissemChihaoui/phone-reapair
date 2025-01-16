import React, { useCallback, useState } from 'react'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import { UploadBox } from 'src/components/upload'
import { Image } from 'src/components/image'
import { Iconify } from 'src/components/iconify'
import MaterialCard from './components/material-card'

export default function MaterialDnd({ deleteData, data, addData, editData }) {
    const openAdd = useBoolean()
    const [files, setFiles] = useState();
    const [addField, setAddField] = useState('')

    console.log(files);

    const addCasier = () => {
       if(addField){
        addData(addField);
        openAdd.onFalse();
        setAddField('')
       }
    }

    const handleDrop = useCallback(
      (acceptedFiles) => {
        setFiles(acceptedFiles);
      },
      []
    );
    
  return (
    <>
    <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' }}
      >
        {data.map((item) => <MaterialCard deleteData={deleteData} item={item} editData={editData}/>)}
        <MaterialCard add openAdd={openAdd}/>
    </Box>

    <Dialog open={openAdd.value} onClose={openAdd.onFalse}>
        <DialogTitle>Ajouter un type de matériel</DialogTitle>

        <DialogContent>
          
          <Alert sx={{ mb : 2}} severity='warning'>
            Veuillez vérifier que le nom de type n&apos;existe pas
          </Alert>
          <UploadBox
                onDrop={handleDrop}
                placeholder={
                  files ? (
                    <Image src={files[0].path}/>
                  ): (
                    <Box
                    sx={{
                      gap: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.disabled',
                      flexDirection: 'column',
                    }}
                  >
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Upload file</Typography>
                  </Box>
                  )
                }
                sx={{
                  py: 2.5,
                  width: 'auto',
                  height: 'auto',
                  borderRadius: 1.5,
                  mb: 2
                }}
              />
          <TextField value={addField} onChange={(e)=> setAddField(e.target.value)} autoFocus fullWidth type="text" variant="outlined" label="Nom du type" />
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
