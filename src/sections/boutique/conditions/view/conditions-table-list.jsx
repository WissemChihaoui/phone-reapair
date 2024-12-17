import {
  Button,
  Card,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { TableHeadCustom } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import ConditionsTableRow from '../conditions-table-row';
import ConditionsEditAdd from '../conditions-edit-add';

const HEAD_LABEL = [
  { id: 0, width: 120 },
  { id: 1, label: 'Nom', width: 240 },
  { id: 2, label: 'Message' },
];
export default function ConditionsTableList() {
  const [conditionsTableList, setConditionsTableList] = useState([
    {
      id: 0,
      name: 'Condition Avoir',
      message:
        'Je déclare avoir pris connaissance et accepté sans réserves les termes des Conditions Générales de Vente, Prestation et SAV ci-jointes et partie intégrante de la relation contractuelle.',
    },
    {
      id: 1,
      name: 'Condition de Reparation',
      message:''
    },
    {
      id: 2,
      name: 'Condition de vente',
      message:''
    },
    {
      id: 3,
      name: 'Condition de Rachat',
      message:''
    },
    {
      id: 4,
      name: 'Condition de Pret',
      message:''
    },
  ]);

  const updateConditionMessage = (idToUpdate, newMessage) => {
    setConditionsTableList((prevList) =>
      prevList.map((condition) =>
        condition.id === idToUpdate
          ? { ...condition, message: newMessage }
          : condition
      )
    );
    console.log(conditionsTableList);
    
  };
  

  const addEditModal = useBoolean();

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Les conditions"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Conditions', href: paths.dashboard.boutique.conditions },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <Table>
            <TableHeadCustom headLabel={HEAD_LABEL} />
            <TableBody>
              {conditionsTableList.map((row) => (
                <ConditionsTableRow 
                    row={row}
                    addEditModal={addEditModal}
                    updateConditionMessage={updateConditionMessage}
                />
              ))}
            </TableBody>
          </Table>
          
        </Card>
      </DashboardContent>
      
    </>
  );
}
