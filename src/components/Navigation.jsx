import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Box,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';

function Navigation({ themeMode = 'light', onToggleTheme }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);

    const links = useMemo(() => ([
        { to: '/', label: 'Главная' },
        { to: '/technologies', label: 'Все технологии' },
        { to: '/add-technology', label: 'Добавить' },
        { to: '/stats', label: 'Статистика' },
        { to: '/settings', label: 'Настройки' },
        { to: '/api', label: 'API' },
        { to: '/api-search', label: 'API Поиск' },
        { to: '/data', label: 'Импорт/экспорт' },
        { to: '/bulk', label: 'Массово' },
        { to: '/mui-dashboard', label: 'MUI Dashboard' },
        { to: '/mui-cards', label: 'MUI Cards' },
        { to: '/notifications', label: 'Уведомления' }
    ]), []);

    const handleToggleDrawer = () => setOpen(prev => !prev);

    const renderLinkButton = (linkProps) => (
        <Button
            key={linkProps.to}
            component={NavLink}
            to={linkProps.to}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            sx={{
                color: 'text.primary',
                '&.active': {
                    color: 'primary.main',
                    fontWeight: 700
                }
            }}
        >
            {linkProps.label}
        </Button>
    );

    return (
        <>
            <AppBar position="sticky" color="inherit" elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <Toolbar sx={{ gap: 1 }}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={handleToggleDrawer} aria-label="Открыть меню">
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component={NavLink} to="/" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                            🚀 Трекер технологий
                        </Typography>
                        {!isMobile && (
                            <Stack direction="row" spacing={1} sx={{ ml: 2 }} flexWrap="wrap">
                                {links.map(renderLinkButton)}
                            </Stack>
                        )}
                    </Stack>
                    <IconButton onClick={onToggleTheme} aria-label="Переключить тему" color="inherit">
                        {themeMode === 'light' ? <DarkModeIcon /> : <WbSunnyIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={open} onClose={handleToggleDrawer}>
                <Box sx={{ width: 280, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Навигация</Typography>
                        <IconButton onClick={handleToggleDrawer} aria-label="Закрыть меню">
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <List>
                        {links.map(link => (
                            <ListItemButton
                                key={link.to}
                                component={NavLink}
                                to={link.to}
                                onClick={handleToggleDrawer}
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                sx={{
                                    borderRadius: 1.5,
                                    '&.active': {
                                        bgcolor: 'action.selected',
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Navigation;

