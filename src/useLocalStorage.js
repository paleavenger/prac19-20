import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (e) {
            console.warn('Не удалось прочитать localStorage', e);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Не удалось сохранить в localStorage', e);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;

