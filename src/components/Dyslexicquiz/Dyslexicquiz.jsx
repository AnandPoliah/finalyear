import React from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 1, name: 'Letter and Word Recognition', path: '/letterwordrecognition' },
  { id: 2, name: 'Phonological Skills and Phonemic Awareness', path: '/quiz/phonological-skills' },
  { id: 3, name: 'Rapid Automatized Naming (RAN)', path: '/quiz/rapid-naming' },
  { id: 4, name: 'Reading Fluency and Comprehension', path: '/quiz/reading-fluency' },
  { id: 5, name: 'Spelling and Encoding', path: '/quiz/spelling-encoding' },
  { id: 6, name: 'Memory and Sequencing', path: '/quiz/memory-sequencing' },
];

const DyslexicQuizPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {sections.map(({ id, name, path }) => (
          <section
            key={id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(path);
              }
            }}
            className="cursor-pointer select-none rounded-3xl border-2 bg-white border-purple-300 hover:shadow-xl hover:border-purple-500 p-8 flex flex-col"
            aria-controls={`section-${id}-details`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-purple-700 transition-colors">{name}</h2>
              <span
                className="w-9 h-9 rounded-full border-4 border-purple-700 flex items-center justify-center font-bold text-purple-700 text-xl bg-white select-none"
                aria-hidden="true"
              >
                +
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DyslexicQuizPage;
