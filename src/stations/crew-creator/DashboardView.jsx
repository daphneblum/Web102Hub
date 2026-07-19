import { useNavigate, Link } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

// Cool slate blue (low completion) -> warm pink (full completion). Chosen to
// work with the hologram glow instead of fighting it, and to read clearly
// at every step instead of a near-invisible greyscale ramp.
const COLOR_START = [90, 110, 150];
const COLOR_END = [255, 110, 160];

function lerpBorderColor(percent) {
  const [r, g, b] = COLOR_START.map((start, i) =>
    Math.round(start + (COLOR_END[i] - start) * percent)
  );
  return `rgb(${r}, ${g}, ${b})`;
}

export default function DashboardView() {
  const { crewmates } = useCrewmates();
  const navigate = useNavigate();

  const sorted = [...crewmates].sort((a, b) => b.createdAt - a.createdAt);

  // Required feature 8: custom success metric that changes the look of the
  // list. Based on task completion across the whole crew.
  const allTasks = crewmates.flatMap((c) => c.tasks);
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter((t) => t.done).length;
  const completionPercent = totalTasks === 0 ? 1 : doneTasks / totalTasks;

  // Required feature 7: summary statistics about the crew.
  const totalCrew = crewmates.length;
  const categoryCounts = crewmates.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});
  const topCategoryEntry = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const topCategoryPercent = topCategoryEntry
    ? Math.round((topCategoryEntry[1] / totalCrew) * 100)
    : 0;

  return (
    <div className="crew-creator-station hologram">
      <h1 className="station-title hologram-text">Crew Assignments</h1>
      <p className="station-subtitle hologram-hint">
        Build your crew and track their responsibilities
      </p>

      <div className="dashboard-nav">
        <Link to="/create" className="hologram-label">
          + Add Crew Member
        </Link>
        <Link to="/setup" className="hologram-label">
          Manage Roles &amp; Tasks
        </Link>
      </div>

      {totalCrew > 0 && (
        <div className="summary-stats hologram">
          <h3 className="hologram-label">Crew Statistics</h3>
          <p className="hologram-hint">Total crew members: {totalCrew}</p>
          <p className="hologram-hint">
            Roles represented: {Object.keys(categoryCounts).length}
          </p>
          {topCategoryEntry && (
            <p className="hologram-hint">
              Largest role group: {topCategoryEntry[0]} (
              {topCategoryPercent}% of crew)
            </p>
          )}
          <p className="hologram-hint">
            Tasks completed: {doneTasks}/{totalTasks}
            {totalTasks > 0
              ? ` (${Math.round(completionPercent * 100)}%)`
              : ""}
          </p>
          {totalTasks > 0 && (
            <div className="task-progress">
              <div className="task-progress-track">
                <div
                  className="task-progress-fill"
                  style={{ width: `${Math.round(completionPercent * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="hologram-hint">No crew assigned yet</p>
      ) : (
        <div className="crew-roster">
          {sorted.map((c) => {
            const done = c.tasks.filter((t) => t.done).length;
            const memberPercent =
              c.tasks.length === 0 ? 1 : done / c.tasks.length;
            return (
              <div
                key={c.id}
                className="crew-card hologram"
                style={{ borderColor: lerpBorderColor(memberPercent) }}
                onClick={() => navigate(`/crew/${c.id}`)}
              >
                <strong className="hologram-text">{c.name}</strong>
                <div className="hologram-hint">{c.category}</div>
                <div className="hologram-hint">
                  {done}/{c.tasks.length} tasks done
                </div>
                <button
                  className="hologram-label crew-card-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/crew/${c.id}/edit`);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}