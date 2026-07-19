import { useParams, Link, Navigate } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

export default function CrewDetail() {
  const { id } = useParams();
  const { getCrewmate, toggleTask } = useCrewmates();
  const crewmate = getCrewmate(id);

  if (!crewmate) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="crew-creator-station hologram">
      <h1 className="station-title hologram-text">{crewmate.name}</h1>
      <p className="hologram-hint">Role: {crewmate.category}</p>
      <p className="hologram-hint">
        Joined the crew: {new Date(crewmate.createdAt).toLocaleString()}
      </p>

      <div className="task-checklist">
        <h3 className="hologram-label">Assigned Tasks</h3>
        {crewmate.tasks.length === 0 ? (
          <p className="hologram-hint">No tasks assigned.</p>
        ) : (
          <ul className="role-list">
            {crewmate.tasks.map((task) => (
              <li key={task.id} className="hologram-hint">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(crewmate.id, task.id)}
                  />{" "}
                  {task.text}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to={`/crew/${crewmate.id}/edit`} className="hologram-label">
        Edit this crew member
      </Link>
      <br />
      <Link to="/" className="hologram-label">
        Back to roster
      </Link>
    </div>
  );
}