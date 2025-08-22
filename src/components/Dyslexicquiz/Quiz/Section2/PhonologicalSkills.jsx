// components/DyslexicAssessment/Quiz/Section2/PhonologicalSkills.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PhonologicalSkills.css';

const PhonologicalSkills = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      id: 1,
      type: 'sound_blending',
      instruction: 'Listen to these separate sounds and choose the word they make:',
      sounds: ['/c/', '/a/', '/t/'],
      question: 'What word do these sounds make when put together?',
      options: ['cat', 'bat', 'hat', 'rat'],
      correctAnswer: 'cat'
    },
    {
      id: 2,
      type: 'rhyming',
      instruction: 'Find the word that rhymes.',
      question: 'Which word rhymes with "night"?',
      options: ['light', 'day', 'moon', 'dark'],
      correctAnswer: 'light'
    },
    {
      id: 3,
      type: 'sound_segmentation',
      instruction: 'Count the individual sounds in this word.',
      question: 'How many separate sounds do you hear in "ship"?',
      hint: 'Think: /sh/ - /i/ - /p/',
      options: ['2 sounds', '3 sounds', '4 sounds', '5 sounds'],
      correctAnswer: '3 sounds'
    },
    {
      id: 4,
      type: 'first_sound',
      instruction: 'Identify the first sound.',
      question: 'What is the FIRST sound you hear in "dog"?',
      options: ['/d/', '/o/', '/g/', '/og/'],
      correctAnswer: '/d/'
    },
    {
      id: 5,
      type: 'sound_matching',
      instruction: 'Find words that start with the same sound.',
      question: 'Which word starts with the same sound as "ball"?',
      options: ['car', 'bat', 'sun', 'tree'],
      correctAnswer: 'bat'
    },
    {
      id: 6,
      type: 'rhyme_production',
      instruction: 'Think of rhyming words.',
      question: 'Which of these words rhymes with "make"?',
      options: ['take', 'milk', 'run', 'happy'],
      correctAnswer: 'take'
    },
    {
      id: 7,
      type: 'sound_deletion',
      instruction: 'Remove a sound from a word.',
      question: 'If you remove the first sound from "cat", what word do you get?',
      options: ['at', 'ca', 'hat', 'bat'],
      correctAnswer: 'at'
    },
    {
      id: 8,
      type: 'syllable_counting',
      instruction: 'Count the syllables (beats) in the word.',
      question: 'How many syllables are in "elephant"?',
      hint: 'Clap it out: el-e-phant',
      options: ['2 syllables', '3 syllables', '4 syllables', '5 syllables'],
      correctAnswer: '3 syllables'
    }
  ];

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    // Store answer (without saving to storage for now)
    setAnswers(prev => [...prev, {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      correctAnswer: questions[currentQuestion].correctAnswer,
      isCorrect,
      questionType: questions[currentQuestion].type
    }]);

    setShowFeedback(true);
    
    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Quiz completed
        handleQuizComplete();
      }
    }, 2000);
  };

  const handleQuizComplete = () => {
    const correctCount = answers.filter(a => a.isCorrect).length + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    alert(`Section 2 Complete! You got ${correctCount} out of ${totalQuestions} questions correct (${percentage}%)`);
    navigate('/dyslexicquiz'); // Navigate back to main dyslexic hub
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="phonological-skills-wrapper">
      <div className="phonological-skills-container">
        {/* Header */}
        <div className="quiz-header">
          <button 
            onClick={() => navigate('/dyslexicquiz')} 
            className="back-button"
          >
            ← Back to Sections
          </button>
          <h1>Phonological Skills & Phonemic Awareness</h1>
          <div className="progress-indicator">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Section */}
        <div className="question-section">
          <div className="question-type-badge">
            {currentQ.type.replace('_', ' ').toUpperCase()}
          </div>
          
          <div className="instruction">
            {currentQ.instruction}
          </div>

          {/* Sound Blending Special Display */}
          {currentQ.type === 'sound_blending' && currentQ.sounds && (
            <div className="sounds-display">
              <div className="sounds-container">
                {currentQ.sounds.map((sound, index) => (
                  <span key={index} className="sound-bubble">
                    {sound}
                  </span>
                ))}
              </div>
              <div className="blend-arrow">↓</div>
              <div className="blend-text">What word do these make?</div>
            </div>
          )}

          <div className="main-question">
            {currentQ.question}
          </div>

          {/* Hint if available */}
          {currentQ.hint && (
            <div className="hint">
              💡 Hint: {currentQ.hint}
            </div>
          )}

          {/* Answer Options */}
          <div className="options-container">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer === option ? 'selected' : ''
                } ${
                  showFeedback 
                    ? option === currentQ.correctAnswer 
                      ? 'correct' 
                      : option === selectedAnswer ? 'incorrect' : ''
                    : ''
                }`}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`feedback ${
              selectedAnswer === currentQ.correctAnswer ? 'correct-feedback' : 'incorrect-feedback'
            }`}>
              {selectedAnswer === currentQ.correctAnswer ? (
                <div>
                  <span className="feedback-icon">✅</span>
                  <span>Correct! Well done!</span>
                </div>
              ) : (
                <div>
                  <span className="feedback-icon">❌</span>
                  <span>The correct answer is: {currentQ.correctAnswer}</span>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="submit-button"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Section' : 'Next Question'}
            </button>
          )}
        </div>

        {/* Question Counter */}
        <div className="question-counter">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`counter-dot ${
                index < currentQuestion ? 'completed' : 
                index === currentQuestion ? 'current' : 'upcoming'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhonologicalSkills;
