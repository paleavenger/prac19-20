import { Grid, Paper, Stack, Typography } from '@mui/material';
import Statistics from '../Statistics';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';

function StatsPage({ technologies, progress }) {
    const byCategory = technologies.reduce((acc, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Статистика"
                subtitle="Отслеживание прогресса и распределения технологий."
            />

            <ProgressBar
                progress={progress}
                label="Общий прогресс"
                color="primary"
                animated
                height={14}
            />

            <Statistics technologies={technologies} />

            <Grid container spacing={2}>
                {Object.entries(byCategory).map(([category, count]) => (
                    <Grid item key={category} xs={12} sm={6} md={4}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1">{category}</Typography>
                            <Typography variant="h5">{count} шт.</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default StatsPage;

