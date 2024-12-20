import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Alert, Card, CardContent, CardHeader, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { BookingIllustration, CheckInIllustration, CheckoutIllustration } from 'src/assets/illustrations';
import { fDate } from 'src/utils/format-time';
import { Label } from 'src/components/label';
import { AbonnementWidgetSummary } from '../course-widget-summary';

export default function AbonnementPageView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Mes Abonnements"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Abonnements', href: paths.dashboard.abonnement.root },
            { name: 'Page' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Grid container spacing={2}>
          <Grid xs={12} lg={4}>
            <AbonnementWidgetSummary 
             title="Date de début du contrat"
             data={fDate('2024-11-25T12:41:34+01:00')}
             icon={<BookingIllustration />}
            />
          </Grid>
          <Grid xs={12} lg={4}>
            <AbonnementWidgetSummary 
             title="Date de fin du contrat"
             data={fDate('2024-12-25T12:41:34+01:00')}
             icon={<CheckoutIllustration />}
            />
          </Grid>
          <Grid xs={12} lg={4}>
            <AbonnementWidgetSummary 
             title="Période restante"
             data='5 jours'
             icon={<CheckInIllustration />}
            />
          </Grid>
          <Grid xs={12}>
            <Alert severity='info'>
                Si vous êtes déjà client, vous avez la possibilité de renouveler votre abonnement en vous connectant à notre centre d&apos;achats <Link href="https://repfonepro.fr/" target="_blank" rel="noopener">Acheter un pack</Link> sinon veuillez créer un compte.
            </Alert>
          </Grid>
          <Grid xs={12}>
            <Card>
                <CardHeader>Mes Parrains</CardHeader>
                <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Boutique</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Téléphone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Label>Boutique 1</Label>
                            </TableCell>
                            <TableCell>contact@allorepairphone.fr</TableCell>
                            <TableCell>	0613410461</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
