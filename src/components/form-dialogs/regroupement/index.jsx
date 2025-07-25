import React from 'react'

import { Box, Dialog, DialogTitle } from '@mui/material'

import RegroupementForm from 'src/sections/product/regroupement-form'

export default function AddRegroupementDialog({ open, onClose }) {
  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>Ajouter un regroupement</DialogTitle>
        
            <RegroupementForm />
    </Dialog>
  )
}
