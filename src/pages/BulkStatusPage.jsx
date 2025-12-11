import { Stack } from '@mui/material';
import BulkStatusEditor from '../components/BulkStatusEditor';
import PageHeader from '../components/PageHeader';

function BulkStatusPage({ technologies, onApply }) {
    return (
        <Stack spacing={3}>
            <PageHeader
                title="Массовое редактирование"
                subtitle="Выберите технологии и примените нужный статус сразу ко всем."
            />
            <BulkStatusEditor technologies={technologies} onApply={onApply} />
        </Stack>
    );
}

export default BulkStatusPage;

