import { useState } from "react";
import { Link } from "react-router-dom";
import { usePositions } from "../hooks/usePositions";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 40;
const PLANET_DOT_RADIUS = 5;

const ASPECT_STYLE = {
  conjunction: { color: 'var(--starseed-chrome-white)', dash: '1,3', widthScale: 1.4 },
  sextile: { color: 'var(--starseed-lavender)', dash: null, widthScale: 1 },
  trine: { color: 'var(--starseed-nebula-violet)', dash: null, widthScale: 1.5 },
  square: { color: 'var(--starseed-signal-pink)', dash: '4,3', widthScale: 1 },
  opposition: { color: 'var(--starseed-signal-pink)', dash: null, widthScale: 1.8 },
};

function pointOnCircle(longitude, radius) {
    const angleRad = ((longitude - 90) * Math.PI) / 180;
    return {
        x: CENTER + radius * Math.cos(angleRad),
        y: CENTER + radius * Math.sin(angleRad),
    };
}

export default function AspectRadar() {
    const { data, loading, error } = usePositions();
    const [view, setView] = useState('scope');

    if (loading) {
        return <p className="starseed-status-text">Scanning aspect field...</p>
    }

    if (error) {
        return (
            <p className="starseed-status-text starseed-status-text--error">
                Signal lost: {error.message}
            </p>
        );
    }

    const { positions, aspects } = data;
    const positionByBody = Object.fromEntries(positions.map((p) => [p.body, p]));

    return (
        <div className="starseed-card">
            <div
                style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12
                }}    
            >
                <p className="starseed-card__label" style={{ margin: 0 }}>Aspect Radar</p>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button
                        type="button"
                        onClick={() => setView('scope')}
                        aria-pressed={view === 'scope'}
                        className="starseed-nav__link"
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            background: view === 'scope' ? 'rgba(155, 93, 229, 0.18)' : 'transparent',
                            color: view === 'scope' ? 'var(--starseed-lavender)' : undefined,
                        }}
                    >
                        Scope
                    </button>
                    <button
                        type="button"
                        onClick={() => setView('list')}
                        aria-pressed={view === 'list'}
                        className="starseed-nav__link"
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            background: view === 'list' ? 'rgba(155, 93, 229, 0.18)' : 'transparent',
                            color: view === 'list' ? 'var(--starseed-lavender)' : undefined,
                        }}
                    >
                        List
                    </button>
                </div>
            </div>

            {view === 'scope' ? (
                <svg
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    width="100%"
                    style={{
                        maxWidth: 360,
                        display: 'block',
                        margin: '0 auto'
                    }}
                    role="img"
                    aria-label={`Aspect radar showing ${aspects.length} active aspects between tracked bodies`}
                >
                    {[0.33, 0.66, 1].map((f) => (
                        <circle 
                            key={f}
                            cx={CENTER} cy={CENTER} r={RADIUS * f}
                            fill="none"
                            stroke="rgba(155, 93, 229, 0.15"
                            strokeWidth="1"
                        />
                    ))}

                    {Array.from({ length: 12 }).map((_, i) => {
                        const p = pointOnCircle(i * 30, RADIUS);
                        return (
                            <line
                                key={i}
                                x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
                                stroke="rgba(155, 93, 229, 0.1"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {aspects.map((a) => {
                        const pA = positionByBody[a.bodyA];
                        const pB = positionByBody[a.bodyB];
                        if (!pA || !pB) return null;

                        const start = pointOnCircle(pA.longitude, RADIUS);
                        const end = pointOnCircle(pB.longitude, RADIUS);
                        const style = ASPECT_STYLE[a.aspect] ?? ASPECT_STYLE.conjunction;

                        return (
                            <line
                                key={`${a.bodyA}-${a.bodyB}`}
                                x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                                stroke={style.color}
                                strokeWidth={style.widthScale * (0.5 + a.tightness)}
                                strokeDasharray={style.dash ?? undefined}
                                opacity={0.4 + a.tightness * 0.5}
                            />
                        );
                    })}

                    {positions.map((p) => {
                        const pt = pointOnCircle(p.longitude, RADIUS);
                        return (
                            <g key={p.body}>
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={PLANET_DOT_RADIUS}
                                    fill={p.retrograde ? 'var(--starseed-signal-pink)' : 'var(--starseed-chrome-white)'}
                                />
                                <text
                                    x={pt.x} y={pt.y - 10}
                                    fill="var(--starseed-chrome-white)"
                                    fontSize="8"
                                    textAnchor="middle"
                                    fontFamily="Orbitron, sans-serif"
                                >
                                    {p.body}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            ) : (
                <div
                    style={{
                        display: 'flex', flexDirection: 'column', gap: 4
                    }}
                >
                    {aspects.length === 0 && (
                        <p className="starseed-status-text">
                            No major aspects in orb right now.
                        </p>
                    )}

                    {aspects.map((a) => (
                        <Link
                            key={`${a.bodyA}-${a.bodyB}`}
                            to={`/planet/${a.bodyA.toLowerCase()}`}
                            className="starseed-card"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr auto',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                padding: '8px 12px',
                            }}
                        >
                            <span className="starseed-card__value" style={{ fontSize: 11 }}>
                                {a.bodyA} - {a.bodyB}
                            </span>
                            <span className="starseed-card__label" style={{ margin: 0, textTransform: 'capitalize' }}>
                                {a.aspect}
                            </span>
                            <span style={{ fontSize: 10, opacity: 0.6 }}>
                                {a.orb}° orb
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}