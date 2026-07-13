export default function StationMasthead({ eyebrow, title, subtitle, stats }) {
    return (
        <div className="starseed-masthead">
            {eyebrow && <p className="starseed-masthead__eyebrow">{eyebrow}</p>}
            <h1 className="starseed-masthead__title">{title}</h1>
            {subtitle && <p className="starseed-masthead__subtitle">{subtitle}</p>}

            {stats && stats.length > 0 && (
                <div className="starseed-masthead__stats">
                    {stats.map((stat, i) => (
                        <span key={stat.label}>
                            {i > 0 && <span className="starseed-masthead__stat-divider">-</span>}
                            <span className="starseed-masthead__stat-label">{stat.label}</span>{' '}
                            <span className="starseed-masthead__stat-value">{stat.value}</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}