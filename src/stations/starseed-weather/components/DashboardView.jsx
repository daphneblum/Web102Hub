import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePositions } from '../hooks/usePositions.js'
import RetrogradeTimeline from './RetrogradeTimeline.jsx';
import AspectRadar from './AspectRadar.jsx';
import SummaryStats from './SummaryStats.jsx';

const ZODIAC_ELEMENT = {
    Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
    Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
    Gemini: 'air', Libra: 'air', Aquarius: 'air',
    Cancer: 'water', Scorpio: 'water', Pisces: 'water',
};

function DashboardView() {
    const { data, loading, error } = usePositions();
    const [search, setSearch] = useState('');
    const [element, setElement] = useState('all');
    const [retrogradeOnly, setRetrogradeOnly] = useState(false);
    const [minDegree, setMinDegree] = useState(0);
    
    const filteredPositions = useMemo(() => {
        if (!data) return [];
        const query = search.trim().toLowerCase();

        return data.positions.filter((p) => {
            const matchesSearch = !query || p.body.toLowerCase().includes(query) || p.sign.toLowerCase().includes(query);
            const matchesElement = element === 'all' || ZODIAC_ELEMENT[p.sign] === element;
            const matchesRetrograde = !retrogradeOnly || p.retrograde;
            const matchesDegree = p.degree >= minDegree;

            return matchesSearch && matchesElement && matchesRetrograde && matchesDegree;
        });
    }, [data, search, element, retrogradeOnly, minDegree]);

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
            
            <div className='starseed-filter-row'>
                <input 
                    type="text"
                    className='starseed-input'
                    placeholder='Search by name or sign...'
                    aria-label='Search planets by name or zodiac sign'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                />

                <select
                    className='starseed-input'
                    aria-label='Filter by zodiac element'
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                >
                    <option value="all">All elements</option>
                    <option value="fire">Fire</option>
                    <option value="earth">Earth</option>
                    <option value="air">Air</option>
                    <option value="water">Water</option>
                </select>

                <label className="starseed-filter-label">
                    <input 
                        type="checkbox" 
                        checked={retrogradeOnly}
                        onChange={(e) => setRetrogradeOnly(e.target.checked)}
                    />
                    Retrograde only
                </label>

                <label className="starseed-filter-label">
                    Min degree: {minDegree}°
                    <input 
                        type="range" 
                        min="0"
                        max="29"
                        value={minDegree}
                        aria-label="Minimum degree within sign"
                        onChange={(e) => setMinDegree(Number(e.target.value))}
                    />
                </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filteredPositions.length === 0 && (
                    <p className='starseed-status-text'>No bodies match these filters.</p>
                )}

                {filteredPositions.map((planet) => (
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
                        <span className='starseed-card__value'>{planet.degree}° {planet.sign}</span>
                        <span className='starseed-card__label' style={{ margin: 0 }}>{planet.retrograde ? 'Retrograde' : 'Direct'}</span>
                        <span style={{ fontSize: 10, opacity: 0.5 }}></span>

                        </Link>
                ))}
            </div>

            <div style= {{ marginTop: 16 }}>
                <RetrogradeTimeline />
            </div>

            <div style={{ marginTop: 16 }}>
                <AspectRadar />
            </div>
            
            <div>
                <SummaryStats data={data} />
            </div>

            <p className='starseed-status-text' style={{ padding: '16px 0 0' }}>
                {data.notableFact}
            </p>
        </div>
    );
}


export default DashboardView;