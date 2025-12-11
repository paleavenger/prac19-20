import { Button, Stack } from '@mui/material';

function QuickActions({
    technologies,
    onMarkAllCompleted,
    onResetAll,
    onExport,
    onPickRandom
}) {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap">
            <Button variant="contained" color="success" onClick={onMarkAllCompleted}>
                Отметить все как выполненные
            </Button>
            <Button variant="outlined" onClick={onResetAll}>
                Сбросить все статусы
            </Button>
            <Button variant="outlined" onClick={onPickRandom}>
                Случайная технология
            </Button>
            <Button variant="contained" color="primary" onClick={() => onExport(technologies)}>
                Экспорт данных
            </Button>
        </Stack>
    );
}

export default QuickActions;
