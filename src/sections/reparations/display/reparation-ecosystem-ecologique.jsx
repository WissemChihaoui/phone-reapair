import React from 'react';

import { Card, Stack, Button, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';
import { Label } from 'src/components/label';

export default function ReparationEcosystemEcologique({ id, status = 3 }) {
  const router = useRouter();

  const renderEcosystem = (
    <Stack direction="row" justifyContent="space-around" width={1} flexGrow={1}>
      <Button
        disabled={status === 2}
        variant="outlined"
        href={paths.dashboard.ecosystem.root(id)}
        LinkComponent={RouterLink}
      >
        <Image src={`${CONFIG.assetsDir}/assets/ecosystem.png`} width={100} />
      </Button>

      {status !== 3 && <Label>Statut ecosystem</Label>}
    </Stack>
  );

  const renderEcologic = (
    <Stack direction="row" justifyContent="space-around" width={1} flexGrow={1}>
      <Button
        disabled={status === 1}
        variant="outlined"
        href={paths.dashboard.ecosystem.root(id)}
        LinkComponent={RouterLink}
      >
        <Image src={`${CONFIG.assetsDir}/assets/ecologic.png`} width={100} />
      </Button>

      {status !== 3 && (
        <Stack spacing={1}>
          <Label>Statut ecosystem</Label>
          <Button variant="contained" color="success">
            Valider
          </Button>
        </Stack>
      )}
    </Stack>
  );
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-around">
          {(status === 1 || status === 3) && renderEcologic}
          {(status === 2 || status === 3) && renderEcosystem}
        </Stack>
      </CardContent>
    </Card>
  );
}
