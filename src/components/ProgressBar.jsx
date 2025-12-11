import { LinearProgress, Stack, Typography } from '@mui/material';

function ProgressBar({ progress, label, color = 'primary', animated = false, height = 12 }) {
    const clamped = Math.min(100, Math.max(0, progress));
    return (
        <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {clamped}%
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={clamped}
                color={color}
                sx={{
                    height,
                    borderRadius: 999,
                    ...(animated && {
                        '& .MuiLinearProgress-bar': {
                            transition: 'width 0.4s ease, opacity 0.4s ease'
                        }
                    })
                }}
            />
        </Stack>
    );
}

export default ProgressBar;

