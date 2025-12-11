import { Stack, TextField, Typography } from '@mui/material';

function TechnologyNotes({ notes, onNotesChange, techId }) {
    const handleChange = (e) => {
        onNotesChange(techId, e.target.value);
    };

    return (
        <Stack spacing={1.5} onClick={(e) => e.stopPropagation()}>
            <Typography variant="subtitle1">Мои заметки</Typography>
            <TextField
                multiline
                minRows={3}
                value={notes}
                onChange={handleChange}
                placeholder="Записывайте сюда важные моменты..."
                fullWidth
            />
            <Typography variant="body2" color="text.secondary">
                {notes.length > 0
                    ? `Заметка сохранена (${notes.length} символов)`
                    : 'Добавьте заметку'}
            </Typography>
        </Stack>
    );
}

export default TechnologyNotes;

