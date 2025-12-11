// src/TechnologyCard.jsx
import { Link } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Stack,
    Typography,
    Chip,
    Button,
    Box
} from '@mui/material';
import TechnologyNotes from './TechnologyNotes';

const statusConfig = {
    'not-started': { label: 'Не начато', color: 'error' },
    'in-progress': { label: 'В процессе', color: 'warning' },
    'completed': { label: 'Завершено', color: 'success' }
};

function TechnologyCard({ technology, onStatusChange, onNotesChange, onOpenDetails, detailLink }) {
    const { title, description, status, id, notes = '', deadline } = technology;
    const { label, color } = statusConfig[status] || statusConfig['not-started'];

    const handleCardClick = () => {
        onStatusChange(id, status);
    };

    const handleOpenDetails = (e) => {
        e.stopPropagation();
        onOpenDetails?.(technology);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                borderLeftWidth: 6,
                borderLeftStyle: 'solid',
                borderLeftColor: `${color}.main`,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1 }} disableRipple>
                <CardContent>
                    <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">{title}</Typography>
                            <Chip label={label} color={color} size="small" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        {deadline && (
                            <Typography variant="body2" color="text.secondary">
                                Дедлайн: {new Date(deadline).toLocaleDateString()}
                            </Typography>
                        )}
                        <TechnologyNotes techId={id} notes={notes} onNotesChange={onNotesChange} />
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                {onOpenDetails && (
                    <Button variant="outlined" size="small" onClick={handleOpenDetails}>
                        Модальное окно
                    </Button>
                )}
                {detailLink && (
                    <Button
                        component={Link}
                        to={detailLink}
                        size="small"
                        variant="text"
                        color="primary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Страница →
                    </Button>
                )}
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="caption" color="text.secondary">
                    Нажмите по карточке, чтобы сменить статус
                </Typography>
            </CardActions>
        </Card>
    );
}

export default TechnologyCard;
