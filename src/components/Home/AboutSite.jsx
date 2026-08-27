import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AboutSite = ({ className = '', variant = 'dark', image, title, description, bullets = [], reverse = false }) => {
  // Theme variations
  const themes = {
    dark: {
      bg: 'bg-slate-900', // safe class
      text: 'text-white',
      accent: 'text-yellow-500', // safe class
      bulletBg: 'bg-yellow-500/10',
      bulletBorder: 'border-yellow-500/20',
      bulletIcon: 'text-yellow-500'
    },
    emerald: {
      bg: 'bg-emerald-900', // safe class (950 might not exist)
      text: 'text-white',
      accent: 'text-emerald-400',
      bulletBg: 'bg-emerald-500/10',
      bulletBorder: 'border-emerald-500/20',
      bulletIcon: 'text-emerald-400'
    }
  };

  const theme = themes[variant] || themes.dark;

  return (
    <section className={`relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl ${className} ${theme.bg}`}>
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} relative z-10`}>
        
        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[500px] overflow-hidden group">
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110 ease-out" 
          />
          {/* Vignette Overlay for Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/80 mix-blend-multiply"></div>
          {reverse && <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/80 mix-blend-multiply"></div>}
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-6 self-start shadow-xl">
            <span className={`w-2 h-2 rounded-full animate-pulse ${variant === 'dark' ? 'bg-yellow-400' : 'bg-emerald-400'}`}></span>
            Clinical Excellence
          </div>

          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight leading-[1.1] ${theme.text}`}>
            {title.split(' ').map((word, i) => (
               <span key={i} className={i === 1 ? theme.accent : ''}>{word} </span>
            ))}
          </h3>
          
          <p className="text-white/70 leading-relaxed font-medium text-lg sm:text-xl max-w-xl mb-8">
            {description}
          </p>

          {bullets.length > 0 && (
            <div className="flex flex-col gap-4 mb-10">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${theme.bulletBg} ${theme.bulletBorder} border transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10`}>
                    <ArrowForwardIosIcon sx={{ fontSize: 14 }} className={`${theme.bulletIcon} ml-0.5`} />
                  </div>
                  <span className="text-white/90 font-semibold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

AboutSite.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['dark', 'emerald']),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  bullets: PropTypes.array,
  reverse: PropTypes.bool
};

export default AboutSite;
