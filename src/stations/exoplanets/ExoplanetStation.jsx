import { useState, useEffect } from "react";
import { buildApiUrl, getPlanetVisuals } from "./exoplanetUtils";
import PlanetDisplay from "./PlanetDisplay";
import AttributeCard from "./AttributeCard";
import BanList from "./BanList";
import "./ExoplanetStation.css";
import "../../Hologram.css";

function ExoplanetStation() {
    const [planetPool, setPlanetPool] = useState([]);
    const [currentPlanet, setCurrentPlanet] = useState(null);
    const [banList, setBanList] = useState({
        discoverymethod: [],
        hostname: [],
        disc_year: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchPlanetPool({ discoverymethod: [], hostname: [], disc_year: [] });
    }, []);

    async function fetchPlanetPool(currentBanList) {
        setIsLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(currentBanList);
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch planet data");
            const data = await response.json();
            setPlanetPool(data);
        } catch (err) {
            setError("Failed to contact the Federation database. Please try again.")
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    function getRandomPlanet() {
        if (planetPool.length == 0) return;
        const validPlanets = planetPool.filter(p => p.pl_eqt && p.pl_rade);
        if (validPlanets.length === 0) return;

        const randomIndex = Math.floor(Math.random() * validPlanets.length);
        //debug
        // const planet = planetPool[randomIndex];
        // console.log(planet); 
        //debug ^
        const planet = validPlanets[randomIndex];
        setCurrentPlanet(planet);

        setHistory(prev => {
            const alreadyInHistory = prev.some(p => p.pl_name === planet.pl_name);
            if (alreadyInHistory) return prev;
            return [planet, ...prev];
        });
    }

    function handleBan(field, value) {
        if (banList[field]?.includes(value)) return;
        const newBanList = {...banList, [field]: [...(banList[field] || []), value],};
        setBanList(newBanList);
        fetchPlanetPool(newBanList);
    }

    function handleUnban(field, value) {
        const newBanList = {...banList, [field]: banList[field].filter(v => v !== value)};
        setBanList(newBanList);
        fetchPlanetPool(newBanList);
    }

    const visuals = currentPlanet ? getPlanetVisuals(currentPlanet.pl_eqt, currentPlanet.pl_rade) : null;

    return (
        <div className="exoplanet-station hologram">
            <h1 className="station-title hologram-text">Stellar Cartography</h1>
            <p className="station-subtitle hologram-hint">
                Explore confirmed exoplanets from the Federation's stellar database
            </p>

            {error && <p className="error-message">{error}</p>}

            <div className="station-layout">
                <div className="planet-section">
                    {currentPlanet && visuals ? (
                        <PlanetDisplay
                            color={visuals.color}
                            emissive={visuals.emissive}
                            scale={visuals.scale}
                            planetType={visuals.planetType}
                            atmosphereGlow={visuals.atmosphereGlow}
                            planetName={currentPlanet.pl_name}
                        />
                    ) : (
                        <div className="planet-placeholder hologram-hint">
                            Awaiting stellar coordinates...
                        </div>
                    )}

                    {currentPlanet && (
                        <div className="planet-attributes">
                            <AttributeCard
                                label="Planet"
                                value={currentPlanet.pl_name}
                                bannable={false}
                            />
                            <AttributeCard
                                label="Host Star"
                                value={currentPlanet.hostname}
                                isBanned={banList.hostname.includes(currentPlanet.hostname)}
                                onBan={() => handleBan('hostname', currentPlanet.hostname)}
                                bannable={true}
                            />
                            <AttributeCard
                                label="Discovery Method"
                                value={currentPlanet.discoverymethod}
                                isBanned={banList.discoverymethod.includes(currentPlanet.discoverymethod)}
                                onBan={() => handleBan('discoverymethod', currentPlanet.discoverymethod)}
                                bannable={true}
                            /><AttributeCard
                                label="Year Discovered"
                                value={currentPlanet.disc_year}
                                isBanned={banList.disc_year.includes(currentPlanet.disc_year)}
                                onBan={() => handleBan('disc_year', currentPlanet.disc_year)}
                                bannable={true}
                            />
                            <AttributeCard
                                label="Orbital Period"
                                value={currentPlanet.pl_orbper
                                    ? `${currentPlanet.pl_orbper.toFixed(1)} days`
                                    : "Unknown"}
                                bannable={false}
                            />
                            <AttributeCard
                                label="Temperature"
                                value={currentPlanet.pl_eqt
                                    ? `${currentPlanet.pl_eqt.toFixed(0)} K`
                                    : "Unknown"
                                }
                                bannable={false}
                            />
                            <AttributeCard
                                label="Distance"
                                value={currentPlanet.sy_dist
                                    ? `${currentPlanet.sy_dist.toFixed(1)} pc`
                                    : "Unknown"
                                }
                                bannable={false}
                            />
                        </div>
                    )}

                    <button 
                        className="engage-button hologram-label" 
                        onClick={getRandomPlanet} 
                        disabled={isLoading || planetPool.length === 0}
                    >
                        {isLoading ? "Contacting Federation..." : "Engage"}
                    </button>
                </div>

                <div className="right-panel">
                    <BanList banList={banList} onUnban={handleUnban}/>

                    {history.length > 0 && (
                        <div className="history-panel hologram">
                            <h3 className="hologram-label">Mission Log</h3>
                            <ul className="history-list">
                                {history.map((planet, index) => (
                                    <li key={planet.pl_name} className={`history-entry hologram-hint ${index === 0 ? 'history-entry-current' : ''}`}>
                                        {planet.pl_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                    

            </div>
        </div>
    );
}

export default ExoplanetStation;