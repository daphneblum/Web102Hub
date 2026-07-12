import { useParams, Link } from "react-router-dom";
import { usePositions } from '../hooks/usePositions.js';

function PlanetDetail() {
    const { id } = useParams();
    const { data, loading, error } = usePositions();

    if (loading) {
        return <p className="starseed-status-text">Calibrating Instruments...</p>
    }

    if (error) {
        return (
            <p className="starseed-status-text starseed-status-text--error">
                Signal lost: {error.message}
            </p>
        );
    }

    const planet = data.positions.find((p) => p.body.toLowerCase() === id);

    if (!planet) {
        return (
            <div>
                <p className="starseed-status-text starseed-status-text-error">
                    No record found for "{id}"
                </p>
                <Link
                    to="/"
                    className="starseed-nav--link">
                   ← Back to Dashboard
                </Link>
            </div>
        );
    }

    const relatedAspects = data.aspects.filter(
        (a) => a.bodyA.toLowerCase() === id || a.bodyB.toLowerCase() == id
    );

    return (
        <div>
            <Link
                to="/"
                className="starseed-nav--link"
                style={{ marginBottom: 16, display: 'inline-block'}}>
                ← Back to Dashboard
            </Link>

            <h2 className="starseed-card__label" style={{ fontSize: 12, marginBottom: 16 }}>
                {planet.body} - {planet.sign} {planet.degree}° {planet.retrograde ? '(Retrograde)' : ''}
            </h2>

            {/* TODO: orbit model animation */}

            <div className="starseed-card" style={{ marginBottom: 16 }}>
                <p className="starseed-card__label">
                    Active aspects today
                </p>
                {relatedAspects.length === 0 && (
                    <p className="starseed-card__value" style={{ fontSize: 12 }}>
                        No major aspects in orb right now.
                    </p>
                )}
                {relatedAspects.map((a) => {
                    const other = a.bodyA.toLowerCase() === id ? a.bodyB : a.bodyA;
                    return (
                        <p key={`${a.bodyA}-${a.bodyB}`} className="starseed-card__value" style={{ fontSize: 12 }}>
                            {a.aspect} with {other} ({a.orb}° orb)
                        </p>
                    );
                })}
            </div>
            {/* TODO: Astrological summary */}
            {/* TODO: Retrograde Timeline */}
        </div>
    );
}

export default PlanetDetail;