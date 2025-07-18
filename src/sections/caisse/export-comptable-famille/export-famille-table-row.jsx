import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  pending: { label: 'En Cours' },
  cancelled: { label: 'Incomplete' },
  completed: { label: 'Réçu' },
};

export function ExportFamilleTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const collapse = useBoolean();

  // Calculate totals for articles
  const articles = row.articles || [];
  const totalTva = articles.reduce((sum, a) => sum + (a.tva || 0), 0);
  const totalHt = articles.reduce((sum, a) => sum + (a.ht || 0), 0);
  const totalTtc = articles.reduce((sum, a) => sum + (a.ttc || 0), 0);

  return (
    <>
      <TableRow hover selected={selected}>
        {/* N°Facture */}
        <TableCell>
          <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
            {row.orderNumber}
          </Link>
        </TableCell>
        {/* Famille */}
        <TableCell>{row.famille}</TableCell>
        {/* Référence */}
        <TableCell>{row.ref}</TableCell>
        {/* Articles collapse button */}
        <TableCell>
          <IconButton
            color={collapse.value ? 'primary' : 'default'}
            onClick={collapse.onToggle}
            size="small"
          >
            <Iconify
              icon={collapse.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButton>
          <span style={{ marginLeft: 8 }}>{articles.length}</span>
        </TableCell>
        {/* Total TVA */}
        <TableCell align="center">{fCurrency(totalTva)}</TableCell>
        {/* Total HT */}
        <TableCell align="center">{fCurrency(totalHt)}</TableCell>
        {/* Total TTC */}
        <TableCell align="center">{fCurrency(totalTtc)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={collapse.value} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Articles
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>HT</TableCell>
                    <TableCell>Taux</TableCell>
                    <TableCell>TVA</TableCell>
                    <TableCell>TTC</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((art, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{art.name}</TableCell>
                      <TableCell>{fCurrency(art.ht)}</TableCell>
                      <TableCell>{art.taux}%</TableCell>
                      <TableCell>{fCurrency(art.tva)}</TableCell>
                      <TableCell>{fCurrency(art.ttc)}</TableCell>
                      <TableCell>{fDate(art.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

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
