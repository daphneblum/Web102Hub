import { usePositions } from "../hooks/usePositions.js";

const HARMONIOUS = new Set(['sextile', 'trine']);
const DISCORDANT = new Set(['square', 'opposition']);

export default function SignalClarityStat() {
    const { data, loading, error } = usePositions();

    if (loading || error || !data) return null;

    const discordantCount = data.aspects.filter((a) => DISCORDANT.has(a.aspect)).length;
    const harmoniousCount = data.aspects.filter((a) => HARMONIOUS.has(a.aspect)).length;

    return (
        <div className="starseed-card" style={{ display: 'flex', gap: 24 }}>
            <div>
                <p className="starseed-card__label">Signal Clarity - Lo</p>
                <p className="starseed-card__value">{discordantCount}</p>
            </div>
            <div>
                <p className="starseed-card__label">Signal Clarity - Hi</p>
                <p className="starseed-card__value">{harmoniousCount}</p>
            </div>
        </div>
    );
}