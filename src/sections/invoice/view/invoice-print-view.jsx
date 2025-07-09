import styled from '@emotion/styled'
import React, { useState, useCallback } from 'react'

import { Box, Card, Stack, Table, Divider, TableRow, TableBody, TableCell, TableHead, Typography, tableCellClasses } from '@mui/material'

import { paths } from 'src/routes/paths'

import { fDate } from 'src/utils/format-time'
import { fCurrency } from 'src/utils/format-number'

import { INVOICE_STATUS_OPTIONS } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { Label } from 'src/components/label'
import { Scrollbar } from 'src/components/scrollbar'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { InvoiceToolbar } from '../invoice-toolbar'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`& .${tableCellClasses.root}`]: {
    textAlign: 'right',
    borderBottom: 'none',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function InvoicePrintView({invoice}) {
  const [currentStatus, setCurrentStatus] = useState(invoice?.status);

  const handleChangeStatus = useCallback((event) => {
    setCurrentStatus(event.target.value);
  }, []);

  const renderTotal = (
    <>
      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>
          <Box sx={{ mt: 2 }} />
          Total HT
        </TableCell>
        <TableCell width={120} sx={{ typography: 'subtitle2' }}>
          <Box sx={{ mt: 2 }} />
          {fCurrency(invoice?.subtotal)}
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Total TVA </TableCell>
        <TableCell width={120}>{fCurrency(invoice?.taxes)}</TableCell>
      </StyledTableRow>
 <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ typography: 'subtitle1' }}>Total TTC</TableCell>
        <TableCell width={140} sx={{ typography: 'subtitle1' }}>
          {fCurrency(invoice?.totalAmount)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell >Règlement Espèce le 04/07/2025 09:20</TableCell>
        <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
          - {fCurrency(invoice?.shipping)}
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell >Total réglé</TableCell>
        <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
          - {fCurrency(invoice?.shipping)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Total à régler</TableCell>
        <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
          - {fCurrency(invoice?.discount)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ typography: 'subtitle1' }}>Montant Total</TableCell>
        <TableCell width={140} sx={{ typography: 'subtitle1' }}>
          {fCurrency(invoice?.totalAmount)}
        </TableCell>
      </StyledTableRow>

     
    </>
  );

  const renderFooter = (
    <Box gap={2} display="flex" alignItems="center" flexWrap="wrap" sx={{ py: 3 }}>
      <div>
       
        <Typography variant="body2">
          Je déclare avoir pris connaissance et accepté sans réserves les termes des Conditions Générales de Vente, Prestation et SAV ci-jointes et partie intégrante de la relation contractuelle.
        </Typography>
      </div>

     
    </Box>
  );

  const renderList = (
    <Scrollbar sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 960 }}>
        <TableHead>
          <TableRow>
            <TableCell width={40}>#</TableCell>

            <TableCell sx={{ typography: 'subtitle2' }}>PRODUIT</TableCell>

            <TableCell align="right">PRIX HT</TableCell>
            <TableCell>QTE</TableCell>
            <TableCell>TVA</TableCell>


            <TableCell align="right">Total TTC</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {invoice?.items.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <Box sx={{ maxWidth: 560 }}>
                  <Typography variant="subtitle2">{row.title}</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    2554
                  </Typography>
                </Box>
              </TableCell>

              <TableCell align="right">{fCurrency(row.price)}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>20</TableCell>


              <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
            </TableRow>
          ))}

          {renderTotal}
        </TableBody>
      </Table>
    </Scrollbar>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={invoice?.invoiceNumber}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Invoice', href: paths.dashboard.invoice.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <InvoiceToolbar
        invoice={invoice}
        currentStatus={currentStatus || ''}
        onChangeStatus={handleChangeStatus}
        statusOptions={INVOICE_STATUS_OPTIONS}
      />

      <Card sx={{ pt: 5, px: 5 }}>
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Box
            component="img"
            alt="logo"
            src="/logo/logo.png"
            sx={{  height: 30 }}
          />

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Label
              variant="soft"
              color={
                (currentStatus === 'paid' && 'success') ||
                (currentStatus === 'pending' && 'warning') ||
                (currentStatus === 'overdue' && 'error') ||
                'default'
              }
            >
              {currentStatus}
            </Label>

            <Typography variant="h6">Devis: #V07-25-1309</Typography>
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Entreprise
            </Typography>
            {invoice?.invoiceFrom.name}
            <br />
            {invoice?.invoiceFrom.fullAddress}
            <br />
            Phone: {invoice?.invoiceFrom.phoneNumber}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Informations Client
            </Typography>
            {invoice?.invoiceTo.name}
            <br />
            {invoice?.invoiceTo.fullAddress}
            <br />
            Phone: {invoice?.invoiceTo.phoneNumber}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Date
            </Typography>
            {fDate(invoice?.createDate)}
          </Stack>

          {/* <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Due date
            </Typography>
            {fDate(invoice?.dueDate)}
          </Stack> */}
        </Box>

        {renderList}

        <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

        {renderFooter}
      </Card>
      </DashboardContent>
  )
}
