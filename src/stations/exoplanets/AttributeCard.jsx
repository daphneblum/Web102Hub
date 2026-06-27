import "../../Hologram.css";

function AttributeCard({ label, value, bannable, isBanned, onBan }) {
    return (
        <div 
            className={`attribute-card ${bannable ? "bannable" : ""} ${isBanned ? "banned" : ""}`}
            onClick={bannable ? onBan : undefined}
        >
            <span className="attribute-label hologram-hint">{label}</span>
            <span className="attribute-value hologram-hint">{value}</span>
            {bannable && (
                <span className="ban-indicator">
                    {isBanned ? "🚫 Banned" : "Click to ban"}
                </span>
            )}

        </div>
    );
}

export default AttributeCard;