function QuickActions({ technologies, setTechnologies }) {
    const markAllCompleted = () => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
    };

    const resetAll = () => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));
    };

    const pickRandom = () => {
        const available = technologies.filter(t => t.status === 'not-started');

        if (available.length === 0) {
            alert("Нет доступных технологий для изучения!");
            return;
        }

        const random = available[Math.floor(Math.random() * available.length)];
        alert("Следующая технология: " + random.title);
    };

    return (
        <div className="quick-actions">
            <button onClick={markAllCompleted}>Отметить все как выполненные</button>
            <button onClick={resetAll}>Сбросить все статусы</button>
            <button onClick={pickRandom}>Случайная технология</button>
        </div>
    );
}

export default QuickActions;
