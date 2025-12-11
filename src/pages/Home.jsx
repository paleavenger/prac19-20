import { Grid, Stack, Typography } from '@mui/material';
import ProgressBar from '../components/ProgressBar';
import Statistics from '../Statistics';
import TechnologyCard from '../components/TechnologyCard';
import PageHeader from '../components/PageHeader';

function Home({ technologies, progress, onStatusChange, onNotesChange, onOpenDetails }) {
    const sortedTech = [...technologies].sort((a, b) => b.id - a.id);

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Трекер изучения технологий"
                subtitle="Следите за прогрессом, отмечайте статусы и сохраняйте свои заметки."
            />

            <ProgressBar
                progress={progress}
                label="Общий прогресс"
                color="success"
                animated
                height={14}
            />

            <Statistics technologies={technologies} />

            <Stack spacing={2}>
                <Typography variant="h5">Все технологии</Typography>
                <Grid container spacing={2}>
                    {sortedTech.map(tech => (
                        <Grid item key={tech.id} xs={12} sm={6} md={4}>
                            <TechnologyCard
                                technology={tech}
                                onStatusChange={onStatusChange}
                                onNotesChange={onNotesChange}
                                onOpenDetails={onOpenDetails}
                                detailLink={`/technology/${tech.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
}

export default Home;

