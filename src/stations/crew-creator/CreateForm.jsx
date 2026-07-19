import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";
import AttributeChips from "./AttributeChips.jsx";
import TaskPicker from "./TaskPicker.jsx";

export default function CreateForm() {
    const { addCrewmate, categories, tasksByCategory } = useCrewmates();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [category, useCategory] = useState("");
    const [selectedTasks, setSelectedTasks] = useState([]);
    const availableTasks = category ? tasksByCategory[category] || [] : [];

    function toggleTask(task) {
        setSelectedTasks((prev) => 
            prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!name.trim() || category) return;
        addCrewmate({ name: name.trim(), category, taskTexts: selectedTasks });
        navigate("/");
    }

    if ( categories.length === 0) {
        return (
            <div className="crew-creator-station hologram">
                <h1 className="station-title hologram-text">
                    Add a Crew Member
                </h1>
                <p className="hologram-hint">
                    No roles have been set up yet. Head to the setup page to create roles and their tasks first.
                </p>
                <Link to="/setup" className="hologram-label">
                    Manage Roles &amp; Tasks
                </Link>
            </div>
        );
    }

    return (
        <div className="crew-creator-station hologram">
            <h1 className="station-title hologram-text">Add a Crew Member</h1>
            <form onSubmit={handleSubmit} className="crew-form">
                <label className="hologram-hint">
                    Name:
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter their name"
                    />
                </label>

                <AttributeChips 
                    label="Role"
                    options={categories}
                    value={category}
                    onSelect={(v) => {
                        if (v === category) return;
                        setCategory(v);
                        setSelectedTasks([]);
                    }}
                />

                {category && (
                    <div className="attribute-chips">
                        <span className="hologram-label">
                            Assigned Tasks
                        </span>
                        {availableTasks.length === 0 ? (
                            <p className="hologram-hint">
                                No tasks defined for this role yet.{" "}
                                <Link to="/setup" className="hologram-label">
                                    Add some
                                </Link>
                            </p>
                        ) : (
                            <TaskPicker 
                                tasks={availableTasks}
                                selected={selectedTasks}
                                onToggle={toggleTask}
                            />
                        )}
                    </div>
                )}

                <button type="submit" className="engage-button hologram-label" disabled={!name.trim() || !category}>
                    Add to Crew
                </button>
            </form>
        </div>
    );
}