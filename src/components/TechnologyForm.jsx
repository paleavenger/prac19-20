import { useMemo, useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources || ['']
    });

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const errors = useMemo(() => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        }

        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        formData.resources.forEach((resource, index) => {
            if (resource && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        return newErrors;
    }, [formData]);

    const isFormValid = Object.keys(errors).length === 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({
            ...prev,
            resources: newResources
        }));
    };

    const addResourceField = () => {
        setFormData(prev => ({
            ...prev,
            resources: [...prev.resources, '']
        }));
    };

    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                resources: newResources
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(resource => resource.trim() !== '')
            };
            onSave(cleanedData);
        }
    };

    return (
        <Paper component="form" onSubmit={handleSubmit} noValidate variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2.5}>
                <Typography variant="h5">
                    {initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}
                </Typography>

                <TextField
                    id="title"
                    name="title"
                    label="Название технологии"
                    value={formData.title}
                    onChange={handleChange}
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    placeholder="Например: React, Node.js, TypeScript"
                    required
                />

                <TextField
                    id="description"
                    name="description"
                    label="Описание"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    multiline
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    placeholder="Опишите, что это за технология и зачем её изучать..."
                    required
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Категория</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={formData.category}
                            label="Категория"
                            onChange={handleChange}
                        >
                            <MenuItem value="frontend">Frontend</MenuItem>
                            <MenuItem value="backend">Backend</MenuItem>
                            <MenuItem value="database">База данных</MenuItem>
                            <MenuItem value="devops">DevOps</MenuItem>
                            <MenuItem value="language">Языки</MenuItem>
                            <MenuItem value="other">Другое</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="difficulty-label">Сложность</InputLabel>
                        <Select
                            labelId="difficulty-label"
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            label="Сложность"
                            onChange={handleChange}
                        >
                            <MenuItem value="beginner">Начальный</MenuItem>
                            <MenuItem value="intermediate">Средний</MenuItem>
                            <MenuItem value="advanced">Продвинутый</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <TextField
                    id="deadline"
                    name="deadline"
                    label="Дедлайн (необязательно)"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    error={Boolean(errors.deadline)}
                    helperText={errors.deadline}
                    InputLabelProps={{ shrink: true }}
                />

                <Stack spacing={1}>
                    <Typography variant="subtitle1">Ресурсы для изучения</Typography>
                    {formData.resources.map((resource, index) => (
                        <Stack key={index} direction="row" spacing={1} alignItems="center">
                            <TextField
                                fullWidth
                                type="url"
                                value={resource}
                                onChange={(e) => handleResourceChange(index, e.target.value)}
                                placeholder="https://example.com"
                                error={Boolean(errors[`resource_${index}`])}
                                helperText={errors[`resource_${index}`]}
                            />
                            {formData.resources.length > 1 && (
                                <IconButton
                                    aria-label={`Удалить ресурс ${index + 1}`}
                                    onClick={() => removeResourceField(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Stack>
                    ))}
                    <Button
                        type="button"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={addResourceField}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        Добавить ресурс
                    </Button>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button type="button" variant="text" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" disabled={!isFormValid}>
                        Сохранить
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default TechnologyForm;

