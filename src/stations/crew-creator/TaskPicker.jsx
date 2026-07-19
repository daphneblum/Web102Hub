

export default function TaskPicker({ tasks, selected, onToggle}) {
    return (
        <div
            className="chip-row"
        >
            {tasks.map((task) => (
                <button
                    type="button"
                    key={task}
                    className={`chip hologram-label ${selected.includes(task) ? "chip-selected" : ""}`}
                    onClick={() => onToggle(task)}
                >
                    {selected.includes(task) ? "✓ " : ""}
                    {task}
                </button>
            ))}
        </div>
    );
}