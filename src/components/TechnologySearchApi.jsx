import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Grid,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';

function TechnologySearchApi({ onImport }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const timeoutRef = useRef(null);
    const abortRef = useRef(null);

    const search = async (value) => {
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        if (!value.trim()) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const resp = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(value)}`, {
                signal: controller.signal
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            setResults(data.products || []);
        } catch (e) {
            if (e.name !== 'AbortError') {
                setError('Ошибка загрузки');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => search(value), 400);
    };

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (abortRef.current) abortRef.current.abort();
    }, []);

    const handleImport = (product) => {
        onImport({
            title: product.title,
            description: product.description,
            category: product.category || 'other',
            notes: `Цена: $${product.price}`
        });
        alert('Технология добавлена в локальный список');
    };

    return (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Stack spacing={2}>
                <Typography variant="h5">Поиск технологий (API)</Typography>
                <TextField
                    placeholder="Введите название..."
                    value={query}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {loading && <CircularProgress size={20} />}
                            </InputAdornment>
                        )
                    }}
                />
                {error && <Alert severity="error">{error}</Alert>}

                {results.length === 0 && query.trim() && !loading && !error && (
                    <Typography color="text.secondary">Ничего не найдено</Typography>
                )}

                <Grid container spacing={2}>
                    {results.map(prod => (
                        <Grid item key={prod.id} xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{prod.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                        {prod.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Категория: {prod.category}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ px: 2, pb: 2 }}>
                                    <Button fullWidth variant="contained" onClick={() => handleImport(prod)}>
                                        Импортировать
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Paper>
    );
}

export default TechnologySearchApi;

