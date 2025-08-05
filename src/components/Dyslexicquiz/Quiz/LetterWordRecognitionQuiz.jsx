import React, { useState } from "react";
import "./LetterWordRecognitionQuiz.css";

const letterGrid = [
  "b", "d", "q", "p", "b", "p", "d",
  "q", "b", "d", "p", "b", "d", "q",
];

const wordList = [
  "cat",  "dok",  "ship", "fop",
  "tree", "miz",  "book",
];

const correctLetterIndexes = letterGrid
  .map((ltr, i) => (ltr === "b" ? i : null))
  .filter((v) => v !== null);

const correctWords = ["cat", "ship", "tree", "book"];

const LetterWordRecognitionQuiz = ({ onComplete }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [letterError, setLetterError] = useState(null);

  const [identifiedWords, setIdentifiedWords] = useState([]);
  const [wordError, setWordError] = useState(null);

  const [readAloudChecked, setReadAloudChecked] = useState(false);

  const handleSelectLetter = (idx) => {
    setLetterError(null);
    setSelectedLetters((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectWord = (word) => {
    setWordError(null);
    setIdentifiedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCorrectLetters = selectedLetters.filter(
      (i) => letterGrid[i] === "b"
    );
    if (
      selectedCorrectLetters.length !== correctLetterIndexes.length ||
      selectedLetters.length !== correctLetterIndexes.length
    ) {
      setLetterError(
        "Please select all and only the letter 'b' cells in the grid."
      );
      return;
    }

    const correctSet = new Set(correctWords);
    const selectedSet = new Set(identifiedWords);
    const allCorrectWordsSelected = correctWords.every((w) =>
      selectedSet.has(w)
    );
    const noIncorrectWordsSelected = identifiedWords.every((w) =>
      correctSet.has(w)
    );
    if (!allCorrectWordsSelected || !noIncorrectWordsSelected) {
      setWordError("Please select all and only the real English words.");
      return;
    }

    if (!readAloudChecked) {
      alert("Please read the last word aloud and confirm by checking the box.");
      return;
    }

    if (onComplete) onComplete();
    else alert("Well done! You have completed the Letter and Word Recognition section.");
  };

  return (
    <div className="quiz-outer">
        <form
        className="quiz-container"
        onSubmit={handleSubmit}
        autoComplete="off"
        >
        <h2 className="quiz-title">
            Letter and Word Recognition Quiz
        </h2>

        {/* Letter Discrimination Task */}
        <div>
            <label className="quiz-label">
            1. Find and select <b>all</b> the letter <span className="quiz-highlight">b</span> in this grid:
            </label>
            <div className="letter-grid">
            {letterGrid.map((ltr, idx) => (
                <button
                key={idx}
                type="button"
                aria-pressed={selectedLetters.includes(idx)}
                className={`letter-cell
                    ${selectedLetters.includes(idx)
                    ? ltr === "b"
                        ? "cell-correct"
                        : "cell-wrong"
                    : ""}
                `}
                onClick={() => handleSelectLetter(idx)}
                >
                {ltr}
                </button>
            ))}
            </div>
            {letterError && <p className="quiz-error">{letterError}</p>}
        </div>

        {/* Word Recognition Task */}
        <div>
            <label className="quiz-label">
            2. Select <b>all</b> the real English words from the list below:
            </label>
            <div className="word-list">
            {wordList.map((word) => (
                <button
                key={word}
                type="button"
                aria-pressed={identifiedWords.includes(word)}
                className={`word-btn
                    ${identifiedWords.includes(word)
                    ? correctWords.includes(word)
                        ? "word-correct"
                        : "word-wrong"
                    : ""}
                `}
                onClick={() => handleSelectWord(word)}
                >
                {word}
                </button>
            ))}
            </div>
            {wordError && <p className="quiz-error">{wordError}</p>}
        </div>

        {/* Rapid Word Reading Confirmation */}
        <div>
            <label className="quiz-label">
            3. Please read this word aloud as quickly and clearly as you can:
            <span className="read-aloud">cloud</span>
            </label>
            <label className="read-aloud-confirm">
            <input
                type="checkbox"
                checked={readAloudChecked}
                onChange={() => setReadAloudChecked((prev) => !prev)}
                required
            />
            I have read the word aloud.
            </label>
        </div>

        {/* Submit Button */}
        <div>
            <button
            type="submit"
            className="quiz-submit-btn"
            >
            Finish Section
            </button>
        </div>
        </form>
    </div>
  );
};

export default LetterWordRecognitionQuiz;
