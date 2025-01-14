import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { CompactContent } from 'src/layouts/simple';

const metadata = { title: `Suivi - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <CompactContent>
        <Card>
          <CardContent>
            <Typography sx={{ mb: 2 }} variant='h4'>Plate-forme de suivie pour vos réparations smartphone et informatique.</Typography>
            <TextField name='suivi' label="Numéro de suivi" helperText='Veuillez entrer votre numéro de suivi afin de suivre votre réparation en cours'/>
          </CardContent>
          <CardActions>
            <Button fullWidth variant='contained' color='primary'>Valider</Button>
          </CardActions>
        </Card>
      </CompactContent>
    </>
  );
}
