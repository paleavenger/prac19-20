import { useEffect, useState, useCallback } from 'react';

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTechnologies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await new Promise(res => setTimeout(res, 600));
            const mockTechnologies = [
                {
                    id: 101,
                    title: 'React Router',
                    description: 'Маршрутизация в React-приложениях',
                    category: 'frontend',
                    difficulty: 'intermediate',
                    resources: ['https://reactrouter.com']
                },
                {
                    id: 102,
                    title: 'REST API',
                    description: 'Проектирование HTTP API',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://restfulapi.net/']
                },
                {
                    id: 103,
                    title: 'TypeScript',
                    description: 'Типизированное надмножество JavaScript',
                    category: 'language',
                    difficulty: 'intermediate',
                    resources: ['https://www.typescriptlang.org']
                }
            ];
            setTechnologies(mockTechnologies);
        } catch {
            setError('Не удалось загрузить технологии');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTechnology = async (techData) => {
        await new Promise(res => setTimeout(res, 300));
        const newTech = { id: Date.now(), ...techData, createdAt: new Date().toISOString() };
        setTechnologies(prev => [...prev, newTech]);
        return newTech;
    };

    useEffect(() => {
        fetchTechnologies();
    }, [fetchTechnologies]);

    return {
        technologies,
        loading,
        error,
        refetch: fetchTechnologies,
        addTechnology
    };
}

export default useTechnologiesApi;

