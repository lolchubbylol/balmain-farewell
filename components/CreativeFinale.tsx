import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, MapPin, Plane, Stethoscope } from 'lucide-react';

const CreativeFinale: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [floatingElements, setFloatingElements] = useState<number[]>([]);
  const [heartbeat, setHeartbeat] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    
    // Create floating elements
    const interval = setInterval(() => {
      setFloatingElements(prev => [...prev, Date.now()]);
    }, 2000);

    // Heartbeat animation
    const heartbeatInterval = setInterval(() => {
      setHeartbeat(true);
      setTimeout(() => setHeartbeat(false), 200);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(heartbeatInterval);
    };
  }, []);

  // Clean up old floating elements
  useEffect(() => {
    const cleanup = setInterval(() => {
      setFloatingElements(prev => prev.filter(time => Date.now() - time < 6000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-amber-50 to-pink-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((time) => (
        <div
          key={time}
          className="absolute animate-float-diagonal"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
          }}
        >
          {Math.random() > 0.5 ? (
            <Heart className="w-8 h-8 text-red-300 opacity-40" />
          ) : (
            <Stethoscope className="w-8 h-8 text-blue-300 opacity-40" />
          )}
        </div>
      ))}

      {/* Australian Map Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <MapPin className="w-96 h-96 text-gray-800" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className={`text-center transform transition-all duration-1000 ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Giant Heart */}
            <div className="mb-8 flex justify-center">
              <div className={`relative transform transition-all duration-300 ${
                heartbeat ? 'scale-110' : 'scale-100'
              }`}>
                <Heart className="w-32 h-32 text-red-500 fill-red-500" />
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400" />
                <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-blue-400" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                Until We Meet Again
              </span>
            </h1>

            {/* Heartfelt Message */}
            <div className="space-y-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              <p className="leading-relaxed">
                From the shores of Coogee to the heart of Balmain, 
                you've transformed us from nervous students into confident healers.
              </p>
              
              <p className="leading-relaxed">
                Every patient story shared, every skill taught with patience, 
                every "you've got this" when we doubted ourselves - 
                these moments have shaped who we'll become.
              </p>

              <p className="leading-relaxed font-semibold text-xl">
                Balmain Hospital isn't just where we learned medicine - 
                it's where we discovered our calling.
              </p>
            </div>

            {/* Journey Visual */}
            <div className={`mb-12 transform transition-all duration-1000 delay-500 ${
              showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur rounded-full px-8 py-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <span className="font-semibold">UNSW Students</span>
                </div>
                <Plane className="w-6 h-6 text-blue-500 animate-pulse" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Future Doctors</span>
                  <span className="text-2xl">🩺</span>
                </div>
              </div>
            </div>

            {/* Promise Section */}
            <div className={`bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 mb-12 transform transition-all duration-1000 delay-700 ${
              showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Promise to You</h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">We'll Care</h3>
                  <p className="text-gray-600">Like you taught us to care for every patient</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">We'll Excel</h3>
                  <p className="text-gray-600">Carrying Balmain's excellence wherever we go</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">We'll Remember</h3>
                  <p className="text-gray-600">Every lesson, laugh, and life-changing moment</p>
                </div>
              </div>
            </div>

            {/* Final Thanks */}
            <div className={`transform transition-all duration-1000 delay-1000 ${
              showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Thank you for everything, Balmain Hospital
              </p>
              
              <p className="text-xl text-gray-700 mb-8">
                You'll forever be part of our story
              </p>

              {/* Aussie Sign-off */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-gold-500 text-white px-8 py-4 rounded-full shadow-lg">
                <span className="text-2xl">🇦🇺</span>
                <span className="font-bold text-xl">See ya later, legends!</span>
                <span className="text-2xl">❤️</span>
              </div>
            </div>

            {/* Floating Hearts Animation */}
            <div className="mt-12">
              <p className="text-gray-600 italic">With love and gratitude,</p>
              <p className="text-lg font-semibold text-gray-800">UNSW Medicine Class of 2024</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-diagonal {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-100px, -100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-diagonal {
          animation: float-diagonal 6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreativeFinale;