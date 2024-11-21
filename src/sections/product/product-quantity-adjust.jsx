import { z as zod } from 'zod';
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, Form } from "src/components/hook-form";
import { CONFIG } from "src/config-global";
import { zodResolver } from '@hookform/resolvers/zod';

export const ProductAdjustQuantity = zod.object({
    fournisseur: zod.string().min(1, { message: 'Fournisseur est requis!'}),
    augmenter: zod.number().min(0),
    raison: zod.string(),
    quantity: zod.number(),
    newQuantity: zod.number(),
    note: zod.string()
})

export function ProductQuantityAdjust({currentProduct, open, onClose}) {
    
    const defaultValues = useMemo(
        () => ({
            fournisseur: currentProduct?.fournisseur || 'fournisseur 1',
            raison: 'Entrée',
            quantity : currentProduct?.quantity || 0,
            augmenter: 0,
            newQuantity: currentProduct?.quantity || 0,
            note: currentProduct?.note || ''
            } ),[currentProduct]
    )

    console.log(defaultValues);
    
    
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ProductAdjustQuantity),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch
} = methods;

  const augmenter = watch('augmenter');
    const raison = watch('raison');
    const quantity = watch('quantity');

    // Update newQuantity dynamically
    useEffect(() => {
        const augmenterValue = parseFloat(augmenter) || 0;
        const quantityValue = parseFloat(quantity) || 0;

        const newQuantity = raison === 'Entrée'
            ? quantityValue + augmenterValue
            : quantityValue - augmenterValue;

        setValue('newQuantity', newQuantity); // Ensure non-negative quantity
    }, [raison, augmenter, quantity, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  const icon = `${CONFIG.assetsDir}/assets/stock.png`
    return(
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: 
             { 
                maxWidth: 1024,
                display:'grid',
                gridTemplateColumns: 'repeat(3, 1fr)'
             } 
            }}
        >
            
                <img src={icon} alt="stockadjust" height="100%" style={{objectFit: 'contain', padding:"12px"}}/>
                <Box sx={{gridColumn: "span 2"}}>
                    <Form methods={methods} onSubmit={onSubmit}>
                        <DialogTitle>Adjuster la quantité</DialogTitle>
                        <DialogContent>
                            <Box
                              marginTop={3}
                              rowGap={3}
                              columnGap={2}
                              display="grid"
                              width="100%"
                              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'}}
                            >
                                <Field.Select InputLabelProps={{ shrink: true }} name="fournisseur" label="Fournisseur">
                                    {
                                        ['fournisseur 1', 'fournisseur 2'].map((fournisseur) => (
                                            <MenuItem key={fournisseur} value={fournisseur}>{fournisseur}</MenuItem>
                                        ))
                                    }
                                </Field.Select>
                                <Field.Select InputLabelProps={{ shrink: true }} name="raison" label="Raison">
                                    {
                                        ['Entrée', 'Sortie'].map((raisonValue)=>
                                            (<MenuItem value={raisonValue} key={raisonValue}>{raisonValue}</MenuItem>)
                                        )
                                    }
                                </Field.Select>
                                <Field.Text InputLabelProps={{ shrink: true }} type="number" name="quantity" label="Quantité" disabled/>
                                <Field.Text InputLabelProps={{ shrink: true }} type="number" name="augmenter" label="Augmenter ou Réduire" />
                                <Field.Text InputLabelProps={{ shrink: true }} type="number" name="newQuantity" label="Nouvelle quantité" disabled/>
                                <Field.Text InputLabelProps={{ shrink: true }} name="note" label="Note" />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                              <Button variant="outlined" onClick={onClose}>
                    Annuler
                              </Button>
                    
                              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Mettre à jour
                              </LoadingButton>
                            </DialogActions>
                    </Form>
                </Box>
           
        </Dialog>
    )
}