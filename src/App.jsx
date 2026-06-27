import ShipCanvas from "./canvas/ship";
import FlashcardDeck from "./stations/Flashcards/FlashcardDeck";
import ExoplanetStation from "./stations/exoplanets/ExoplanetStation";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <ShipCanvas />
      <div className="overlay">
        {/* <FlashcardDeck /> */}
        <ExoplanetStation />
      </div>
  </div>
  );
}