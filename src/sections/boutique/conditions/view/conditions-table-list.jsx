import React, { useState } from 'react';

import { Card, Table, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { TableHeadCustom } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ConditionsTableRow from '../conditions-table-row';

const HEAD_LABEL = [
  { id: 0, width: 120 },
  { id: 1, label: 'Nom', width: 240 },
  { id: 2, label: 'Description' },
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
      message: '',
    },
    {
      id: 2,
      name: 'Condition de vente',
      message: '',
    },
    {
      id: 3,
      name: 'Condition de Rachat',
      message: '',
    },
  ]);

  const updateConditionMessage = (idToUpdate, newMessage) => {
    setConditionsTableList((prevList) =>
      prevList.map((condition) =>
        condition.id === idToUpdate ? { ...condition, message: newMessage } : condition
      )
    );
    console.log(conditionsTableList);
  };

  const addEditModal = useBoolean();

  return (
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
  );
}
