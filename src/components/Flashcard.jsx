import { useEffect, useState } from "react";
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
    const [answer, setAnswer] = useState('');
    const [submitted,setSubmitted] = useState('');
    const handleChange = (e) => {setAnswer(e.target.value)};
    const colors = categoryColors[card.category] || categoryColors.Medium; 
    const isCorrect = answer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    const handleCheck = (e) => {
      e.stopPropagation();
      setSubmitted(true);
    }

    useEffect(() => {
      setAnswer('');
      setSubmitted(false);
      setFlipped(false);
    }, [card]);

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
                        <input 
                          type="text"
                          id="answer"
                          value={answer}
                          onChange={handleChange}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Type answer here" 
                        />

                        <button onClick={handleCheck}>Check Answer</button>

                        {submitted && (
                          <p className={isCorrect ? "feedback-correct" : "feedback-incorrect"}>
                            {isCorrect ? "Correct!" : "Not quite - flip to see the answer"}
                          </p>
                        )}
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