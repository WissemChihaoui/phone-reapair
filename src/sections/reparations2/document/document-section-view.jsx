import React, { useState } from 'react';
import { Stack, Button, Typography, Card, CardContent, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { usePopover } from 'src/components/custom-popover';

// Placeholder form components — replace with your real ones
function F1Form({ index }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Formulaire F1 - #{index + 1}</Typography>
        {/* Add F1 fields here */}
      </CardContent>
    </Card>
  );
}

function F2Form({ index }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Formulaire F2 - #{index + 1}</Typography>
      </CardContent>
    </Card>
  );
}

function F3Form({ index }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Formulaire F3 - #{index + 1}</Typography>
      </CardContent>
    </Card>
  );
}

function F4Form({ index }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Formulaire F4 - #{index + 1}</Typography>
      </CardContent>
    </Card>
  );
}

// Mapping form type to component
const formComponents = {
  F1: F1Form,
  F2: F2Form,
  F3: F3Form,
  F4: F4Form,
};

export default function DocumentSectionView({ formIndex }) {
    const popover = usePopover()
    
  const [forms, setForms] = useState([]);

  const handleAddForm = (formKey) => {
    setForms((prev) => [...prev, formKey]);
  };

  return (
    <Grid container spacing={2} sx={{ position: 'relative' }}>
      {/* Button Panel */}
      <Grid xs={12} md={2}>
         <Box
    sx={{
      position: 'sticky',
      top: 100, // adjust depending on your layout
      zIndex: 10,
      bgcolor: 'background.paper',
      borderRadius: 1,
      p: 1,
      boxShadow: (theme) => theme.shadows[1],
    }}
  >
        <Stack spacing={2}>
          <Stack spacing={1} width="100%">
            {['F1', 'F2', 'F3', 'F4'].map((key) => (
              <Button
                key={key}
                onClick={() => handleAddForm(key)}
                color="primary"
                variant="contained"
                fullWidth
              >
                {key}
              </Button>
            ))}
          </Stack>
          <Button color="warning" variant="outlined">
            Ajouter
          </Button>
        </Stack>
        </Box>
      </Grid>

      {/* Form Area */}
      <Grid xs={12} md={10}>
        <Stack spacing={3}>
          {forms.map((formKey, idx) => {
            const FormComponent = formComponents[formKey];
            return <FormComponent key={`${formKey}-${idx}`} index={idx} />;
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
