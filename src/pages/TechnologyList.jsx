import { Grid, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../QuickActions';
import PageHeader from '../components/PageHeader';

function TechnologyList({
    technologies,
    total,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    onStatusChange,
    onNotesChange,
    onOpenDetails,
    onMarkAllCompleted,
    onResetAll,
    onPickRandom,
    onExport
}) {
    const handleFilterChange = (_, value) => {
        if (value) setFilter(value);
    };

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Все технологии"
                subtitle={`Найдено: ${technologies.length} из ${total}`}
            />

            <QuickActions
                technologies={technologies}
                onMarkAllCompleted={onMarkAllCompleted}
                onResetAll={onResetAll}
                onPickRandom={onPickRandom}
                onExport={onExport}
            />

            <Stack spacing={1}>
                <TextField
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    helperText={`Найдено: ${technologies.length}`}
                />
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={filter}
                    onChange={handleFilterChange}
                    size="small"
                >
                    <ToggleButton value="all">Все</ToggleButton>
                    <ToggleButton value="not-started">Не начато</ToggleButton>
                    <ToggleButton value="in-progress">В процессе</ToggleButton>
                    <ToggleButton value="completed">Завершено</ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Grid container spacing={2}>
                {technologies.map(tech => (
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
                {technologies.length === 0 && (
                    <Grid item xs={12}>
                        <Typography color="text.secondary">Нет технологий по выбранным условиям</Typography>
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
}

export default TechnologyList;

