import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoSection = () => {
  const benefits = [
    "Verified Clinical Protocols",
    "24/7 Supply Chain Support",
    "State-of-the-Art Logistics",
    "Encrypted Asset Tracking"
  ];

  return (
    <div className="w-full py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
      
      {/* Left Side - Video Player */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white bg-slate-100 transform -rotate-1 group-hover:rotate-0 transition-transform duration-700">
          <iframe 
            className="w-full h-[300px] sm:h-[400px] lg:h-[450px]" 
            src="https://www.youtube.com/embed/P6E1hHhJ0bA?autoplay=0&controls=1&rel=0" 
            title="Shree Kishan Aayushi Medical Facility" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Right Side - Text and Features */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-1 bg-yellow-500 rounded-full"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#16a34a]">Inside Our Operations</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#052e16] uppercase tracking-tighter leading-none mb-6">
            See Us <br /><span className="text-yellow-500">In Action</span>
          </h2>
          <p className="text-gray-600 font-semibold text-lg leading-relaxed mb-8">
            Take a behind-the-scenes look at how Shree Kishan Aayushi manages one of the most reliable and secure clinical supply chains in the region.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((text, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="text-yellow-500 group-hover:scale-125 transition-transform duration-300">
                  <CheckCircleIcon />
                </div>
                <span className="font-semibold text-gray-800 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-4 self-start px-8 py-4 bg-[#052e16] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-2xl hover:bg-yellow-500 hover:text-[#052e16] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#052e16]">
          Learn More About Us
        </button>
      </div>

    </div>
  );
};

export default VideoSection;
