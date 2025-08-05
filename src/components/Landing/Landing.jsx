import React from 'react'
import { useNavigate } from 'react-router-dom';


const Landing = () => 
{
    const navigate = useNavigate();
    const routeMap = {
    "I struggle with reading": "/dyslexicquiz",
    "I get distracted easily": "/adhd-quiz",
    "My handwriting is messy": "/dysgraphia-quiz",
    "I'm just exploring": "/explore",
  };
  
    return (
    <div className="w-screen h-screen flex bg-gradient-to-r from-[#F4EEFF] via-white to-[#E9D5FF] font-sans">
      
      {/* Left Side – Welcome + Assistant */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-lg z-10">
        <h1 className="text-4xl font-bold text-[#6A0DAD] mb-4">👋 Hi, I'm Neuro</h1>
        <p className="text-lg text-gray-700 text-center max-w-md">
          I'm here to help you identify signs of <strong>dyslexia</strong>, <strong>dysgraphia</strong>, or <strong>ADHD</strong>. Let's walk through it together!
        </p>
        <div className="mt-10">
          <button className="bg-[#6A0DAD] text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            Start Diagnosis
          </button>
        </div>
      </div>

      {/* Right Side – Interactive Options */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#F4EEFF] relative overflow-hidden px-10">
        <h2 className="text-2xl font-semibold text-[#6A0DAD] mb-6">Choose what you're struggling with</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {[
            "I struggle with reading",
            "I get distracted easily",
            "My handwriting is messy",
            "I'm just exploring"
          ].map((text, index) => (
            <button
              key={index}
              onClick={() => navigate(routeMap[text])}
              className="bg-white text-[#6A0DAD] text-center w-56 h-28 flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-115 hover:shadow-lg"
            >
              {text}
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 text-sm text-gray-400">Your responses guide your journey 🎯</div>
      </div>
    </div>
  )
}

export default Landing