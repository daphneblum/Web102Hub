import { use, useMemo } from "react";

//considering adding LLM integration for summarizing conflict data, but for now, this component will just display a summary bar with key metrics.

function SummaryBar ({ events = []} ) {
    const stats = useMemo(() => {
        if (!events.length) {
            return { total: 0, topCountry: "-", latest: "-" };
        }

        const counts = {};
        events.forEach((a) => {
            if (a.sourcecountry) counts[a.sourcecountry] = (counts[a.sourcecountry] || 0) + 1;
        });

        const topCountry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
        const latest = events.map((a) => a.seendate).filter(Boolean).sort().reverse()[0];

        return { total: events.length, topCountry, latest: latest ? `${latest.slice(0, 4)}-${latest.slice(4,6)}-${latest.slice(6,8)}` : "-", };
    }, [events]);

    return (
        <div className="summary-bar">
            <div className="summary-bar__stat">
                <span className="summary-bar__value">
                    {stats.total}
                </span>
                <span className="summary-bar__label">
                    Total Reports (72h)
                </span>
            </div>
            <div className="summary-bar__stat">
                <span className="summary-bar__value">
                    {stats.topCountry}
                </span>
                <span className="summary-bar__label">
                    Most Active Region
                </span>
            </div>
            <div className="summary-bar__stat">
                <span className="summary-bar__value">
                    {stats.latest}
                </span>
                <span className="summary-bar__label">
                    Latest Report
                </span>
            </div>
        </div>
    );
}

export default SummaryBar;