import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import {
  Card,
  Chip,
  Grid,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function ParrainagePageView() {
  const { copy } = useCopyToClipboard();
  const codeParrain = 'ABC12345';
  const inviteLink = 'https://www.voyage-prive.com/login/signup/NoN00/26635822';
  const [emailFields, setEmailFields] = useState(['', '']); // initial 2 email fields

  const handleAddEmailField = () => {
    setEmailFields([...emailFields, '']);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emailFields];
    updatedEmails[index] = value;
    setEmailFields(updatedEmails);
  };

  const handleCopy = useCallback((item) => {
    toast.success('Copié!');
    copy(item);
  }, [copy]);
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Parrainage"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Abonnements', href: paths.dashboard.abonnement.root },
          { name: 'Parrainage' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Filleuls & Invitation */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Parrainage Code */}
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title="Parrainage"
              action={<Chip label="Limité à 10 filleuls" color="info" variant="outlined" />}
            />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Votre code parrain :
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField fullWidth value={codeParrain} InputProps={{ readOnly: true }} />
                <Button onClick={()=> handleCopy(codeParrain)} variant="outlined" startIcon={<Iconify icon="solar:copy-bold" />}>
                  Copier
                </Button>
              </Stack>
              <Typography variant="body2" mt={2}>
                Partagez ce code par vos propres moyens (email, téléphone, réseaux sociaux).
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1" gutterBottom>
                Récompenses
              </Typography>
              <ul>
                <li>5 € en bon d’achat par filleul qui valide une commande</li>
                <li>Bons cumulables, valables 12 mois</li>
                <li>Non remboursables, non sécables, utilisables une seule fois</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Votre code de parrainage" />
            <CardContent>
              <Stack display="flex" gap={4}>
                <TextField label="Message" rows={4} multiline />
                <TextField label="Email" />
              </Stack>
              <Stack mt={2} width={1} display="flex" alignItems="flex-end">
                <Button color="primary" variant="contained" sx={{ width: 'max-content' }}>
                  Envoyer
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Filleuls */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Filleuls" />
            <CardContent>
              <Stack spacing={2}>
                <FilleulItem name="Sarah" status="validée" />
                <FilleulItem name="Youssef" status="en_attente" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Inviter via un lien */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Inviter via un lien" />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField fullWidth value={inviteLink} InputProps={{ readOnly: true }} />
                  <Button onClick={()=> handleCopy(inviteLink)} variant="outlined" startIcon={<Iconify icon="solar:copy-bold" />}>
                    Copier
                  </Button>
                </Stack>

                <Typography variant="subtitle2">Inviter par email</Typography>

                {/* Render email input fields dynamically */}
                {emailFields.map((email, index) => (
                  <TextField
                    key={index}
                    label={`Email ${index + 1}`}
                    fullWidth
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                ))}

                <Button variant="outlined" size="small" onClick={handleAddEmailField}>
                  + Inviter plus d’amis
                </Button>

                <Button variant="contained" color="primary">
                  Envoyer
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

function FilleulItem({ name, status }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}
    >
      <Typography>{name}</Typography>
      {status === 'validée' ? (
        <Chip label="Commande validée" color="success" size="small" />
      ) : (
        <Chip label="En attente" color="warning" size="small" />
      )}
    </Stack>
  );
}
