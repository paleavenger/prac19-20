import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import TechnologyForm from '../components/TechnologyForm';
import PageHeader from '../components/PageHeader';

function AddTechnology({ onAdd }) {
    const navigate = useNavigate();

    const handleSave = (data) => {
        onAdd(data);
        navigate('/technologies');
    };

    return (
        <Stack spacing={3}>
            <PageHeader
                title="Добавить технологию"
                subtitle="Заполните информацию, дедлайн и ресурсы. Валидация работает в реальном времени."
            />

            <TechnologyForm
                onSave={handleSave}
                onCancel={() => navigate(-1)}
            />
        </Stack>
    );
}

export default AddTechnology;


