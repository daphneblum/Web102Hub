import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

export default function editForm() {
    const { id } = useParams();
    const { getCrewmate, updateCrewmate, deleteCrewmate } = useCrewmates();
    const navigate = useNavigate();
    const crewmate = getCrewmate(id);

    const [name, setName] = useState(crewmate?.name ?? "");
    const [role, setRole] = useState(crewmate?.role ?? "");

    if (!crewmate) {
        return <Navigate to="/" replace />;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim() || !role.trim()) return;
        updateCrewmate(id, { name: name.trim(), role: role.trim() });
        navigate(`/crew/${id}`);
    }

    function handleDelete() {
        deleteCrewmate(id);
        navigate("/");
    }

    return (
        <div className="crew-creator-station hologram">
            <h1 className="station-title hologram-text">
                Update {crewmate.name}
            </h1>
            <p className="hologram-hint">
                Current info: Name: {crewmate.name}, Role: {crewmate.role}
            </p>
            <form onSubmit={handleSubmit} className="crew-form">
                <label className="hologram-hint">
                    Name:
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </label>

                <label className="hologram-hint">
                    Role:
                    <input 
                        type="text" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </label>

                <button type="submit" className="engage-button hologram-label">
                    Update Crew Member
                </button>
            </form>
            <button className="hologram-label" onClick={handleDelete}>
                Delete Crew Member
            </button>
        </div>
    );
}