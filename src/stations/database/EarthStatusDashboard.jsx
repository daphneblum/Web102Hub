import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthGlobe from './EarthGlobe';
import ConflictList from './ConflictList';
import SummaryBar from './SummaryBar';
import "./EarthStatusDashboard.css";
import mockEvents from "./mockEvents"
import useConflictEvents from './useConflictEvents';

//this is to avoid using up free queries while iterating
//false for live data
const USE_MOCK_DATA = true;
const CATEGORY_OPTIONS = ["Protests", "Battles", "Explosions/Remote violence"];

function todayISO(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0,10);
}

function EarthStatusDashboard() {
    const [category, setCategory] = useState("Protests");
    const filters = {
        limit: 25,
        date_start: todayISO(-1),
        date_end: todayISO(0),
        sort: "recent",
        category,
    };

    const live = useConflictEvents(filters, !USE_MOCK_DATA);
    const { events, loading, error } = USE_MOCK_DATA ? { events: mockEvents, loading: false, error: null } : live;

    return (
        <div className='earth-status hologram'>
            <header className='earth-status__header'>
                <h1>Earth Status Dashboard</h1>
                <select 
                className='earth-status__topic'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                {USE_MOCK_DATA && <span className='earth-status__status'>Mock data</span>}
                {!USE_MOCK_DATA && loading && <span className='earth-status__status'>Syncing...</span>}
                {!USE_MOCK_DATA && error && (<span className='earth-status__status earth-status__status--error'>{error}</span>
                    
                )}
            </header>

            <div className='earth-status__body'>
                <div className='earth-status__globe'>
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={0.6} />
                        <EarthGlobe events={events} />
                    </Canvas>
                </div>

                <div className='earth-status__panel'>
                    <ConflictList events={events} />
                </div>
            </div>

            <div className='earth-status__summary'>
                <SummaryBar events={events} />
            </div>
        </div>
    );
}

export default EarthStatusDashboard;