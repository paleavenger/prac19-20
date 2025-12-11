import React from 'react';
import { Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';

function ProgressHeader({ technologies = [] }) {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack>
                            <Typography variant="h6">{total}</Typography>
                            <Typography variant="body2" color="text.secondary">Всего технологий</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="h6">{completed}</Typography>
                            <Typography variant="body2" color="text.secondary">Изучено</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="h6">{percent}%</Typography>
                            <Typography variant="body2" color="text.secondary">Прогресс</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <LinearProgress variant="determinate" value={percent} sx={{ height: 10, borderRadius: 2 }} />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ProgressHeader;
