import { Grid, Stack } from '@mui/material';
import SimpleTechCard from '../components/SimpleTechCard';
import PageHeader from '../components/PageHeader';

function MuiCardsPage({ technologies, onStatusChange }) {
    return (
        <Stack spacing={3}>
            <PageHeader
                title="MUI карточки технологий"
                subtitle="Карточки с использованием Material UI компонентов."
            />
            <Grid container spacing={2}>
                {technologies.map((tech) => (
                    <Grid item key={tech.id} xs={12} sm={6} md={4} lg={3}>
                        <SimpleTechCard technology={tech} onStatusChange={onStatusChange} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default MuiCardsPage;

