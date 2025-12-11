import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
    Alert,
    Button,
    Chip,
    Link,
    Stack,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Card,
    CardContent
} from '@mui/material';
import TechnologyNotes from '../components/TechnologyNotes';
import PageHeader from '../components/PageHeader';

function TechnologyDetail({ technologies, onStatusChange, onNotesChange }) {
    const { techId } = useParams();
    const navigate = useNavigate();
    const technology = technologies.find(t => String(t.id) === techId);
    const [resources, setResources] = useState([]);
    const [loadingRes, setLoadingRes] = useState(false);
    const [errorRes, setErrorRes] = useState(null);

    if (!technology) {
        return (
            <Stack spacing={2}>
                <PageHeader title="Технология не найдена" />
                <Typography>Технология с ID {techId} не существует.</Typography>
                <Button component={RouterLink} to="/technologies" variant="outlined">
                    ← Назад к списку
                </Button>
            </Stack>
        );
    }

    const setStatus = (status) => onStatusChange(technology.id, status);

    const loadResources = async () => {
        setLoadingRes(true);
        setErrorRes(null);
        try {
            await new Promise(res => setTimeout(res, 600));
            setResources([
                { title: 'Документация', url: 'https://react.dev/' },
                { title: 'Статья на русском', url: 'https://ru.hexlet.io/blog/posts/react-router-v6' },
                { title: 'Видео-разбор', url: 'https://www.youtube.com/results?search_query=react+router' }
            ]);
        } catch {
            setErrorRes('Не удалось загрузить ресурсы');
        } finally {
            setLoadingRes(false);
        }
    };

    return (
        <Stack spacing={3}>
            <PageHeader
                title={technology.title}
                subtitle={technology.description}
                actions={
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                }
            />

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Link component={RouterLink} to="/technologies" underline="hover">
                    ← Назад к списку
                </Link>
                <Chip label={technology.category} color="info" size="small" />
                {technology.deadline && (
                    <Chip
                        label={`Дедлайн: ${new Date(technology.deadline).toLocaleDateString()}`}
                        color="warning"
                        size="small"
                    />
                )}
            </Stack>

            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h6">Статус</Typography>
                        <ToggleButtonGroup
                            exclusive
                            value={technology.status}
                            onChange={(_, value) => value && setStatus(value)}
                            aria-label="Статус технологии"
                        >
                            <ToggleButton value="not-started">Не начато</ToggleButton>
                            <ToggleButton value="in-progress">В процессе</ToggleButton>
                            <ToggleButton value="completed">Завершено</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <TechnologyNotes
                        techId={technology.id}
                        notes={technology.notes || ''}
                        onNotesChange={onNotesChange}
                    />
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h6">Ресурсы</Typography>
                        <Button variant="contained" onClick={loadResources} disabled={loadingRes}>
                            {loadingRes ? 'Загрузка...' : 'Загрузить ресурсы'}
                        </Button>
                        {errorRes && <Alert severity="error">{errorRes}</Alert>}
                        {resources.length > 0 && (
                            <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                                {resources.map((r, idx) => (
                                    <li key={idx}>
                                        <Link href={r.url} target="_blank" rel="noreferrer">
                                            {r.title}
                                        </Link>
                                    </li>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default TechnologyDetail;

