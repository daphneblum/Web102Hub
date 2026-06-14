import { useState } from "react";
import "./Flashcard.css";
import "../Hologram.css"

const categoryColors = {
  Easy: {
    border: 'rgba(255, 200, 87, 0.5)',
    glow: 'rgba(255, 200, 87, 0.35)',
    text: 'rgba(255, 215, 130, 0.95)',
  },
  Medium: {
    border: 'rgba(255, 107, 157, 0.5)',
    glow: 'rgba(255, 107, 157, 0.35)',
    text: 'rgba(255, 150, 190, 0.95)',
  },
  Hard: {
    border: 'rgba(157, 78, 221, 0.5)',
    glow: 'rgba(157, 78, 221, 0.35)',
    text: 'rgba(200, 150, 255, 0.95)',
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