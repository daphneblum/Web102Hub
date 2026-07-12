export default function SummaryStats({ data }) {
    if (!data) return null;

    const { positions, aspects, moon, retrogradeBodies } = data;
    const tightestAspect = aspects[0];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr',
            gap: 10,
            marginBottom: 16,
        }}>
            <div className="starseed-card">
                <span className="starseed-card__label">
                    Retrograde Bodies
                </span>
                <span className="starseed-card__value">
                    {retrogradeBodies.length} / {positions.length}
                </span>
            </div>

            <div className="starseed-card">
                <span className="starseed-card__label">
                    Active Aspects
                </span>
                <span className="starseed-card__value">
                    {aspects.length}
                    {tightestAspect && (
                        <span style={{ fontSize: 10, opacity: 0.6, marginLeft: 6 }}>
                            (tightest: {tightestAspect.orb}°)
                        </span>
                    )}
                </span>
            </div>

            <div className="starseed-card">
                <span className="starseed-card__label">
                    Moon Phase
                </span>
                <span className="startseed-card__value">
                    {moon.name}
                </span>
            </div>
        </div>
    );
}