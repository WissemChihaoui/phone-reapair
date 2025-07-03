import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

export default function MarqueAddModal({open, onClose}) {
  return (
    <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter Marque</DialogTitle>
            <DialogContent>
                <Box p={1}>
                    <TextField name='marqueName' />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained'>Ajouter</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
