import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthGlobe from './EarthGlobe';
import ConflictList from './ConflictList';
import SummaryBar from './SummaryBar';
import useGdeltData from "./useGdeltData";
import "./EarthStatusDashboard.css";


function useDebouncedValue(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

function EarthStatusDashboard() {
    //Query 
    const [topic , setTopic] = useState("armed conflict");
    const debouncedTopic = useDebouncedValue(topic);

    const { articles, points, loading, error } = useGdeltData(debouncedTopic);

    return (
        <div className='earth-status'>
            <header className='earth-status__header'>
                <h1>Earth Status Dashboard</h1>
                <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Global topic (e.g. armed conflict, ceasefire, protest)"
                />
                {loading && <span className='earth-status__status'>Syncing...</span>}
                {error && <span className='earth-status__status'>Error: {error}</span>}
            </header>

            <div className='earth-status__body'>
                <div className='earth-status__globe'>
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={0.6} />
                        <EarthGlobe points={points} />
                    </Canvas>
                </div>

                <div className='earth-status__panel'>
                    <ConflictList articles={articles} />
                </div>
            </div>

            <SummaryBar articles={articles} />
        </div>
    );
}

export default EarthStatusDashboard;