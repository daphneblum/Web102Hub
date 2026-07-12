import ShipCanvas from "./canvas/ship";
import FlashcardDeck from "./stations/Flashcards/FlashcardDeck";
import ExoplanetStation from "./stations/exoplanets/ExoplanetStation";
import EarthStatusDashboard from "./stations/database/EarthStatusDashboard";
import StarseedWeatherStation from "./stations/starseed-weather/StarseedWeatherStation";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <ShipCanvas />
      <div className="overlay">
        {/* <FlashcardDeck /> */}
        {/* <ExoplanetStation /> */}
        {/* <EarthStatusDashboard /> */}
        <StarseedWeatherStation />
      </div>
  </div>
  );
}