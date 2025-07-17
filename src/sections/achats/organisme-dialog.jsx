import React, { useMemo, useState } from 'react';

import {
    Table,
    Button,
    Dialog,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    TextField,
    IconButton,
    DialogTitle,
    TableFooter,
    DialogActions,
    DialogContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useTable, TablePaginationCustom } from 'src/components/table';

const organismes = [
    { id: 1, name: 'Organisme 1' },
    { id: 2, name: 'Organisme 2' },
    { id: 3, name: 'Organisme 3' },
];

export default function OrganismeDialog({ open, onClose }) {
    const table = useTable({ defaultOrderBy: 'name' });
    const deleteRow = useBoolean();
    const [organismeList, setOrganismeList] = useState(organismes);
    const [newOrganisme, setNewOrganisme] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Edit state
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Memoize paginated data to avoid recalculation on every render
    const paginatedOrganismes = useMemo(() => {
        const start = table.page * table.rowsPerPage;
        const end = start + table.rowsPerPage;
        return organismeList.slice(start, end);
    }, [organismeList, table.page, table.rowsPerPage]);

    // Ensure current page is valid after deletion
    React.useEffect(() => {
        if (
            table.page > 0 &&
            organismeList.length <= table.page * table.rowsPerPage
        ) {
            table.onChangePage(null, table.page - 1);
        }
        // eslint-disable-next-line
    }, [organismeList.length, table.page, table.rowsPerPage]);

    const handleAddOrganisme = () => {
        if (newOrganisme.trim() === '') return;
        setOrganismeList([
            ...organismeList,
            {
                id:
                    organismeList.length > 0
                        ? Math.max(...organismeList.map((o) => o.id)) + 1
                        : 1,
                name: newOrganisme,
            },
        ]);
        setNewOrganisme('');
    };

    const handleDeleteOrganisme = (id) => {
        setOrganismeList(organismeList.filter((org) => org.id !== id));
        setSelectedId(null);
        deleteRow.onFalse();
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedId(id);
        deleteRow.onTrue();
    };

    const handleEditClick = (id, name) => {
        setEditId(id);
        setEditValue(name);
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditValue('');
    };

    const handleEditSave = (id) => {
        setOrganismeList(
            organismeList.map((org) =>
                org.id === id ? { ...org, name: editValue } : org
            )
        );
        setEditId(null);
        setEditValue('');
    };

    return (
        <>
            <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
                <DialogTitle>Organisme</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Organisme</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedOrganismes.map((org) => (
                                <TableRow key={org.id}>
                                    {editId === org.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    value={editValue}
                                                    onChange={(e) =>
                                                        setEditValue(e.target.value)
                                                    }
                                                    size="small"
                                                    autoFocus
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditSave(org.id)}
                                                >
                                                    <Iconify icon="tabler:check" />
                                                </IconButton>
                                                <IconButton onClick={handleEditCancel}>
                                                    <Iconify icon="tabler:x" />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{org.name}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleEditClick(org.id, org.name)
                                                    }
                                                >
                                                    <Iconify icon="tabler:edit" />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        handleOpenDeleteDialog(org.id)
                                                    }
                                                >
                                                    <Iconify icon="tabler:trash" />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        label="Nouvel Organisme"
                                        variant="outlined"
                                        size="small"
                                        value={newOrganisme}
                                        onChange={(e) => setNewOrganisme(e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddOrganisme}
                                    >
                                        Creér Organisme
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <TablePaginationCustom
                        page={table.page}
                        dense={table.dense}
                        count={organismeList.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        onChangeDense={table.onChangeDense}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" variant="outlined">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                open={deleteRow.value}
                onClose={deleteRow.onFalse}
                title="Suppression d'un Organisme"
                content="Êtes-vous sûr de vouloir supprimer cet organisme?"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOrganisme(selectedId)}
                    >
                        Supprimer
                    </Button>
                }
            />
        </>
    );
}
