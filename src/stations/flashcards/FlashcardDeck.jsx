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

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function FlashcardDeck() {
    const [currentScreen, setCurrentScreen] = useState('main-menu');
    const [allDecks, setAllDecks] = useState(initialDecks);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [score, setScore] = useState({ 
        correct: 0, 
        incorrect: 0,
        currentStreak: 0,
        longestStreak: 0,
        });
    const [cardOrder, setCardOrder] = useState([])

    function handleSelectDeck(deck) {
        const sequentialOrder = deck.cards.map((_, index) => index);
        setCurrentDeck(deck);
        setCardOrder(sequentialOrder);
        setCurrentCardIndex(0)
        setScore({ correct: 0, incorrect: 0, currentStreak: 0, longestStreak: 0});
        setCurrentScreen('study');
    }

    function handleNext() {
        if (currentCardIndex < cardOrder.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        }
    }

    function handlePrevious() {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
        }
    }

    function handleShuffle() {
        setCardOrder(shuffleArray(cardOrder));
        setCurrentCardIndex(0);
    }

    function handleScore(type, action, affectsStreak = false, restoreStreak = null) {
        setScore(prev => {
            const updated = {...prev};

            if (action === 'increment') {
                updated[type] = prev[type] + 1;
            } else {
                updated[type] = Math.max(0, prev[type] - 1);
            }

            if (affectsStreak) {
                const baseStreak = restoreStreak !== null ? restoreStreak : prev.currentStreak;
                if (type === 'correct') {
                    updated.currentStreak = baseStreak + 1;
                    updated.longestStreak = Math.max(prev.longestStreak, updated.currentStreak);
                } else {
                    updated.currentStreak = 0;
                }
            }
            return updated;
        });
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
        const realIndex = cardOrder[currentCardIndex];
        const card = currentDeck.cards[realIndex];
        const isFirst = currentCardIndex === 0;
        const isLast = currentCardIndex === cardOrder.length - 1;

        return (
            <div className="study-screen">
                <h2>{currentDeck.title}</h2>
                <div className="streak-panel">
                    <div className="streak-stat">
                        <span className="streak-label">Current Streak</span>
                        <span className="streak-value">{score.currentStreak}</span>
                    </div>
                    <div className="streak-stat">
                        <span className="streak-label">Longest Streak</span>
                        <span className="streak-value">{score.longestStreak}</span>
                    </div>
                </div>
                <p className="card-count">
                    {currentCardIndex + 1} / {cardOrder.length}
                </p>

                <Flashcard card={card} onScore={handleScore} currentStreak={score.currentStreak} />

                <div className="nav-row">
                    <button className="nav-button" onClick={handlePrevious} disabled={isFirst}>
                            Previous
                    </button>
                    <button className="shuffle-button" onClick={handleShuffle}>
                        Shuffle
                    </button>
                    <button className="nav-button" onClick={handleNext} disabled={isLast}>
                        Next
                    </button>

                </div>

                <button className="back-button" onClick={() => setCurrentScreen('view-decks')}>
                    Back to Decks
                </button>
            </div>
        );
    }

    return null;
}



export default FlashcardDeck;