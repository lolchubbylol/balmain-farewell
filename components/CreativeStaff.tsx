import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Award, Coffee, Smile } from 'lucide-react';

interface StaffMember {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  emoji: string;
  color: string;
  icon: React.ElementType;
}

const staffMembers: StaffMember[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Emergency Consultant",
    specialty: "Keeping us calm in chaos",
    quote: "You've all got this!",
    emoji: "🚑",
    color: "from-red-400 to-red-600",
    icon: Heart
  },
  {
    name: "Dr. Michael O'Brien",
    role: "Medical Registrar",
    specialty: "Master of midnight teaching",
    quote: "Always ask why!",
    emoji: "🌙",
    color: "from-blue-400 to-blue-600",
    icon: Star
  },
  {
    name: "Sister Angela Nguyen",
    role: "NUM Ward 3B",
    specialty: "Guardian angel in scrubs",
    quote: "Compassion is key",
    emoji: "👼",
    color: "from-purple-400 to-purple-600",
    icon: Sparkles
  },
  {
    name: "Dr. James Wilson",
    role: "Surgical Consultant",
    specialty: "Steady hands, big heart",
    quote: "Precision and patience",
    emoji: "🏥",
    color: "from-green-400 to-green-600",
    icon: Award
  },
  {
    name: "Nurse Emma Thompson",
    role: "Clinical Educator",
    specialty: "Teaching with endless patience",
    quote: "Every day is a lesson",
    emoji: "📚",
    color: "from-amber-400 to-amber-600",
    icon: Coffee
  },
  {
    name: "Dr. Raj Patel",
    role: "GP Supervisor",
    specialty: "Community care champion",
    quote: "Listen to your patients",
    emoji: "🤝",
    color: "from-teal-400 to-teal-600",
    icon: Smile
  }
];

const CreativeStaff: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(staffMembers.length).fill(false));

  useEffect(() => {
    // Stagger card appearances
    staffMembers.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 150);
    });
  }, []);

  return (
    <div id="staff-section" className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50 py-20 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 text-6xl opacity-10 animate-float">🏥</div>
        <div className="absolute top-3/4 right-20 text-5xl opacity-10 animate-float-delayed">❤️</div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl opacity-10 animate-float">🩺</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Balmain Heroes
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            To the legends who turned our medical journey into an unforgettable adventure
          </p>
          
          {/* Aussie Touch */}
          <div className="flex justify-center items-center gap-2 mt-4 text-gray-600">
            <span>True blue Aussie mentors</span>
            <span className="text-2xl">🇦🇺</span>
          </div>
        </div>

        {/* Staff Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {staffMembers.map((member, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                visibleCards[index] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 ${
                activeCard === index ? 'scale-105 shadow-2xl' : ''
              }`}>
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${member.color} relative overflow-hidden`}>
                  {/* Floating Icons */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <member.icon
                        key={i}
                        className={`absolute text-white/20 animate-float`}
                        size={24}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Emoji Badge */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{member.emoji}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 pb-6 px-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm italic mb-4">"{member.specialty}"</p>
                  
                  {/* Quote */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeCard === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 font-medium">💬 {member.quote}</p>
                    </div>
                  </div>

                  {/* Thank You Message */}
                  <div className="mt-4 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 ${
                          activeCard === index 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Thanks Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              And to Everyone at Balmain...
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                To every nurse who answered our endless questions with a smile 😊
              </p>
              <p className="text-lg">
                To the wardies who shared their wisdom between patient transfers 🏃‍♂️
              </p>
              <p className="text-lg">
                To the admin staff who always knew where we needed to be 📋
              </p>
              <p className="text-lg">
                To the kitchen staff who kept us fueled with Tim Tams and flat whites ☕
              </p>
            </div>
            
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full">
              <Heart className="w-5 h-5 fill-white" />
              <span>You're all bloody legends!</span>
              <Heart className="w-5 h-5 fill-white" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
};

export default CreativeStaff;