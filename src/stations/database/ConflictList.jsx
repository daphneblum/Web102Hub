import { useMemo, useState } from "react";


function ConflictList({ events = [] }) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const countries = useMemo(() => {
        const set = new Set(events.map((a) => a.category).filter(Boolean));
        return ["all", ...Array.from(set).sort()];
    }, [events]);

    const filtered = useMemo(() => {
        return events.filter((a) => {
            const matchesSearch = !search.trim() || a.title?.toLowerCase().includes(search.trim().toLowerCase());
            const matchesCategory = categoryFilter === "all" || a.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [events, search, categoryFilter]);

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
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="conflict-list__filter"
                >
                    {countries.map((c) => (
                        <option key={c} value={c}>
                            {c === "all" ? "All Categories" : c}
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
                {filtered.map((e, i) => {
                    const Row = e.url ? "a" : "div";
                    const rowProps = e.url ? { href: e.url, target: "_blank", rel: "noopener noreferrer" } : {};
                    return (
                        <Row key={i} {...rowProps} className="conflict-list__row">
                            <span className="conflict-list__title">
                                {e.title}
                            </span>
                            <span>
                                {e.country || "Unknown"} - {e.date} - {e.category}
                            </span>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default ConflictList;