import { useState } from 'react';
import { Alert, Button, Paper, Stack, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';

function DataImportExport({ technologies, onReplace }) {
    const [status, setStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const exportToJSON = () => {
        try {
            const dataStr = JSON.stringify(technologies, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setStatus('Данные экспортированы в JSON');
            setTimeout(() => setStatus(''), 3000);
        } catch {
            setStatus('Ошибка экспорта данных');
        }
    };

    const importFromJSON = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) throw new Error('Неверный формат данных');
                onReplace(imported);
                setStatus(`Импортировано ${imported.length} технологий`);
                setTimeout(() => setStatus(''), 3000);
            } catch {
                setStatus('Ошибка импорта: неверный формат файла');
            }
        };
        reader.readAsText(file);
    };

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        importFromJSON(file);
        event.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            importFromJSON(file);
        } else {
            setStatus('Ожидается JSON файл');
        }
    };

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Импорт и экспорт данных"
                subtitle="Сохраняйте и восстанавливайте трекер через JSON файлы."
            />

            {status && <Alert severity="info">{status}</Alert>}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
                <Button onClick={exportToJSON} disabled={technologies.length === 0} variant="contained">
                    Экспорт в JSON
                </Button>
                <Button component="label" variant="outlined">
                    Импорт из JSON
                    <input type="file" accept=".json" onChange={handleFileInput} hidden />
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderStyle: 'dashed',
                    borderColor: isDragging ? 'primary.main' : 'divider',
                    bgcolor: isDragging ? 'action.hover' : 'background.paper',
                    textAlign: 'center'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="region"
                aria-label="Перетащите JSON-файл сюда"
            >
                Перетащите JSON-файл сюда
            </Paper>

            {technologies.length > 0 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6">Текущие технологии ({technologies.length})</Typography>
                    <Stack component="ul" spacing={0.5} sx={{ pl: 2, mt: 1 }}>
                        {technologies.map((tech) => (
                            <li key={tech.id}>
                                <strong>{tech.title}</strong> - {tech.category}
                            </li>
                        ))}
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}

export default DataImportExport;

