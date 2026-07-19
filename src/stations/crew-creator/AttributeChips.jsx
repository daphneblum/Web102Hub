

export default function AttributeChips({ label, options, value, onSelect }) {
    return (
        <div className="attribute-chips">
            <span className="hologram-label">
                {label}
            </span>
            <div className="chip-row">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        className={`chip hologram-label ${value === opt ? "chip-selected" : ""}`}
                        onClick={() => onSelect(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}