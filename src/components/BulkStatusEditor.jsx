import { useMemo, useState } from 'react';
import {
    Paper,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Checkbox,
    FormControlLabel,
    Chip,
    Divider
} from '@mui/material';

const statusColor = {
    'not-started': 'error',
    'in-progress': 'warning',
    'completed': 'success'
};

function BulkStatusEditor({ technologies, onApply }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [status, setStatus] = useState('in-progress');

    const allSelected = useMemo(
        () => technologies.length > 0 && selectedIds.length === technologies.length,
        [technologies, selectedIds]
    );

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(technologies.map(t => t.id));
        }
    };

    const toggleOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedIds.length === 0) return;
        onApply(selectedIds, status);
        setSelectedIds([]);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            aria-label="Массовое редактирование статусов"
            variant="outlined"
            sx={{ p: 2.5 }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
                <div>
                    <Typography variant="h6">Массовое редактирование статусов</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Выберите технологии и примените новый статус.
                    </Typography>
                </div>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel id="bulk-status-label">Новый статус</InputLabel>
                        <Select
                            labelId="bulk-status-label"
                            value={status}
                            label="Новый статус"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="not-started">Не начато</MenuItem>
                            <MenuItem value="in-progress">В процессе</MenuItem>
                            <MenuItem value="completed">Завершено</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" disabled={selectedIds.length === 0}>
                        Применить ({selectedIds.length})
                    </Button>
                </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.25} role="group" aria-label="Список технологий">
                <FormControlLabel
                    control={<Checkbox checked={allSelected} onChange={toggleAll} />}
                    label="Выбрать все"
                />

                {technologies.map(tech => (
                    <Stack
                        key={tech.id}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover' }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedIds.includes(tech.id)}
                                    onChange={() => toggleOne(tech.id)}
                                />
                            }
                            label={tech.title}
                        />
                        <Chip
                            label={tech.status}
                            color={statusColor[tech.status] || 'default'}
                            size="small"
                            sx={{ textTransform: 'none' }}
                        />
                    </Stack>
                ))}

                {technologies.length === 0 && (
                    <Typography color="text.secondary">Нет технологий для редактирования.</Typography>
                )}
            </Stack>
        </Paper>
    );
}

export default BulkStatusEditor;

