import { useEffect, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const STORAGE_KEY = 'mui-theme-mode';

function useThemeMode() {
    const [mode, setMode] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: { main: '#6366f1' },
            secondary: { main: '#fb923c' },
            success: { main: '#22c55e' },
            warning: { main: '#f59e0b' },
            info: { main: '#0ea5e9' },
            background: {
                default: mode === 'light' ? '#f8fafc' : '#0b1220',
                paper: mode === 'light' ? '#ffffff' : '#0f172a'
            }
        },
        shape: {
            borderRadius: 12
        },
        components: {
            MuiPaper: {
                defaultProps: { elevation: 0 },
                styleOverrides: {
                    root: {
                        borderRadius: 14
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600
                    }
                }
            }
        }
    }), [mode]);

    const toggleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return { mode, theme, toggleMode };
}

export default useThemeMode;

