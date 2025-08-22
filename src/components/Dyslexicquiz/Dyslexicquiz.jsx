// DyslexicQuizPage.js - Updated with progress tracking
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 1, name: 'Letter and Word Recognition', path: '/letterwordrecognition', completed: false },
  { id: 2, name: 'Phonological Skills and Phonemic Awareness', path: '/phonologicalskills', completed: false },
  { id: 3, name: 'Rapid Automatized Naming (RAN)', path: '/rapid-naming', completed: false },
  { id: 4, name: 'Reading Fluency and Comprehension', path: '/reading-fluency', completed: false },
  { id: 5, name: 'Spelling and Encoding', path: '/spelling-encoding', completed: false },
  { id: 6, name: 'Memory and Sequencing', path: '/memory-sequencing', completed: false },
];

const DyslexicQuizPage = () => {
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState(new Set());

  // Calculate progress percentage
  const progressPercentage = (completedSections.size / sections.length) * 100;

  const getSectionStatus = (sectionId) => {
    return completedSections.has(sectionId) ? 'completed' : 'pending';
  };

  return (
    <div className="min-h-screen w-screen p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header with progress */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Dyslexia Assessment</h1>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-600">Progress: {completedSections.size} of {sections.length} sections completed</p>
        </div>

        {sections.map(({ id, name, path }) => {
          const status = getSectionStatus(id);
          return (
            <section
              key={id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(path, { state: { sectionId: id } })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(path, { state: { sectionId: id } });
                }
              }}
              className={`cursor-pointer select-none rounded-3xl border-2 bg-white p-8 flex flex-col transition-all duration-300 ${
                status === 'completed' 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-purple-300 hover:shadow-xl hover:border-purple-500'
              }`}
              aria-controls={`section-${id}-details`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-extrabold text-purple-700 transition-colors">{name}</h2>
                  {status === 'completed' && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">✓ Completed</span>
                  )}
                </div>
                <span
                  className={`w-9 h-9 rounded-full border-4 flex items-center justify-center font-bold text-xl select-none ${
                    status === 'completed' 
                      ? 'border-green-500 text-green-500 bg-white' 
                      : 'border-purple-700 text-purple-700 bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {status === 'completed' ? '✓' : '+'}
                </span>
              </div>
            </section>
          );
        })}

        {/* Results button - only show when all sections are completed */}
        {completedSections.size === sections.length && (
          <div className="text-center pt-8">
            <button 
              onClick={() => navigate('/dyslexia-results')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              View Assessment Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DyslexicQuizPage;
