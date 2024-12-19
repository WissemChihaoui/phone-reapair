import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { paths } from 'src/routes/paths';

// Transforms routes to a table-friendly structure
function transformToStructuredTable(obj) {
  const result = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result.push({ key, path: value, children: null });
    } else if (typeof value === 'object' && value !== null) {
      result.push({
        key,
        path: null,
        children: transformToStructuredTable(value),
      });
    }
  });
  return result;
}

const FONCTIONS_LIST = [
  { id: 'Admin', label: 'Admin' },
  { id: 'User', label: 'User' },
  { id: 'Viewer', label: 'Viewer' },
];

export function PermissionSideView() {
  const TABLE_DATA = transformToStructuredTable(paths.dashboard);

  console.log(TABLE_DATA);

  return (
    <Box mt={2}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Route</TableCell>
            <TableCell align="right">Lien</TableCell>
            <TableCell align="right">Fonctions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {TABLE_DATA.map((row) => (
            <CollapsibleTableRow key={row.key} row={row} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function CollapsibleTableRow({ row }) {
  const collapsible = useBoolean();
  const local = useSetState({ selectedFunctions: [] });

  // Handle function selection for a route
  const handleFunctionSelect = (selectedId) => {
    const alreadySelected = local.state.selectedFunctions.includes(selectedId);

    if (alreadySelected) {
      // Remove permission
      local.setState({
        selectedFunctions: local.state.selectedFunctions.filter((id) => id !== selectedId),
      });
    } else {
      // Add permission
      local.setState({
        selectedFunctions: [...local.state.selectedFunctions, selectedId],
      });
    }
  };

  return (
    <>
      {/* Parent Route */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {row.children && (
            <IconButton
              size="small"
              color={collapsible.value ? 'inherit' : 'default'}
              onClick={collapsible.onToggle}
            >
              <Iconify
                icon={
                  collapsible.value
                    ? 'eva:arrow-ios-upward-fill'
                    : 'eva:arrow-ios-downward-fill'
                }
              />
            </IconButton>
          )}
        </TableCell>

        <TableCell component="th" scope="row">
          {row.key}
        </TableCell>

        <TableCell align="right">{row.path}</TableCell>

        {/* Function Select for Parent */}
        <TableCell align="right">
          <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 400 } }}>
            <Select
              multiple
              value={local.state.selectedFunctions}
              onChange={(e) => local.setState({ selectedFunctions: e.target.value })}
              renderValue={(selected) => selected.map((value) => value).join(', ')}
            >
              {FONCTIONS_LIST.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={local.state.selectedFunctions.includes(option.id)}
                    
                    onChange={() => handleFunctionSelect(option.id)}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>

      {/* Child Routes */}
      {row.children && (
        <TableRow>
          <TableCell sx={{ py: 0 }} colSpan={6}>
            <Collapse in={collapsible.value} timeout="auto" unmountOnExit>
              <Paper
                variant="outlined"
                sx={{
                  py: 2,
                  mb: 2,
                  borderRadius: 1.5,
                  ...(collapsible.value && { boxShadow: (theme) => theme.customShadows.z20 }),
                }}
              >
                <Typography variant="h6" component="div" sx={{ p: 2 }}>
                  Lien Secondaires
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Route</TableCell>
                      <TableCell>Lien</TableCell>
                      <TableCell align="right">Fonctions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {row.children?.map((child) => (
                      <CollapsibleTableRow key={child.key} row={child} />
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
