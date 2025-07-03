import React, { useCallback, useState } from 'react';
import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import Grid from '@mui/material/Unstable_Grid2';
import { today } from 'src/utils/format-time';
import { paths } from 'src/routes/paths';
import { Stack } from '@mui/material';
import { DisplayDetailsToolbar } from '../display/display-details-toolbar';
import { OrderDetailsItems } from '../display/reparation-details-items';
import {ReparationsDetailsHistory} from '../display/reparation-details-history';
import { ReparationDetailsInfo } from '../display/reparation-details-info';
import ReparationDetailsNotes from '../display/reparation-details-notes';
import ReparationDetailsSignature from '../display/reparation-details-signature';
import ReparationDetailsCode from '../display/reparation-details-code';

export default function DisplayReparationView({order}) {
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
            <Stack spacing={3} >
              <OrderDetailsItems
                items={order?.items}
                taxes={order?.taxes}
                shipping={order?.shipping}
                discount={order?.discount}
                subtotal={order?.subtotal}
                totalAmount={order?.totalAmount}
              />
              <ReparationsDetailsHistory history={order?.history} />
              <ReparationDetailsNotes />
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <ReparationDetailsInfo
              customer={order?.customer}
              delivery={order?.delivery}
              payment={order?.payment}
              shippingAddress={order?.shippingAddress}
            />
            <ReparationDetailsSignature />
            <ReparationDetailsCode />
            </Stack>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
