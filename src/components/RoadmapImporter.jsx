import { useState } from 'react';
import { Alert, Button, Paper, Stack, Typography } from '@mui/material';

function RoadmapImporter({ onImport }) {
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState(null);

    const handleExampleImport = async () => {
        try {
            setImporting(true);
            setError(null);
            await new Promise(res => setTimeout(res, 800));
            const roadmapData = {
                technologies: [
                    {
                        title: 'GraphQL',
                        description: 'Запросы и схемы GraphQL',
                        category: 'backend',
                        notes: ''
                    },
                    {
                        title: 'Next.js',
                        description: 'SSR и SSG на React',
                        category: 'frontend',
                        notes: ''
                    }
                ]
            };
            for (const tech of roadmapData.technologies) {
                await onImport(tech);
            }
            alert(`Импортировано ${roadmapData.technologies.length} технологий`);
        } catch {
            setError('Ошибка импорта');
        } finally {
            setImporting(false);
        }
    };

    return (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Stack spacing={1.5}>
                <Typography variant="h6">Импорт дорожной карты</Typography>
                <Typography variant="body2" color="text.secondary">
                    Загрузите список технологий из внешнего API или используйте пример.
                </Typography>
                <Button variant="contained" onClick={handleExampleImport} disabled={importing}>
                    {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Paper>
    );
}

export default RoadmapImporter;

