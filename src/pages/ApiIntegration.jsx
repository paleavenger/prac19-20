import { Alert, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';
import PageHeader from '../components/PageHeader';

function ApiIntegration({ onImport }) {
    const { technologies, loading, error, refetch } = useTechnologiesApi();

    return (
        <Stack spacing={3}>
            <PageHeader
                title="API интеграция"
                subtitle="Загрузка технологий из внешнего API и импорт в локальный трекер."
                actions={
                    <Button variant="outlined" onClick={refetch}>
                        Обновить
                    </Button>
                }
            />

            {loading && <Typography>Загрузка технологий...</Typography>}
            {error && <Alert severity="error">{error}</Alert>}

            <RoadmapImporter onImport={onImport} />

            <Grid container spacing={2}>
                {technologies.map(tech => (
                    <Grid item key={tech.id} xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{tech.title}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {tech.description}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Категория: {tech.category}
                                </Typography>
                                {tech.resources && tech.resources.length > 0 && (
                                    <Stack component="ul" spacing={0.5} sx={{ pl: 2, mt: 1 }}>
                                        {tech.resources.map((r, idx) => (
                                            <li key={idx}>
                                                <a href={r} target="_blank" rel="noreferrer">{r}</a>
                                            </li>
                                        ))}
                                    </Stack>
                                )}
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 2 }}>
                                <Button fullWidth variant="contained" onClick={() => onImport(tech)}>
                                    Импортировать
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default ApiIntegration;

