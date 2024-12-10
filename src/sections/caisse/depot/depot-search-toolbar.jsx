import React, { useCallback, useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';

import { toast } from 'sonner';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { fIsAfter } from 'src/utils/format-time';
import DepotSearchResult from './depot-search-result';

export function DepotSearchToolbar() {

    const open = useBoolean()

    const searchDepot = useSetState(
        {depot: '', dateStart: null, dateEnd: null}
      )
      const dateError = fIsAfter(searchDepot.state.dateStart, searchDepot.state.dateEnd);
    
      const handleChange = useCallback((event) => {
        searchDepot.setState({depot: event.target.value})
      }, [searchDepot]);
    
      const handleStartDate = useCallback((newValue) => {
        searchDepot.setState({dateStart: newValue})
      }, [searchDepot])
    
      const handleEndDate = useCallback((newValue) => {
        if (dateError) {
          searchDepot.setState({dateEnd: null})
        }else{
          searchDepot.setState({dateEnd: newValue})
        }
      }, [dateError, searchDepot])
    
      const dataExist = searchDepot.state.depot !== '' &&
                        searchDepot.state.dateEnd && searchDepot.state.dateStart && 
                        !dateError
    
      const handleSearch = () => {
        if(dataExist) {
          open.onTrue()
        } else  {
          toast.error('Valider et remplir les champs');
        }
      }
  return (
    <>
        <Card
            sx={{
                display: { md: 'flex' },
                flexDirection: { md: 'column' },
                mt: { md: 4},
                mb: { xs: 3, md: 5 }
            }}
            >
            <CardHeader title='Créer un dépot bancaire' />
            <CardContent>
                <Stack
                spacing={2}
                alignItems={{ xs: 'flex-end', md: 'center' }}
                direction={{ xs: 'column', md: 'row' }}
                sx={{ px: 2.5 }}
                >
                <FormControl sx={{ flexGrow: 1, width: { xs: 1, md: 180 } }}>
                    <InputLabel htmlFor="search-depot-methode">Méthode</InputLabel>
                    <Select
                    label="Méthode"
                    value={searchDepot.state.depot}
                    onChange={handleChange}
                    input={<OutlinedInput label="Méthode" />}
                    renderValue={(selected) => selected}
                    inputProps={{ id: 'search-depot-methode' }}
                    sx={{ textTransform: 'capitalize'}}
                    >
                    {['Dépot Espéce', 'Dépot Chéque'].map((option) => (
                        <MenuItem key={option} value={option}>
                        <Checkbox
                            disableRipple
                            size="small"
                            checked={searchDepot.state.depot === option}
                        />
                        {option}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1, width: { xs: 1, md: 180 } }}>
                    <DatePicker label='Date Début' value={searchDepot.state.dateStart} onChange={handleStartDate}/>
                </FormControl>
                <FormControl sx={{ flexGrow: 1, width: { xs: 1, md: 180 } }}>
                    <DatePicker label='Date Fin' value={searchDepot.state.dateEnd} onChange={handleEndDate}
                    slotProps={{
                        textField: {
                        fullWidth: true,
                        error: dateError,
                        helperText: dateError ? 'La date de fin doit être postérieure à la date de début' : null,
                        },
                    }}
                    />
                </FormControl>
                </Stack>
            </CardContent>
            <CardActions>
                <Stack
                spacing={2}
                display='flex'
                alignItems='flex-end'
                justifyContent='flex-end'
                width={1}
                sx={{ px: 2.5 }}
                >
                <Button onClick={handleSearch} variant='contained' color='primary' sx={{ mx: 2.5 }}>Chercher</Button>
                </Stack>
            </CardActions>
        </Card>

        <DepotSearchResult open={open.value} onClose={open.onFalse}/>
    </>
  )
}
