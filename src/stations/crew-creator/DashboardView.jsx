import { useState } from "react";
import { Link } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

export default function DashboardView() {
    const { crewmates, neededRoles, addNeededRole, removeNeededRole } = useCrewmates();
    const [roleInput, setRoleInput] = useState("");
    const sorted = [...crewmates].sort((a, b) => b.createdAt - a.createdAt);
    const filledRoles = neededRoles.filter((needed) => crewmates.some((c) => c.role.toLowerCase() === needed.toLowerCase()));
    const coveragePercent = neededRoles.length === 0 ? 1 : filledRoles.length / neededRoles.length;

    function handleAddRole(e) {
        e.preventDefault();
        addNeededRole(roleInput);
        setRoleInput("");
    }

    return (
        <div className="crew-creator-station hologram">
            <h1 className="station-title hologram-text">
                Crew Assignments
            </h1>
            <p className="station-subtitle hologram-hint">
                Build your crew and track their responsibilities
            </p>

            <Link to="/create" className="hologram-label">
                + Add Crew Member
            </Link>

            <div className="role-planner hologram">
                <h3 className="hologram-label">
                    What roles does this mission need?
                </h3>
                <p className="hologram-hint">
                    Define what roles you're trying to fill. This only drives the coverage indicator below, it doesn't restrict what roles members can have!
                </p>
                <form onSubmit={handleAddRole} className="role-form">
                    <input 
                        type="text"
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        placeholder="e.g. Engineering Lead, Project Lead, Primary Investigator"
                    />
                    <button
                        type="submit"
                        className="hologram-label"
                    >
                        Add Role
                    </button>
                </form>
                {neededRoles.length > 0 && (
                    <ul className="role-list">
                        {neededRoles.map((role) => {
                            const filled = filledRoles.includes(role);
                            return (
                                <li key={role} className="hologram-hint">
                                    {role} - {filled ? "filled" : "open"}{" "}
                                    <button
                                        className="hologram-label"
                                        onClick={() => removeNeededRole(role)}
                                    >
                                        remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {neededRoles.length > 0 && (
                <p className="coverage-readout hologram-hint">
                    Mission coverage: {filledRoles.length}/{neededRoles.length} needed roles filled
                </p>
            )}

            {sorted.length === 0 ? (
                <p className="hologram-hint">
                    No crew assigned yet
                </p>
            ) : (
                <div
                    className="crew-roster"
                    style={{ filter: `grayscale(${100 - coveragePercent * 100}%)`, transition: "filter 0.4s ease", }}
                >
                    {sorted.map((c) => (
                        <Link key={c.id} to={`/crew/${c.id}`} className="crew-card hologram">
                            <strong className="hologram-text">
                                {c.name}
                            </strong>
                            <div className="hologram-hint">
                                {c.role}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}