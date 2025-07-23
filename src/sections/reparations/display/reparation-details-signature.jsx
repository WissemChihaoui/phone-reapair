import { Button, Card, CardHeader, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';

export default function ReparationDetailsSignature() {
  const [imageURL, setImageURL] = useState(null);
  console.log(imageURL);

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  return (
    <Card>
      <CardHeader title="Signature" />
      <Stack sx={{ p: 3 }}>
        <Stack sx={{ borderRadius: 1, borderStyle: 'dashed', borderColor: '#f4f4f4' }}>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              className: 'signatureCanvas',
            }}
          />
        </Stack>
        <Stack display="flex" flexDirection="row" gap={1} width="100%" mt={3}>
          <Button variant="contained" onClick={save} color="primary" sx={{ width: '100%' }}>
            Enregistrer
          </Button>
          <Button variant="outlined" onClick={clear} sx={{ width: '100%' }}>
            Réinitialisation
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
