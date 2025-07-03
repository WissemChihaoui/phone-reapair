import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function ModeleAddModal({open, onClose}) {
  return (
    <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter Modéle</DialogTitle>
            <DialogContent>
                <Box p={1}>
                    <TextField name='modelName' />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained'>Ajouter</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
