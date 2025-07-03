import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function DisplayAttestaionModal({open, onClose}) {
  return (
    <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Attestation d&apos;irréparabilité</DialogTitle>
            <DialogContent>
                <Stack sx={{ p: 1 }}>
                    <Typography variant='span'>Cependant, suite aux tests matériels et techniques réalisés sur le produit. Nous nous avons déclaré techniquement ou économiquement irréparable, suite a un probléme lie:</Typography>
                    <TextField name='attestation' multiline rows={5} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>Fermer</Button>
                <Button variant='contained'>Valider</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
