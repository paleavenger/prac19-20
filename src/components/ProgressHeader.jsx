import React from 'react';

/**
 * Props:
 * - technologies: array of { id, title, description, status }
 */
function ProgressHeader({ technologies = [] }) {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="progress-header">
            <div className="stats">
                <div className="stat">
                    <div className="stat-num">{total}</div>
                    <div className="stat-label">Всего технологий</div>
                </div>
                <div className="stat">
                    <div className="stat-num">{completed}</div>
                    <div className="stat-label">Изучено</div>
                </div>
                <div className="stat">
                    <div className="stat-num">{percent}%</div>
                    <div className="stat-label">Прогресс</div>
                </div>
            </div>

            <div className="overall-progress">
                <div className="overall-bar">
                    <div className="overall-fill" style={{ width: `${percent}%` }} />
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;
