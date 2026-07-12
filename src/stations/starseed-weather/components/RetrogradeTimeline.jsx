import { useRetrogradeTimeline } from "../hooks/useRetrogradeTimeline";

const CHART_LEFT = 90;
const CHART_WIDTH = 480;
const ROW_HEIGHT = 28;
const TOP_PAD = 24;
const BOTTOM_PAD = 28;

function parseDate(str) {
    return new Date(`${str}T00:00:00Z`);
}

function daysBetween(a, b) {
    return (parseDate(b) - parseDate(a)) / 86400000;
}

export default function RetrogradeTimeline() {
    const { data, loading, error } = useRetrogradeTimeline();

    if (loading) {
        return <p className="starseed-status-text">Charting retrograde windows...</p>
    }

    if (error) {
        return (
            <p className="starseed-status-text starseed-status-text--error">Signal lost: {error.message}</p>
        );
    }

    const { rangeStart, rangeEnd, today, timeline } = data;
    const totalDays = daysBetween(rangeStart, rangeEnd);
    const xScale = (dateStr) => CHART_LEFT + (daysBetween(rangeStart, dateStr) / totalDays) * CHART_WIDTH;
    const chartHeight = TOP_PAD + timeline.length * ROW_HEIGHT + BOTTOM_PAD;
    const todayX = xScale(today);

    return (
        <div className="starseed-card">
            <p className="starseed-card__label">Retrograde Timeline</p>
            <svg
                viewBox={`0 0 ${CHART_LEFT + CHART_WIDTH + 20} ${chartHeight}`}
                width="100%"
                role="img"
                aria-label="Retrograde windows for each tracked body, roughly 30 days before and 60 days after today"    
            >
                <line
                    x1={todayX} y1={4} x2={todayX} y2={chartHeight - BOTTOM_PAD + 4}
                    stroke="var(--starseed-signal-pink)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                />
                <text
                    x={todayX} y={12}
                    fill="var(--starseed-signal-pink)"
                    fontSize="8"
                    textAnchor="middle"
                    fontFamily="Orbitron, sans-serif"
                >
                    TODAY
                </text>
                {timeline.map((row, i) => {
                    const y = TOP_PAD + i * ROW_HEIGHT;
                    return (
                        <g key={row.body}>
                            <text
                                x={4} y={y + ROW_HEIGHT / 2 + 4}
                                fill="var(--starseed-chrome-white)"
                                fontSize="10"
                                fontFamily="Orbitron, sans-serif"
                            >
                                {row.body}
                            </text>
                            <line
                                x1={CHART_LEFT} y1={y + ROW_HEIGHT / 2}
                                x2={CHART_LEFT + CHART_WIDTH} y2 = {y + ROW_HEIGHT / 2}
                                stroke="rgba(155, 93, 229, 0.15)"
                                strokeWidth="1"
                            />

                            {row.segments.map((seg) => {
                                const x = xScale(seg.start);
                                const width = Math.max(xScale(seg.end) - x, 3);
                                const isActiveNow = seg.start <= today && today <= seg.end;

                                return (
                                    <rect
                                        key={`${row.body}-${seg.start}`}
                                        x={x} y={y + 4}
                                        width={width} height={ROW_HEIGHT - 8}
                                        rx={4}
                                        fill={isActiveNow ? 'var(--starseed-signal-pink)' : 'var(--starseed-nebula-violet)'}
                                        opacity={isActiveNow ? 0.9 : 0.6}
                                    />
                                );
                            })}
                        </g>
                    );
                })}
                <text
                    x={CHART_LEFT} y = {chartHeight - 8}
                    fill="rgba(201, 174, 255, 0.6)"
                    fontSize="8"
                    fontFamily="Orbitron, sans-serif"    
                >
                    {rangeStart}
                </text>
                <text
                    x={CHART_LEFT + CHART_WIDTH} y={chartHeight - 8}
                    fill="rgba(201, 174, 255, 0.6)"
                    fontSize="8"
                    textAnchor="end"
                    fontFamily="Orbitron, sans-serif" 
                >
                    {rangeEnd}
                </text>
            </svg>
        </div>
    );
}