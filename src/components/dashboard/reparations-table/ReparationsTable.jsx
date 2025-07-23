import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

export function ReparationsTable({ title, subheader, tableData, headLabel, ...other }) {
  const [statusFilter, setStatusFilter] = useState('');
  const [technicienSearch, setTechnicienSearch] = useState('');

  const filteredData = useMemo(
    () =>
      tableData.filter((row) => {
        const matchesStatus = statusFilter ? row.status === statusFilter : true;
        const matchesTechnicien = technicienSearch
          ? row.technicien?.toLowerCase().includes(technicienSearch.toLowerCase())
          : true;
        return matchesStatus && matchesTechnicien;
      }),
    [tableData, statusFilter, technicienSearch]
  );

  const statusOptions = [
    'Devis approuvé',
    'En attente devis',
    'Réparation en cours',
    'Attente validation devis',
    'Annulé',
  ];

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      {/* Filters */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ px: 3, mb: 2 }}>
        <TextField
          label="Filtrer par technicien"
          variant="outlined"
          size="small"
          value={technicienSearch}
          onChange={(e) => setTechnicienSearch(e.target.value)}
          fullWidth
        />

        <TextField
          label="Filtrer par status"
          variant="outlined"
          size="small"
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Tous</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {filteredData.map((row) => (
              <RowItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          LinkComponent={RouterLink}
          href={paths.dashboard.reparations.root}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          Voir tous
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function RowItem({ row }) {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  return (
    <TableRow>
      <TableCell>
        <Button size="small" variant="outlined" startIcon={<Iconify icon="eva:eye-outline" />}>
          {row.actions}
        </Button>
      </TableCell>

      <TableCell>
        <ListItemText primary={row.technicien} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={row.reparation} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={row.piece} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={row.ref} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={row.client} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={row.produit} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <Label
          variant={lightMode ? 'soft' : 'filled'}
          color={
            (row.status === 'Devis approuvé' && 'success') ||
            (row.status === 'En attente devis' && 'warning') ||
            (row.status === 'Réparation en cours' && 'info') ||
            (row.status === 'Attente validation devis' && 'secondary') ||
            'error'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
