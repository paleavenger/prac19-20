function Statistics({ technologies }) {
    const total = technologies.length;

    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const completed = technologies.filter(t => t.status === 'completed').length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const counts = {
        "Не начато": notStarted,
        "В процессе": inProgress,
        "Завершено": completed
    };

    const mostPopular = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    return (
        <div className="stats-block">
            <h2>Статистика</h2>
            <ul>
                <li>Всего: {total}</li>
                <li>Не начато: {notStarted}</li>
                <li>В процессе: {inProgress}</li>
                <li>Завершено: {completed}</li>
                <li>Прогресс: {percent}%</li>
                <li>Самая популярная категория: {mostPopular}</li>
            </ul>
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
            <p>Прогресс: {percent}%</p>
        </div>
    );
}

export default Statistics;
