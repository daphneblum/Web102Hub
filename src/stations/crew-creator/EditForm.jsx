import { useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";
import AttributeChips from "./AttributeChips.jsx";
import TaskPicker from "./TaskPicker.jsx";

export default function EditForm() {
  const { id } = useParams();
  const {
    getCrewmate,
    updateCrewmate,
    deleteCrewmate,
    categories,
    tasksByCategory,
  } = useCrewmates();
  const navigate = useNavigate();
  const crewmate = getCrewmate(id);

  const [name, setName] = useState(crewmate?.name ?? "");
  const [category, setCategory] = useState(crewmate?.category ?? "");
  const [selectedTasks, setSelectedTasks] = useState(
    crewmate ? crewmate.tasks.map((t) => t.text) : []
  );

  if (!crewmate) {
    return <Navigate to="/" replace />;
  }

  const poolTasks = category ? tasksByCategory[category] || [] : [];
  const availableTasks = Array.from(new Set([...poolTasks, ...selectedTasks]));

  function toggleTask(task) {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !category) return;
    updateCrewmate(id, {
      name: name.trim(),
      category,
      taskTexts: selectedTasks,
    });
    navigate(`/crew/${id}`);
  }

  function handleDelete() {
    deleteCrewmate(id);
    navigate("/");
  }

  return (
    <div className="crew-creator-station hologram">
      <h1 className="station-title hologram-text">Update {crewmate.name}</h1>
      <p className="hologram-hint">
        Current info: Name: {crewmate.name}, Role: {crewmate.category}
      </p>
      <form onSubmit={handleSubmit} className="crew-form">
        <label className="hologram-hint">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <span className="hologram-label">Assigned Tasks</span>
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

        <button
          type="submit"
          className="engage-button hologram-label"
          disabled={!name.trim() || !category}
        >
          Update Crew Member
        </button>
      </form>
      <button className="hologram-label" onClick={handleDelete}>
        Delete Crew Member
      </button>
      <br />
      <Link to="/" className="hologram-label">
        Back to roster
      </Link>
    </div>
  );
}