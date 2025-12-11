import { Stack, Typography, Box } from '@mui/material';

function PageHeader({ title, subtitle, actions }) {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
        >
            <Box>
                {title && (
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0.5 }}>
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {actions}
        </Stack>
    );
}

export default PageHeader;

