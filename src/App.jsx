import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/auth";
import Landing from "./components/Landing/Landing";
import DyslexicQuizPage from "./components/Dyslexicquiz/Dyslexicquiz";
import LetterWordRecognitionQuiz from "./components/Dyslexicquiz/Quiz/Section1/LetterWordRecognitionQuiz";
import PhonologicalSkills from "./components/Dyslexicquiz/Quiz/Section2/PhonologicalSkills";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dyslexicquiz" element={<DyslexicQuizPage />} />
        <Route path="/letterwordrecognition" element={<LetterWordRecognitionQuiz/>} />
        <Route path="/phonologicalskills" element={<PhonologicalSkills/>} />
        {/* add other quiz sections here */}
      </Routes>
    </BrowserRouter>
  );
} 

export default App;
