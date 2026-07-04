import { useMemo } from "react";

function SummaryBar({ events = [] }) {
    const stats = useMemo(() => {
        if (!events.length) {
            return { total: 0, topCountry: "-", latestHeadline: "No active threats detected globally." };
        }

        const counts = {};
        events.forEach((a) => {
            const countryKey = a.country || "-";
            if (countryKey !== "-") {
                counts[countryKey] = (counts[countryKey] || 0) + 1;
            }
        });

        const topCountry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
        const latestHeadline = events[0]?.title || "No active threats detected.";

        return { total: events.length, topCountry, latestHeadline };
    }, [events]);

    return (
        <div className="summary-terminal">
            <p className="summary-terminal__text">
                <span className="summary-terminal__status-tag">
                    <span className="summary-terminal__cursor">&gt;</span> SYSTEM STATUS LOG:
                </span> 
                A total of <span className="summary-terminal__metric">{stats.total} REPORT(S)</span> have been logged within the active 72-hour matrix. Telemetry analysis indicates that the most critical sector activity is currently concentrated in <span className="summary-terminal__metric">{stats.topCountry.toUpperCase()}</span>. The latest intelligence dispatch reports: <span className="summary-terminal__headline">"{stats.latestHeadline}"</span>
            </p>
        </div>
    );
}

export default SummaryBar;