
import "../../Hologram.css"

const FIELD_LABELS = {
    discoverymethod: "Discovery Method",
    hostname: "Host Star",
    disc_year: "Year Discovered",
};

function BanList({ banList, onUnban}) {
    const allBans = Object.entries(banList).flatMap(([field, values]) => values.map(value => ({ field, value })));

    return (
        <div className="ban-list-panel hologram">
            <h3 className="hologram-label">Banned Attributes</h3>
            <p className="hologram-hint">Click any entry to remove the ban</p>

            {allBans.length === 0 ? (
                <p className="ban-empty hologram-hint">No restrictions active</p>
            ) : (
                <ul className="ban-entries">
                    {allBans.map(({ field, value }) => (
                        <li
                            key={`${field}-${value}`}
                            className="ban-entry hologram-text"
                            onClick={() => onUnban(field, value)}
                        >
                            <span className="ban-field-label">{FIELD_LABELS[field]}</span>
                            🚫 {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default BanList;