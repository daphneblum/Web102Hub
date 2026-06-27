import ShipCanvas from "./canvas/ship";
import FlashcardDeck from "./stations/Flashcards/FlashcardDeck"
import './App.css';

export default function App() {
  return (
    <div className="App">
      <ShipCanvas />
      <div className="overlay">
        <FlashcardDeck />
      </div>
  </div>
  );
}