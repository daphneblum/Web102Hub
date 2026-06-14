import Flashcard from "./Flashcard";
import defaultCards from "./DefaultCards";
import "./FlashcardDeck.css";
import { useState } from "react";

const initialDecks = [
    {
        id: 1,
        title: "Space Exploration",
        description: "Test your knowledge of the cosmos.",
        cards: defaultCards,
    },
];

function FlashcardDeck() {
    const [currentScreen, setCurrentScreen] = useState('main-menu');
    const [allDecks, setAllDecks] = useState(initialDecks);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0});
    const [cardsSeen, setCardsSeen] = useState(1)
    const [seenIndices, setSeenIndices] = useState([]);

    function handleSelectDeck(deck) {
        const startIndex = Math.floor(Math.random() * deck.cards.length);
        setCurrentDeck(deck);
        setCurrentCardIndex(startIndex);
        setSeenIndices([startIndex]);
        setScore({ correct: 0, incorrect: 0});
        setCardsSeen(1);
        setCurrentScreen('study');
    }

    function handleNextCard() {
        const totalCards = currentDeck.cards.length;

        let updatedSeen = seenIndices.length >= totalCards ? [] : seenIndices;

        const remainingIndices = currentDeck.cards
            .map((_, index) => index)
            .filter(index => !updatedSeen.includes(index));

        const randomIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];

        setCurrentCardIndex(randomIndex);
        setSeenIndices([...updatedSeen, randomIndex]);
        setCardsSeen(prev => prev === totalCards ? 1 : prev + 1);
    }

    function handleScore(type) {
        setScore(prev => ({ ...prev,[type]: prev[type] + 1 }))
    }

    if (currentScreen === 'main-menu') {
        return(
            <div className="main-menu">
                <h1>Intergalactic Interpreter Training</h1>
                <div className="options">
                    <button className="menu-button" onClick={() => setCurrentScreen('view-decks')}>
                        View
                    </button>
                    <button className="menu-button" onClick={() => alert('Coming soon!')}>
                        Add
                    </button>
                    <button className="menu-button" onClick={() => alert('Coming soon!')}>
                        Edit
                    </button>
                    <button className="menu-button" onClick={() => alert('Coming soon!')}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    if (currentScreen === 'view-decks') {
        return (
            <div className="view-decks">
                <h2>Select a Deck</h2>
                <div className="deck-list">
                    {allDecks.map(deck => (
                        <button
                            key={deck.id}
                            className="deck-button"
                            onClick={() => handleSelectDeck(deck)}
                        >
                            <h3>{deck.title}</h3>
                            <p>{deck.description}</p>
                            <span>{deck.cards.length} cards</span>
                        </button>
                    ))}
                </div>
                <button className="back-button" onClick={() => setCurrentScreen('main-menu')}>
                    Back
                </button>
            </div>
        );
    }

    if (currentScreen === 'study') {
        const card = currentDeck.cards[currentCardIndex];
        return (
            <div className="study-screen">
                <h2>{currentDeck.title}</h2>
                <p className="card-count">
                    {cardsSeen} / {currentDeck.cards.length}
                </p>

                <Flashcard card={card} />

                <div className="score-row">
                    <button className="score-button correct" onClick={() => handleScore('correct')}>
                        Correct ({score.correct})
                    </button>
                    <button className="score-button incorrect" onClick={() => handleScore('incorrect')}>
                        Incorrect ({score.incorrect})
                    </button>
                </div>

                <button className="next-button" onClick={handleNextCard}>
                    Next
                </button>

                <button className="back-button" onClick={() => setCurrentScreen('view-decks')}>
                    Back to Decks
                </button>
            </div>
        );
    }

    return null;
}



export default FlashcardDeck;