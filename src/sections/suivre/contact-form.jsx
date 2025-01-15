import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function ContactForm({ sx, ...other }) {
  return (
    <Card>
        <CardContent>
            <Box sx={sx} {...other}>
              <Typography variant="h3">
              N&apos;hésitez pas à nous contacter.<br />
              Nous serons heureux de vous entendre.
              </Typography>
              <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
                <TextField fullWidth label="Nom" />
                <TextField fullWidth label="Email" />
                <TextField fullWidth label="Sujet" />
                <TextField fullWidth label="Saisissez votre message ici." multiline rows={4} />
              </Box>
              <Button size="large" variant="contained">
                Submit
              </Button>
            </Box>
        </CardContent>
    </Card>
  );
}
