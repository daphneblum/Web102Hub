import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePositions } from '../hooks/usePositions.js';
import RetrogradeTimeline from './RetrogradeTimeline.jsx';
import AspectRadar from './AspectRadar.jsx';
import SummaryStats from './SummaryStats.jsx';

const ZODIAC_ELEMENT = {
  Aries: 'fire',
  Leo: 'fire',
  Sagittarius: 'fire',
  Taurus: 'earth',
  Virgo: 'earth',
  Capricorn: 'earth',
  Gemini: 'air',
  Libra: 'air',
  Aquarius: 'air',
  Cancer: 'water',
  Scorpio: 'water',
  Pisces: 'water',
};

const BODY_GLYPHS = {
  Sun: '☉',
  Moon: '☾',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
  Chiron: '⚷',
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

    return data.positions.filter((position) => {
      const matchesSearch =
        !query ||
        position.body.toLowerCase().includes(query) ||
        position.sign.toLowerCase().includes(query);

      const matchesElement =
        element === 'all' ||
        ZODIAC_ELEMENT[position.sign] === element;

      const matchesRetrograde =
        !retrogradeOnly || position.retrograde;

      const matchesDegree =
        position.degree >= minDegree;

      return (
        matchesSearch &&
        matchesElement &&
        matchesRetrograde &&
        matchesDegree
      );
    });
  }, [data, search, element, retrogradeOnly, minDegree]);

  if (loading) {
    return (
      <p className="starseed-status-text">
        Calibrating instruments...
      </p>
    );
  }

  if (error) {
    return (
      <p className="starseed-status-text starseed-status-text--error">
        Signal lost: {error.message}
      </p>
    );
  }

  return (
    <div>
      <h2
        className="starseed-card__label"
        style={{ fontSize: 12, marginBottom: 16 }}
      >
        Today&apos;s Position - {data.date}
      </h2>

      <section className="starseed-section-box">
        <div className="starseed-filter-row">
          <input
            type="text"
            className="starseed-input"
            placeholder="Search by name or sign..."
            aria-label="Search planets by name or zodiac sign"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="starseed-input"
            aria-label="Filter by zodiac element"
            value={element}
            onChange={(event) => setElement(event.target.value)}
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
              onChange={(event) =>
                setRetrogradeOnly(event.target.checked)
              }
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
              onChange={(event) =>
                setMinDegree(Number(event.target.value))
              }
            />
          </label>
        </div>
      </section>

      <section className="starseed-section-box">
        <div className="starseed-planet-list">
          {filteredPositions.length === 0 && (
            <p className="starseed-status-text">
              No bodies match these filters.
            </p>
          )}

          {filteredPositions.map((planet) => (
            <Link
              key={planet.body}
              to={`/planet/${planet.body.toLowerCase()}`}
              className="starseed-card starseed-planet-row"
            >
              <span
                className="starseed-planet-row__glyph"
                aria-hidden="true"
              >
                {BODY_GLYPHS[planet.body] ?? '◌'}
              </span>

              <span className="starseed-card__value starseed-planet-row__body">
                {planet.body}
              </span>

              <span className="starseed-card__value starseed-planet-row__position">
                {planet.degree}° {planet.sign}
              </span>

              <span
                className={[
                  'starseed-card__label',
                  'starseed-planet-row__status',
                  planet.retrograde
                    ? 'starseed-planet-row__status--retrograde'
                    : 'starseed-planet-row__status--direct',
                ].join(' ')}
              >
                {planet.retrograde ? 'Retrograde' : 'Direct'}
              </span>

              <span
                className="starseed-planet-row__arrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="starseed-section-box">
        <RetrogradeTimeline />
      </section>

      <section className="starseed-section-box">
        <AspectRadar />
      </section>

      <section className="starseed-section-box">
        <SummaryStats data={data} />
      </section>

      <section className="starseed-section-box">
        <p className="starseed-status-text starseed-notable-fact">
          {data.notableFact}
        </p>
      </section>
    </div>
  );
}

export default DashboardView;