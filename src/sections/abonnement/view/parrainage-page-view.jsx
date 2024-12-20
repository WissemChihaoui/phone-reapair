import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material'
import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { DashboardContent } from 'src/layouts/dashboard'
import { paths } from 'src/routes/paths'

export default function ParrainagePageView() {
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
            <Card>
                <CardHeader title='Votre code de parrainage'/>
                <CardContent>
                    <Stack display="flex" gap={4}>
                        <TextField label="Message" rows={4} multiline />
                        <TextField label="Email" />
                    </Stack>
                    <Stack mt={2} width={1} display="flex" alignItems="flex-end">
                        <Button color='primary' variant='contained' sx={{ width: 'max-content'}}>
                            Envoyer
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
    </DashboardContent>
  )
}
