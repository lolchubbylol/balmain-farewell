import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Stethoscope, Activity } from 'lucide-react';

const CreativeHero: React.FC = () => {
  const [ekgProgress, setEkgProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  useEffect(() => {
    // Animate EKG line
    const ekgInterval = setInterval(() => {
      setEkgProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);

    // Show content after delay
    setTimeout(() => setShowContent(true), 500);

    // Generate floating hearts
    const heartInterval = setInterval(() => {
      setFloatingHearts(prev => [...prev, Date.now()]);
    }, 3000);

    return () => {
      clearInterval(ekgInterval);
      clearInterval(heartInterval);
    };
  }, []);

  // Remove old hearts
  useEffect(() => {
    const cleanup = setInterval(() => {
      setFloatingHearts(prev => prev.filter(time => Date.now() - time < 5000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('staff-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 overflow-hidden">
      {/* Australian Sky Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-green-400 rounded-full blur-3xl" />
      </div>

      {/* Floating Hearts */}
      {floatingHearts.map((time, index) => (
        <div
          key={time}
          className="absolute animate-float-up"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${index * 0.2}s`,
            opacity: 0,
          }}
        >
          <Heart className="w-6 h-6 text-red-400 fill-red-400" />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Stethoscope Icon Animation */}
        <div className={`transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative mb-8">
            <Stethoscope className="w-24 h-24 text-blue-600 animate-pulse" />
            <Heart className="absolute -bottom-2 -right-2 w-8 h-8 text-red-500 fill-red-500 animate-bounce" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className={`text-5xl md:text-7xl font-bold text-center mb-6 transform transition-all duration-1000 delay-300 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            G'day Balmain
          </span>
          <br />
          <span className="text-3xl md:text-5xl text-gray-700">
            Thanks for Everything, Legends!
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl text-gray-600 text-center max-w-3xl mb-12 transform transition-all duration-1000 delay-500 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          From your UNSW med students with hearts full of gratitude 
          <span className="inline-block ml-2">🇦🇺</span>
        </p>

        {/* Creative EKG Animation */}
        <div className={`w-full max-w-4xl mb-12 transform transition-all duration-1000 delay-700 ${
          showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <div className="relative h-32 bg-gray-900 rounded-2xl p-4 overflow-hidden shadow-2xl">
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-green-400" style={{ top: `${i * 12.5}%` }} />
              ))}
              {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute h-full w-px bg-green-400" style={{ left: `${i * 5}%` }} />
              ))}
            </div>

            {/* EKG Line */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d={`M 0,64 L ${ekgProgress * 4},64 ${ekgProgress * 4 + 10},64 ${ekgProgress * 4 + 15},20 ${ekgProgress * 4 + 20},108 ${ekgProgress * 4 + 25},64 ${ekgProgress * 4 + 35},64`}
                stroke="#4ade80"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              />
            </svg>

            {/* Activity Icon */}
            <Activity className="absolute top-2 right-2 w-6 h-6 text-green-400 animate-pulse" />
          </div>
          
          {/* EKG Label */}
          <p className="text-center mt-4 text-gray-600 font-medium">
            Our hearts beat as one with Balmain Hospital
          </p>
        </div>

        {/* Call to Action */}
        <div className={`transform transition-all duration-1000 delay-1000 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button
            onClick={scrollToNext}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Begin Our Journey of Thanks</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}>
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreativeHero;