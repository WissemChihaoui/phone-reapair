import React from 'react';
import SignaturePad from 'react-signature-canvas';

import {
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Editor } from 'src/components/editor';


export default function DisplayAttestaionModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Attestation d&apos;irréparabilité</DialogTitle>
      <DialogContent>
        <Stack sx={{ p: 1 }} spacing={1}>
          <Typography variant="span">
            Cependant, suite aux tests matériels et techniques réalisés sur le produit. Nous nous
            avons déclaré techniquement ou économiquement irréparable, suite a un probléme lie:
          </Typography>
          <Editor />
          <Stack >
              <Typography variant='caption' >Signature</Typography>
              <SignaturePad style={{bgColor: "f0f0f0"}}/>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="contained">Valider</Button>
      </DialogActions>
    </Dialog>
  );
}
