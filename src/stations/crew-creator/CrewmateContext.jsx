import { createContext, useContext, useState } from "react";

const CrewmateContext = createContext(null);

function buildTasks(existingTasks, selectedTexts) {
    return selectedTexts.map((text) => {
        const existing = existingTasks.find((t) => t.text === text);
        return existing || { id: crypto.randomUUID(), text, done: false };
    });
}

export function CrewmateProvider({ children }) {
    const [crewmates, setCrewmates] = useState([]);

    const [categories, setCategories] = useState([]);
    const [tasksByCategory, setTasksByCategory] = useState({});

    function addCategory(name) {
        const trimmed = name.trim();
        if (!trimmed) return;
        const existing = categories.find(
            (c) => c.toLowerCase() === trimmed.toLowerCase()
        );
        const canonical = existing || trimmed;
        if (!existing) {
            setCategories((prev) => [...prev, trimmed]);
        }
        setTasksByCategory((prev) =>
            prev[canonical] ? prev : { ...prev, [canonical]: [] }
        );
    }

    function addTaskToCategory(category, taskText) {
        const trimmed = taskText.trim();
        if (!trimmed) return;
        setTasksByCategory((prev) => {
            const existing = prev[category] || [];
            if (existing.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
                return prev;
            }
            return { ...prev, [category]: [...existing, trimmed] };
        });
    }

    function removeTaskFromCategory(category, taskText) {
        setTasksByCategory((prev) => ({
            ...prev,
            [category]: (prev[category] || []).filter((t) => t !== taskText),
        }));
    }

    function addCrewmate({ name, category, taskTexts }) {
        const newCrewmate = {
            id: crypto.randomUUID(),
            name,
            category,
            tasks: buildTasks([], taskTexts),
            createdAt: Date.now(),
        };
        setCrewmates((prev) => [...prev, newCrewmate]);
        return newCrewmate.id;
    }

    function updateCrewmate(id, { name, category, taskTexts }) {
        setCrewmates((prev) =>
            prev.map((c) => {
                if (c.id !== id) return c;
                return {
                    ...c,
                    name,
                    category,
                    tasks: buildTasks(c.tasks, taskTexts),
                };
            })
        );
    }

    function toggleTask(crewmateId, taskId) {
        setCrewmates((prev) => 
            prev.map((c) =>
                c.id === crewmateId ? {
                    ...c,
                    tasks: c.tasks.map((t) =>
                    t.id === taskId ? { ...t, done: !t.done } : t ),
                } : c 
            )
        );
    }
    function deleteCrewmate(id) {
        setCrewmates((prev) => prev.filter((c) => c.id!==id));
    }

    function getCrewmate(id) {
        return crewmates.find((c) => c.id === id);
    }

    const value = {
        crewmates,
        addCrewmate,
        updateCrewmate,
        deleteCrewmate,
        getCrewmate,
        toggleTask,
        categories,
        tasksByCategory,
        addCategory,
        addTaskToCategory,
        removeTaskFromCategory,
    };

    return (
        <CrewmateContext.Provider value={value}>
            {children}
        </CrewmateContext.Provider>
    );
}


export function useCrewmates() {
    const ctx = useContext(CrewmateContext);
    if (!ctx) {
        throw new Error("useCrewmates must be used within a CrewmateProvider");
    }
    return ctx;
}

