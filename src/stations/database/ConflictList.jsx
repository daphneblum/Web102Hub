function ConflictList({ events = [], searchTerm, setSearchTerm }) {
    return (
        <div className="conflict-list">
            <div className="conflict-list__controls">
                <input 
                    type="text" 
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="conflict-list__search"
                />
            </div>

            <div className="conflict-list__scroll">
                {events.length === 0 && (
                    <p className="conflict-list__empty">
                        No reports found. Try adjusting your search or filter criteria.
                    </p>
                )}
                {events.map((e, i) => {
                    const Row = e.url ? "a" : "div";
                    const rowProps = e.url ? { href: e.url, target: "_blank", rel: "noopener noreferrer" } : {};
                    return (
                        <Row key={i} {...rowProps} className="conflict-list__row">
                           <div>
                                <span className="conflict-list__location">
                                    {e.country || "Unknown"} - {e.date} - {e.category}
                                </span>
                            </div>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
}

export default ConflictList;