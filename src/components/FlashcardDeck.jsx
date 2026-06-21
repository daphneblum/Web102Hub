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
    const [score, setScore] = useState({ correct: 0, incorrect: 0});
    const [cardOrder, setCardOrder] = useState([])

    function handleSelectDeck(deck) {
        const sequentialOrder = deck.cards.map((_, index) => index);
        setCurrentDeck(deck);
        setCardOrder(sequentialOrder);
        setCurrentCardIndex(0)
        setScore({ correct: 0, incorrect: 0});
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

    function handleScore(type, action) {
        setScore(prev => {
            if (action === 'increment') {
                return { ...prev, [type]: prev[type] + 1};
            } else {
                return { ...prev, [type]: Math.max(0, prev[type] - 1) };
            }
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
                <p className="card-count">
                    {currentCardIndex} / {cardOrder.length}
                </p>

                <Flashcard card={card} onScore={handleScore} />

                <div className="score-row">
                    <button className="score-button correct" onClick={() => handleScore('correct', 'increment')}>
                        Correct ({score.correct})
                    </button>
                    <button className="score-button incorrect" onClick={() => handleScore('incorrect', 'increment')}>
                        Incorrect ({score.incorrect})
                    </button>
                </div>

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