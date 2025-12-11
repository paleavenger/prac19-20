import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TechnologyNotes from './TechnologyNotes';

function TechnologyModal({ technology, onClose, onStatusChange, onNotesChange }) {
    if (!technology) return null;

    const handleStatusSelect = (e) => {
        onStatusChange(technology.id, e.target.value);
    };

    return (
        <Dialog open={Boolean(technology)} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {technology.title}
                <IconButton onClick={onClose} aria-label="Закрыть">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Typography color="text.secondary">{technology.description}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2">Категория:</Typography>
                        <Chip label={technology.category} size="small" color="info" />
                    </Stack>
                    <FormControl fullWidth>
                        <InputLabel id="tech-status-label">Статус</InputLabel>
                        <Select
                            labelId="tech-status-label"
                            value={technology.status}
                            label="Статус"
                            onChange={handleStatusSelect}
                        >
                            <MenuItem value="not-started">Не начато</MenuItem>
                            <MenuItem value="in-progress">В процессе</MenuItem>
                            <MenuItem value="completed">Завершено</MenuItem>
                        </Select>
                    </FormControl>
                    <TechnologyNotes
                        techId={technology.id}
                        notes={technology.notes || ''}
                        onNotesChange={onNotesChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={() => onStatusChange(technology.id, 'not-started')} color="inherit">
                    Сбросить
                </Button>
                <Button variant="contained" onClick={() => onStatusChange(technology.id, 'completed')} color="success">
                    Отметить выполнено
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TechnologyModal;

