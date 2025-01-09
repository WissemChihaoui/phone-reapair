import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';

export default function UserSendSms({ phone = '', open, onClose }) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Envoyer SMS</DialogTitle>
        <DialogContent>
          <Stack sx={{ p: 1, display: 'flex', gap: 2 }}>
            <TextField name="phoneNumber" value={phone} label="Numéro de téléphone" />
            <TextField name="smsMessage" label="Message" multiline rows={4} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="contained" color="primary">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
