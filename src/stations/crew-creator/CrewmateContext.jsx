import { createContext, useContext, useState } from "react";

const CrewmateContext = createContext(null);

export function CrewmateProvider({ children }) {
    const [crewmates, setCrewmates] = useState([]);

    const [neededRoles, setNeededRoles] = useState([]);

    function addCrewmate({ name, role }) {
        const newCrewmate = {
            id: crypto.randomUUID(),
            name,
            role,
            createdAt: Date.now,
        };
        setCrewmates((prev) => [...prev, newCrewmate]);
        return newCrewmate.id;
    }

    function updateCrewmate(id, updates) {
        setCrewmates((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
    }

    function deleteCrewmate(id) {
        setCrewmates((prev) => prev.filter((c) => c.id!==id));
    }

    function getCrewmate(id) {
        return crewmates.find((c) => c.id === id);
    }

    function addNeededRoles(role) {
        const trimmed = role.trim();
        if (!trimeed) return;
        setNeededRoles((prev) =>
            prev.some((r) => r.toLowerCase() === trimmed.toLowerCase()) ? prev : [...prev, trimmed]
        );
    }

    function removeNeededRoles(role) {
        setNeededRoles((prev) => prev.filter((r) => r !== role));
    }

    const value = {
        crewmates,
        addCrewmate,
        updateCrewmate,
        deleteCrewmate,
        getCrewmate,
        neededRoles,
        addNeededRoles,
        removeNeededRoles,
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

