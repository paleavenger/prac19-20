import { Stack } from '@mui/material';
import TechnologySearchApi from '../components/TechnologySearchApi';
import PageHeader from '../components/PageHeader';

function ApiSearchPage({ onImport }) {
    return (
        <Stack spacing={3}>
            <PageHeader
                title="API поиск"
                subtitle="Поиск технологий по внешнему API с дебаунсом и импортом"
            />
            <TechnologySearchApi onImport={onImport} />
        </Stack>
    );
}

export default ApiSearchPage;

