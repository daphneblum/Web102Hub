import { useMemo, useState } from "react";


function ConflictList({ articles = [] }) {
    const [search, setSearch] = useState("");
    const [countryFilter, setCountryFilter] = useState("all");

    const countries = useMemo(() => {
        const set = new Set(articles.map((a) => a.sourcecountry).filter(Boolean));
        return ["all", ...Array.from(set).sort()];
    }, [articles]);

    const filtered = useMemo(() => {
        return articles.filter((a) => {
            const matchesSearch = !search.trim() || a.title?.toLowerCase().includes(search.trim().toLowerCase());
            const matchesCountry = countryFilter === "all" || a.sourcecountry === countryFilter;
            return matchesSearch && matchesCountry;
        });
    }, [articles, search, countryFilter]);

    return (
        <div className="conflict-list">
            <div className="conflict-list__controls">
                <input 
                type="text" 
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="conflict-list__search"
                />

                <select 
                value={countryFilter} 
                onChange={(e) => setCountryFilter(e.target.value)}
                className="conflict-list__filter"
                >
                    {countries.map((c) => (
                        <option key={c} value={c}>
                            {c === "all" ? "All Countries" : c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="conflict-list__scroll">
                {filtered.length === 0 && (
                    <p className="conflict-list__empty">
                        No reports found. Try adjusting your search or filter criteria.
                    </p>
                )}
                {filtered.map((a, i) => (
                    <a
                        key={i}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="conflict-list__row"
                    >
                        <span className="conflict-list__title">
                            {a.title}
                        </span>
                        <span>
                            {a.sourcecountry || "Unknown"} - {a.seendate?.slice(0, 8)}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ConflictList;