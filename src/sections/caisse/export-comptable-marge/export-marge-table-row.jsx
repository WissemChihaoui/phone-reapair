import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  pending: { label: 'En Cours' },
  cancelled: { label: 'Incomplete' },
  completed: { label: 'Réçu' },
};

export function ExportMargeTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
    // Calculate TVA, TTC, and Totals
    const items = row.items.map((item) => {
      const tvaAmount = item.priceHt * (item.tvaPercent / 100);
      const priceTtc = item.priceHt + tvaAmount;
      return {
        ...item,
        tvaAmount,
        priceTtc,
      };
    });

    const confirm = useBoolean()
    const collapse = useBoolean()
    const paymentPopover = usePopover();

    const totalTva = items.reduce((sum, item) => sum + item.tvaAmount, 0);
    const totalHt = items.reduce((sum, item) => sum + item.priceHt, 0);
    const totalTtc = items.reduce((sum, item) => sum + item.priceTtc, 0);
    const pathname = usePathname();
    const [openPayment, setOpenPayment] = useState(false)
    useEffect(() => {
        if (openPayment) {
          handleCloseMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pathname]);
      const handleCloseMenu = useCallback(() => {
        setOpenPayment(false);
      }, []);
  
    const renderPrimary = (
        <>
      <TableRow hover selected={selected}>
        
        <TableCell>
          <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
            {row.orderNumber}
          </Link>
        </TableCell>
        <TableCell>{row.ref}</TableCell>
        <TableCell>
            <Button 
                onClick={paymentPopover.onOpen}
                ref={paymentPopover.anchorEl}>
             {row.payement.length} Dépôt
            </Button>
        </TableCell>
        <TableCell>
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
            sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
          >
            <Typography>{row.items.length}</Typography>
            <Iconify
              icon={!collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'}
            />
          </IconButton>
        </TableCell>
        <TableCell>
        <ListItemText
          primary={fDate(row.date)}
          secondary={fTime(row.date)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
        </TableCell>
        {/* Display Totals */}
        <TableCell align="center">{fCurrency(totalTva)}</TableCell> {/* Total HT */}
        <TableCell align="center">{fCurrency(totalHt)}</TableCell> {/* Total TVA */}
        <TableCell align="center">{fCurrency(totalTtc)}</TableCell> {/* Total TTC */}
        <TableCell align="center">{fCurrency(row.marge)}</TableCell> {/* Total TTC */}
  
        
      </TableRow>
      <CustomPopover
        open={paymentPopover.open}
        onClose={paymentPopover.onClose}
        anchorEl={paymentPopover.anchorEl}
        arrow="top-right"
        sx={{ p: 12 }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Détails du paiement
        </Typography>
        {row.payement.map((payment, index) => (
          <Box key={index} display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2">{payment.methode}</Typography>
            <Typography variant="body2" color="text.secondary">
              {fCurrency(payment.amount)}
            </Typography>
          </Box>
        ))}
      </CustomPopover>
      </>
    );
  
    const renderSecondary = (
      <TableRow>
        <TableCell sx={{ p: 0, border: 'none' }} colSpan={9}>
          <Collapse
            in={collapse.value}
            timeout="auto"
            unmountOnExit
            sx={{ bgcolor: 'background.neutral' }}
          >
            <Paper sx={{ m: 1.5 }}>
              {items.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  sx={{
                    p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                    '&:not(:last-of-type)': {
                      borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                    },
                  }}
                >
                  <Avatar
                    src={item.coverUrl}
                    variant="rounded"
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
  
                  <ListItemText
                    primary={item.article}
                    secondary={`TVA: ${item.tvaPercent}% `}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{
                      component: 'span',
                      color: 'text.disabled',
                      mt: 0.5,
                    }}
                  />
  
                  <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.tvaAmount)}</Box>
                  <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.priceHt)}</Box>
                  <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.priceTtc)}</Box>
                </Stack>
              ))}
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  
    return (
      <>
        {renderPrimary}
        {renderSecondary}
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Supprimer"
          content="Êtes-vous sûr de vouloir supprimer ?"
          action={
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Supprimer
            </Button>
          }
        />
      </>
    );
  }
  
