// src/App.jsx
import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container, Snackbar, Alert } from '@mui/material';
import useTechnologies from './useTechnologies';
import TechnologyModal from './components/TechnologyModal';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import ApiIntegration from './pages/ApiIntegration';
import ApiSearchPage from './pages/ApiSearchPage';
import DataImportExport from './pages/DataImportExport';
import BulkStatusPage from './pages/BulkStatusPage';
import MuiDashboard from './pages/MuiDashboard';
import MuiCardsPage from './pages/MuiCardsPage';
import NotificationsPage from './pages/NotificationsPage';
import useThemeMode from './hooks/useThemeMode';

function App() {
    const {
        technologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetStatuses,
        restoreInitial,
        addTechnology,
        bulkUpdateStatus,
        replaceTechnologies,
        exportData,
        progress
    } = useTechnologies();

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState("all");
    const [selectedTech, setSelectedTech] = useState(null);
    const { mode, theme, toggleMode } = useThemeMode();
    const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

    const showSnackbar = (severity, message) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleCloseSnackbar = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const changeStatus = (id, currentStatus) => {
        let newStatus = 'not-started';
        if (currentStatus === 'not-started') newStatus = 'in-progress';
        else if (currentStatus === 'in-progress') newStatus = 'completed';
        else if (currentStatus === 'completed') newStatus = 'not-started';
        updateStatus(id, newStatus);
    };

    const filteredTechnologies = useMemo(() => technologies
        .filter(tech =>
            tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tech.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(t => {
            if (filter === "all") return true;
            return t.status === filter;
        }), [technologies, searchQuery, filter]);

    const handleExport = (data = technologies) => {
        const payload = exportData(data);
        const blob = new Blob([payload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'technologies.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePickRandom = () => {
        const available = technologies.filter(t => t.status === 'not-started');
        if (available.length === 0) {
            showSnackbar('warning', 'Нет доступных технологий для изучения');
            return;
        }
        const random = available[Math.floor(Math.random() * available.length)];
        updateStatus(random.id, 'in-progress');
        showSnackbar('info', `Случайная технология: ${random.title} → В процессе`);
    };

    const handleBulkApply = (ids, status) => {
        bulkUpdateStatus(ids, status);
        showSnackbar('success', `Статус "${status}" применён для ${ids.length} элементов`);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
                    <Navigation themeMode={mode} onToggleTheme={toggleMode} />
                    <Container maxWidth="lg" sx={{ py: 3 }}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        technologies={technologies}
                                        progress={progress}
                                        onStatusChange={changeStatus}
                                        onNotesChange={updateNotes}
                                        onOpenDetails={setSelectedTech}
                                    />
                                }
                            />
                        <Route
                            path="/technologies"
                            element={
                                <TechnologyList
                                    technologies={filteredTechnologies}
                                    total={technologies.length}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    filter={filter}
                                    setFilter={setFilter}
                                    onStatusChange={changeStatus}
                                    onNotesChange={updateNotes}
                                    onOpenDetails={setSelectedTech}
                                    onMarkAllCompleted={markAllCompleted}
                                    onResetAll={resetStatuses}
                                    onPickRandom={handlePickRandom}
                                    onExport={handleExport}
                                />
                            }
                        />
                        <Route
                            path="/technology/:techId"
                            element={
                                <TechnologyDetail
                                    technologies={technologies}
                                    onStatusChange={updateStatus}
                                    onNotesChange={updateNotes}
                                />
                            }
                        />
                        <Route
                            path="/add-technology"
                            element={<AddTechnology onAdd={addTechnology} />}
                        />
                        <Route
                            path="/stats"
                            element={<StatsPage technologies={technologies} progress={progress} />}
                        />
                        <Route
                            path="/settings"
                            element={
                                <SettingsPage
                                    onResetAll={resetStatuses}
                                    onRestoreInitial={restoreInitial}
                                    onExport={() => handleExport(technologies)}
                                />
                            }
                        />
                        <Route
                            path="/api"
                            element={<ApiIntegration onImport={addTechnology} />}
                        />
                            <Route
                                path="/api-search"
                                element={<ApiSearchPage onImport={addTechnology} />}
                            />
                            <Route
                                path="/data"
                                element={
                                    <DataImportExport
                                        technologies={technologies}
                                        onReplace={replaceTechnologies}
                                    />
                                }
                            />
                            <Route
                                path="/bulk"
                                element={
                                    <BulkStatusPage
                                        technologies={technologies}
                                        onApply={handleBulkApply}
                                    />
                                }
                            />
                            <Route
                                path="/mui-dashboard"
                                element={<MuiDashboard technologies={technologies} />}
                            />
                            <Route
                                path="/mui-cards"
                                element={
                                    <MuiCardsPage
                                        technologies={technologies}
                                        onStatusChange={updateStatus}
                                    />
                                }
                            />
                            <Route
                                path="/notifications"
                                element={<NotificationsPage />}
                            />
                        </Routes>
                    </Container>

                    <TechnologyModal
                        technology={selectedTech}
                        onClose={() => setSelectedTech(null)}
                        onStatusChange={updateStatus}
                        onNotesChange={updateNotes}
                    />
                </Box>
            </Router>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default App;
