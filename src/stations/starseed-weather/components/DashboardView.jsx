import { Link } from 'react-router-dom';
import { usePositions } from '../hooks/usePositions.js'

function DashboardView() {
    const { data, loading, error } = usePositions();

    if (loading) {
        return <p className='starseed-status-text'>
            Calibrating instruments...
        </p>;
    }

    if (error) {
        return (
            <p className='starseed-status-text starseed-status-text--error'>
                Signal lost: {error.message}
            </p>
        );
    }

    return (
        <div>
            <h2 className='starseed-card__label' style={{ fontSize: 12, marginBottom: 16 }}>
                Today's Position - {data.date}
            </h2>
            {/* TODO: search bar and category filter from project 5 */}

            <div>
                {data.positions.map((planet) => (
                    <Link   
                        key={planet.body}
                        to={`/planet/${planet.body.toLowerCase()}`}
                        className='starseed-card'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr auto',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <span className='starseed-card__value'>{planet.body}</span>
                        <span className='starseed-card__value'>{planet.degree}°</span>
                        <span className='starseed-card__label' style={{ margin: 0 }}>{planet.retrograde ? 'Retrograde' : 'Direct'}</span>
                        <span style={{ fontSize: 10, opacity: 0.5 }}></span>
                    </Link>
                ))}
            </div>
            {/* TODO: three summary stats, Retrograde Timeline and Aspect Radar */}
            <p className='starseed-status-text' style={{ padding: '16px 0 0' }}>
                {data.notableFact}
            </p>
        </div>
    );
}