
import "../../Hologram.css"

function BanList({ banList, onUnban}) {
    return (
        <div className="ban-list-panel hologram">
            <h3 className="hologram-label">Banned Discovery Methods</h3>
            <p className="hologram-hint">Click any entry to remove the ban</p>

            {banList.length === 0 ? (
                <p className="ban-empty hologram-hint">No restrictions active - all discovery methods permitted</p>
            ) : (
                <ul className="ban-entries">
                    {banList.map(method => (
                        <li
                            keys={method}
                            className="ban-entry hologram-text"
                            onClick={() => onUnban(method)}
                        >
                            🚫 {method}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default BanList;