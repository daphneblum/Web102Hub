import { useState } from "react";
import { Link } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

export default function SetUpPage() {
    const {
        categories,
        tasksByCategory,
        addCategory,
        addTaskToCategory,
        removeTaskFromCategory,
    } = useCrewmates();

    const [categoryInput, setCategoryInput] = useState("");
    const [taskInputs, setTaskInputs] = useState({});

    function handleAddCategory(e) {
        e.preventDefault();
        addCategory(categoryInput);
        setCategoryInput("");
    }

    function handleAddTask(category, e) {
        e.preventDefault();
        addTaskToCategory(category, taskInputs[category] || "");
        setTaskInputs((prev) => ({ ...prev, [category]: "" }));
    }

    return (
        <div className="crew-creator-station hologram">
            <h1 className="station-title hologram-text">
                Manage Roles &amp; Tasks
            </h1>
            <p className="hologram-hint">
                Define the roles your crew can have and the pool of tasks available to each. When adding a crew member, you'll pick their role, then assign their tasks.
            </p>

            <form onSubmit={handleAddCategory} className="role-form">
                <input 
                    type="text" 
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="e.g. Engineering Lead"
                />
                <button type="submit" className="hologram-label">
                    Add Role
                </button>
            </form>

            {categories.length === 0 && (
                <p className="hologram-hint">
                    No roles yet. Add one above to get started.
                </p>
            )}

            {categories.map((category) => (
                <div key={category} className="category-panel hologram">
                    <h3 className="hologram-label">
                        {category}
                    </h3>
                    {(tasksByCategory[category] || []).length > 0 ? (
                        <ul className="role-list">
                            {tasksByCategory[category].map((task) => (
                                <li key={task} className="hologram-hint">
                                    {task}{" "}
                                    <button className="hologram-label" onClick={() => removeTaskFromCategory(category, task)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="hologram-hint">
                            No tasks defined for this role yet.
                        </p>
                    )}

                    <form
                        onSubmit={(e) => handleAddTask(category, e)}
                        className="role-form"
                    >
                        <input 
                            type="text" 
                            value={taskInputs[category] || ""}
                            onChange={(e) =>
                                setTaskInputs((prev) => ({
                                    ...prev, 
                                    [category]: e.target.value,
                                }))
                            }
                            placeholder="e.g. Write test plan"
                        />
                        <button type="submit" className="hologram-label">
                            Add Task
                        </button>
                    </form>
                </div>
            ))}

            <Link to="/" className="hologram-label">
                Back to Roster
            </Link>
        </div>
    );
}