import { useState } from "react";
import "./Flashcard.css";
import "../../Hologram.css"

const categoryColors = {
    Easy: {
        border: 'rgba(0, 255, 150, 0.4)',
    glow: 'rgba(0, 255, 150, 0.3)',
    text: 'rgba(0, 255, 150, 0.9)',
    },
    Medium: {
        border: 'rgba(0, 200, 255, 0.4)',
        glow: 'rgba(0, 200, 255, 0.3)',
        text: 'rgba(0, 200, 255, 0.9)',
    },
    Hard: {
        border: 'rgba(255, 80, 80, 0.4)',
        glow: 'rgba(255, 80, 80, 0.3)',
        text: 'rgba(255, 80, 80, 0.9)',
    },
};

function Flashcard({ card }) {
    const [flipped, setFlipped] = useState(false);
    const colors = categoryColors[card.category] || categoryColors.Medium; 

    return (
        <div
            className="flashcard-container"
            onClick={() => setFlipped(!flipped)}
            style={{
                '--border-color': colors.border,
                '--glow-color': colors.glow,
                '--text-color': colors.text,
            }}
            >
                <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
                    
                    {/* front of card */}
                    <div className="flashcard-front hologram">
                        <span className="category-label hologram-label">{card.category}</span>
                        {card.image && (
                            <img src={card.image} alt="card visual" className="card-image" />
                        )}
                        <p className="card-text hologram-text">{card.question}</p>
                        <span className="flip-hint hologram-hint">Click to reveal answer</span>
                    </div>

                    {/* back of card */}
                    <div className="flashcard-back hologram">
                        <span className="category-label hologram-label">{card.category}</span>
                        <p className="card-text hologram-text">{card.answer}</p>
                        <span className="flip-hint hologram-hint">Back</span>
                    </div>

                </div>
            </div>
    );
}

export default Flashcard;