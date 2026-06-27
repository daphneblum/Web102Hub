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
    const [banList, setBanList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlanetPool([])
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

        const randomIndex = Math.floor(Math.random() * planetPool.length);
        //debug
        const planet = planetPool[randomIndex];
        console.log(planet); 
        //debug ^
        setCurrentPlanet(planetPool[randomIndex]);
    }

    function handleBan(value) {
        if (banList.includes(value)) return;
        const newBanList = [...banList,value];
        setBanList(newBanList);
        fetchPlanetPool(newBanList);
    }

    function handleUnban(value) {
        const newBanList = banList.filter(item => item !== value);
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
                                bannable={false}
                            />
                            <AttributeCard
                                label="Discovery Method"
                                value={currentPlanet.discoverymethod}
                                isBanned={banList.includes(currentPlanet.discoverymethod)}
                                onBan={() => handleBan(currentPlanet.discoverymethod)}
                                bannable={true}
                            /><AttributeCard
                                label="Year Discovered"
                                value={currentPlanet.disc_year}
                                bannable={false}
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

                <BanList banList={banList} onUnban={handleUnban}/>

            </div>
        </div>
    );
}

export default ExoplanetStation;