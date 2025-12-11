import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 3,
        title: 'Props & State',
        description: 'Передача данных и управление состоянием',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 5,
        title: 'Express Routing',
        description: 'Маршрутизация и middleware',
        status: 'not-started',
        notes: '',
        category: 'backend'
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech => (tech.id === techId ? { ...tech, status: newStatus } : tech))
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech => (tech.id === techId ? { ...tech, notes: newNotes } : tech))
        );
    };

    const addTechnology = (techData) => {
        setTechnologies(prev => {
            const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1;
            return [
                {
                    id: nextId,
                    status: 'not-started',
                    notes: '',
                    ...techData
                },
                ...prev
            ];
        });
    };

    const bulkUpdateStatus = (ids, status) => {
        setTechnologies(prev =>
            prev.map(tech => (ids.includes(tech.id) ? { ...tech, status } : tech))
        );
    };

    const replaceTechnologies = (items) => {
        setTechnologies(items);
    };

    const markAllCompleted = () => {
        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'completed' })));
    };

    const resetStatuses = () => {
        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'not-started' })));
    };

    const restoreInitial = () => {
        setTechnologies(initialTechnologies);
    };

    const exportData = (data = technologies) => JSON.stringify(data, null, 2);

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
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
        progress: calculateProgress()
    };
}

export default useTechnologies;

