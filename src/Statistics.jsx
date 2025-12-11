import { LinearProgress, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';

function Statistics({ technologies }) {
    const total = technologies.length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const counts = {
        "Не начато": notStarted,
        "В процессе": inProgress,
        "Завершено": completed
    };

    const mostPopular = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    return (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Stack spacing={2}>
                <Typography variant="h5">Статистика</Typography>
                <List dense disablePadding>
                    <ListItem disableGutters>
                        <ListItemText primary={`Всего: ${total}`} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary={`Не начато: ${notStarted}`} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary={`В процессе: ${inProgress}`} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary={`Завершено: ${completed}`} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary={`Прогресс: ${percent}%`} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary={`Самая популярная категория: ${mostPopular}`} />
                    </ListItem>
                </List>
                <Stack spacing={1}>
                    <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{ height: 10, borderRadius: 10, bgcolor: 'action.hover' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        Прогресс: {percent}%
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Statistics;
