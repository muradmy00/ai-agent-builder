import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? (JSON.parse(saved) as T) : initialValue;
        } catch (error) {
            console.error("LocalStorage parse error:", error);
            return initialValue;
        }
    });

    const setStoredValue = (newValue: React.SetStateAction<T>) => {
        setValue((prev) => {
            const valueToStore =
                newValue instanceof Function ? newValue(prev) : newValue;

            try {
                localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error("LocalStorage set error:", error);
            }

            return valueToStore;
        });
    };

    return [value, setStoredValue] as const;
}