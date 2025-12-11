import { useState } from 'react';
import {
    Alert,
    Button,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const defaultDuration = 3500;

function NotificationsDemo() {
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState({ severity: 'info', text: '' });
    const [anchor, setAnchor] = useState({ vertical: 'bottom', horizontal: 'right' });

    const show = (severity, text) => {
        setMessageInfo({ severity, text });
        setOpen(true);
    };

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Уведомления (Snackbar)</Typography>
            <Typography variant="body2" color="text.secondary">
                Выберите тип уведомления. Автоматически закрывается и имеет доступные действия.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap">
                <Button variant="contained" color="success" onClick={() => show('success', 'Сохранено успешно')}>
                    Success
                </Button>
                <Button variant="contained" color="error" onClick={() => show('error', 'Произошла ошибка')}>
                    Error
                </Button>
                <Button variant="contained" color="warning" onClick={() => show('warning', 'Проверьте ввод')}>
                    Warning
                </Button>
                <Button variant="contained" color="info" onClick={() => show('info', 'Информация')}>
                    Info
                </Button>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
                <Typography variant="body2">Позиция:</Typography>
                <Select
                    size="small"
                    value={`${anchor.vertical}-${anchor.horizontal}`}
                    onChange={(e) => {
                        const [vertical, horizontal] = e.target.value.split('-');
                        setAnchor({ vertical, horizontal });
                    }}
                >
                    <MenuItem value="top-center">Сверху / центр</MenuItem>
                    <MenuItem value="top-right">Сверху / справа</MenuItem>
                    <MenuItem value="bottom-left">Снизу / слева</MenuItem>
                    <MenuItem value="bottom-right">Снизу / справа</MenuItem>
                </Select>
            </Stack>

            <Snackbar
                open={open}
                autoHideDuration={defaultDuration}
                onClose={handleClose}
                anchorOrigin={anchor}
            >
                <Alert
                    onClose={handleClose}
                    severity={messageInfo.severity}
                    sx={{ width: '100%', alignItems: 'center' }}
                    variant="filled"
                    action={
                        <IconButton size="small" color="inherit" onClick={handleClose} aria-label="Закрыть">
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {messageInfo.text}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default NotificationsDemo;

