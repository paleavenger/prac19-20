// src/App.jsx
import { useState } from 'react';
import TechnologyCard from '../src/components/TechnologyCard.jsx';
import './App.css';
import Statistics from './Statistics';
import QuickActions from './QuickActions';


function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started'
        },
        {
            id: 3,
            title: 'Props & State',
            description: 'Передача данных и управление состоянием',
            status: 'not-started'
        }
    ]);

    const changeStatus = (id) => {
        setTechnologies(prev =>
            prev.map(tech => {
                if (tech.id !== id) return tech;

                let newStatus = 'not-started';

                if (tech.status === 'not-started') newStatus = 'in-progress';
                else if (tech.status === 'in-progress') newStatus = 'completed';
                else if (tech.status === 'completed') newStatus = 'not-started';

                return { ...tech, status: newStatus };
            })
        );
    };

    const [filter, setFilter] = useState("all");

    const filteredTechnologies = technologies.filter(t => {
        if (filter === "all") return true;
        return t.status === filter;
    });


    return (
        <div className="App">
            <h1>Дорожная карта изучения</h1>

            <QuickActions
                technologies={technologies}
                setTechnologies={setTechnologies}
            />


            <Statistics technologies={technologies} />

            <div className="filters">
                <button onClick={() => setFilter("all")}>Все</button>
                <button onClick={() => setFilter("not-started")}>Не начато</button>
                <button onClick={() => setFilter("in-progress")}>В процессе</button>
                <button onClick={() => setFilter("completed")}>Завершено</button>
            </div>


            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        technology={tech}
                        onStatusChange={changeStatus}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
