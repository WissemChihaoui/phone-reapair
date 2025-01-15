import React from 'react';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { CompactContent } from 'src/layouts/simple';
import { CONFIG } from 'src/config-global';
import { Field, Form } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';


export const SuivreSchema = zod.object({
    serie : zod.string().min(1, { message: 'Numéro de série est requis!'})
})
export default function SuiviPageView() {
    const route = useRouter()
    const defaultValues = { serie: ''}
    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(SuivreSchema),
        defaultValues,
      });

      const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const onSubmit = handleSubmit(async (data) => {
        try {
          console.log("Done");
          route.replace(paths.suivi.details(data.serie))
        } catch (error) {
          console.error(error);
        }
      });
  return (
    <>
      <CompactContent>
        <Form methods={methods} onSubmit={onSubmit}>
            <Card>
              <CardContent>
                <Box
                  alt="Full logo"
                  component="img"
                  src={`${CONFIG.assetsDir}/logo/oneSuivi.png`}
                  width="100%"
                  height="100%"
                />
                <Typography sx={{ mb: 2 }} variant="h4">
                  Plate-forme de suivie pour vos réparations smartphone et informatique.
                </Typography>
                <Field.Text
                  name="serie"
                  label="Numéro de suivi"
                  helperText="Veuillez entrer votre numéro de suivi afin de suivre votre réparation en cours"
                />
              </CardContent>
              <CardActions>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting} fullWidth color="primary">
                  Valider
                </LoadingButton>
              </CardActions>
            </Card>
        </Form>
      </CompactContent>
    </>
  );
}
