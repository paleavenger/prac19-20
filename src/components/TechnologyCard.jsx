// src/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange }) {
    const { title, description, status } = technology;

    const handleClick = () => {
        onStatusChange(technology.id);
    };

    return (
        <div
            className={`technology-card status-${status}`}
            onClick={handleClick}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="status-label">
        {status === 'not-started' && 'Не начато'}
                {status === 'in-progress' && 'В процессе'}
                {status === 'completed' && 'Завершено'}
      </span>
        </div>
    );
}

export default TechnologyCard;
