import { Paper, Stack } from '@mui/material';
import NotificationsDemo from '../components/NotificationsDemo';
import PageHeader from '../components/PageHeader';

function NotificationsPage() {
    return (
        <Stack spacing={3}>
            <PageHeader
                title="Уведомления"
                subtitle="Snackbar с разными типами: success, error, warning, info."
            />
            <Paper variant="outlined" sx={{ p: 3 }}>
                <NotificationsDemo />
            </Paper>
        </Stack>
    );
}

export default NotificationsPage;

