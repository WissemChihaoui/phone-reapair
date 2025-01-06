import React, { useCallback, useState } from 'react';
import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import Grid from '@mui/material/Unstable_Grid2';
import { today } from 'src/utils/format-time';
import { paths } from 'src/routes/paths';
import { DisplayDetailsToolbar } from '../display-details-toolbar';

const order = {
    orderNumber: '#145',
    status: 'Cancelled',
    createdAt: today(),

}
export default function DisplayReparationView() {
    const [status, setStatus] = useState(order?.status);

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, []);
  return (
    <>
      <DashboardContent>
      <DisplayDetailsToolbar
        backLink={paths.dashboard.reparations.root}
        orderNumber={order?.orderNumber}
        createdAt={order?.createdAt}
        status={status}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      />
      <Grid container spacing={3}>
      <Grid xs={12} md={8}>
      <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
      <ReparationDetailsItems
              items={order?.items}
              taxes={order?.taxes}
              shipping={order?.shipping}
              discount={order?.discount}
              subtotal={order?.subtotal}
              totalAmount={order?.totalAmount}
            />
      </Stack>
      </Grid>
      </Grid>
      </DashboardContent>
    </>
  );
}
