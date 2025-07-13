import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface Signature {
  name: string;
  message: string;
  style: string;
  color: string;
  path: string;
  emoji: string;
}

const signatures: Signature[] = [
  {
    name: "Jessica Wong",
    message: "Thanks for making us real doctors!",
    style: "elegant",
    color: "#FF6B6B",
    path: "M20,80 Q50,20 80,80 T140,80 M160,40 L160,100",
    emoji: "🩺"
  },
  {
    name: "Liam McCarthy",
    message: "Cheers for the laughs and lessons!",
    style: "bold",
    color: "#4ECDC4",
    path: "M20,60 L40,40 L60,80 L80,20 L100,80 L120,40 L140,60",
    emoji: "🍻"
  },
  {
    name: "Priya Sharma",
    message: "Forever grateful for your patience",
    style: "flowing",
    color: "#9B59B6",
    path: "M10,60 C30,20 70,20 90,60 S130,100 150,60 Q170,40 180,60",
    emoji: "💜"
  },
  {
    name: "Tom Chen",
    message: "You legends taught us everything!",
    style: "quirky",
    color: "#E67E22",
    path: "M20,40 L20,80 M20,40 Q40,30 60,40 M80,20 L80,80 Q100,60 120,80",
    emoji: "🏥"
  },
  {
    name: "Sophie Anderson",
    message: "Best placement ever, no cap!",
    style: "playful",
    color: "#3498DB",
    path: "M10,50 C30,10 50,90 70,50 C90,10 110,90 130,50 L150,30",
    emoji: "🌟"
  },
  {
    name: "Ahmed Hassan",
    message: "Balmain = Best hospital in Sydney!",
    style: "confident",
    color: "#2ECC71",
    path: "M20,80 L40,20 L60,60 L80,20 L100,80 M120,50 Q140,30 160,50",
    emoji: "💪"
  },
  {
    name: "Emily Zhang",
    message: "Thanks for believing in us",
    style: "graceful",
    color: "#F39C12",
    path: "M20,60 Q40,20 60,60 T100,60 M120,40 C140,20 160,60 180,40",
    emoji: "🌈"
  },
  {
    name: "Jack Thompson",
    message: "You've shaped our future, legends!",
    style: "energetic",
    color: "#E74C3C",
    path: "M10,80 L30,20 M30,50 L50,50 M70,20 L70,80 M90,40 Q110,20 130,40 T170,40",
    emoji: "🚀"
  },
  {
    name: "Maya Patel",
    message: "Grateful for every moment here",
    style: "artistic",
    color: "#8E44AD",
    path: "M20,50 S40,20 60,50 S80,80 100,50 S120,20 140,50 Q160,40 170,50",
    emoji: "🎨"
  },
  {
    name: "Ryan O'Brien",
    message: "Fair dinkum the best teachers!",
    style: "aussie",
    color: "#16A085",
    path: "M20,60 L40,20 L50,40 L60,20 L80,60 M100,40 Q120,20 140,40 Q160,60 180,40",
    emoji: "🇦🇺"
  },
  {
    name: "Grace Liu",
    message: "You made medicine magical",
    style: "whimsical",
    color: "#D35400",
    path: "M10,60 C30,20 50,100 70,60 M90,40 L110,60 L130,40 M150,50 Q170,30 180,50",
    emoji: "✨"
  },
  {
    name: "Daniel Kim",
    message: "Inspired to be doctors like you!",
    style: "inspired",
    color: "#27AE60",
    path: "M20,80 L20,20 Q40,10 60,20 L60,80 M80,50 C100,20 120,80 140,50 Q160,40 170,50",
    emoji: "🌟"
  }
];

const CreativeSignatures: React.FC = () => {
  const [visibleSignatures, setVisibleSignatures] = useState<boolean[]>(new Array(signatures.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger signature appearances
    signatures.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSignatures(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 px-4">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <Sparkles className="w-6 h-6 text-purple-300 opacity-30" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Messages from the Heart
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every UNSW medical student has left their mark and gratitude
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-gray-600">Signed with love and Tim Tam crumbs</span>
            <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>

        {/* Signatures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatures.map((signature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                visibleSignatures[index] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 ${
                hoveredIndex === index ? 'scale-105 shadow-2xl' : ''
              }`}>
                {/* Signature SVG */}
                <div className="mb-4 h-32 flex items-center justify-center">
                  <svg 
                    width="200" 
                    height="100" 
                    viewBox="0 0 200 100"
                    className="w-full h-full"
                  >
                    <path
                      d={signature.path}
                      stroke={signature.color}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-all duration-1000 ${
                        visibleSignatures[index] ? '' : 'opacity-0'
                      }`}
                      style={{
                        strokeDasharray: 500,
                        strokeDashoffset: visibleSignatures[index] ? 0 : 500,
                        transition: 'stroke-dashoffset 2s ease-in-out'
                      }}
                    />
                    {/* Decorative dots */}
                    {hoveredIndex === index && (
                      <>
                        <circle cx="190" cy="50" r="3" fill={signature.color} className="animate-ping" />
                        <circle cx="10" cy="50" r="2" fill={signature.color} className="animate-pulse" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Name and Message */}
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center justify-center gap-2">
                    <span>{signature.name}</span>
                    <span className="text-2xl">{signature.emoji}</span>
                  </h3>
                  <p className="text-gray-600 italic">"{signature.message}"</p>
                  
                  {/* Hover Effect */}
                  <div className={`mt-4 overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className="w-4 h-4 text-red-400 fill-red-400"
                          style={{
                            animation: hoveredIndex === index ? `bounce 0.5s ${i * 0.1}s` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Class Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-3xl shadow-xl p-8 max-w-3xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              From the UNSW Class of 2024
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To everyone at Balmain Hospital - you didn't just teach us medicine, 
              you showed us how to be compassionate healers. From our first nervous day 
              to our confident last rounds, you've been our guides, mentors, and inspiration.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              We'll carry your lessons (and your coffee recommendations) wherever we go!
            </p>
            <div className="mt-6 flex justify-center items-center gap-3">
              <span className="text-3xl">🏥</span>
              <span className="text-xl font-semibold text-blue-600">Forever Part of the Balmain Family</span>
              <span className="text-3xl">❤️</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CreativeSignatures;