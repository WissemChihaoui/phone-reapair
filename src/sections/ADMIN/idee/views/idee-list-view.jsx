import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { Card, Fab } from '@mui/material';
import { Iconify } from 'src/components/iconify';



const TABLE_DATA = [
 {
  id: 1, 
  user: 'Triosweb',
  sujet: 'Idée 1',
  description: 'lorem ipsuem ',
  piece: ''
 }
];

const TABLE_HEAD = [
  { id: 'id', label: 'id' },
  { id: 'client', label: 'Client' },
  { id: 'sujet', label: 'Sujet' },
  { id: 'description', label: 'Description' },
  { id: 'piece', label: 'Piéce à joint' },
];
export default function IdeeListView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Boite à idée"
          links={[
            { name: 'Tableau de bord', href: paths.admin.root },
            { name: 'Boite à idée', href: paths.admin.idee },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      <Card>
        <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow key={row.id}>
                <TableCell>#{row.id}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.sujet}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Fab size='small'>
                    <Iconify icon="material-symbols:download-rounded" />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </Scrollbar>
      </Card>
      </DashboardContent>
    </>
  );
}
