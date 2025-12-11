import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';

function SettingsPage({ onResetAll, onRestoreInitial, onExport }) {
    const handleClearStorage = () => {
        localStorage.removeItem('technologies');
        onRestoreInitial();
        alert('Данные очищены и сброшены к начальному списку.');
    };

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Настройки"
                subtitle="Управление данными и быстрые инструменты."
            />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                        <Typography variant="h6">Данные</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Сохраните или сбросьте состояние технологий.
                        </Typography>
                        <Stack spacing={1}>
                            <Button variant="outlined" onClick={onResetAll}>Сбросить статусы</Button>
                            <Button variant="outlined" onClick={onRestoreInitial}>Вернуть начальный список</Button>
                            <Button variant="outlined" color="error" onClick={handleClearStorage}>Очистить localStorage</Button>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                        <Typography variant="h6">Экспорт</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Скачайте резервную копию данных.
                        </Typography>
                        <Stack spacing={1}>
                            <Button variant="contained" onClick={onExport}>Экспортировать JSON</Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default SettingsPage;

