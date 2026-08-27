import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { getVideos } from '../../actions/videoAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import aayushiLogo from '../../assets/images/logo1.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { videos: featuredVideos } = useSelector((state) => state.videoList);
  const scrollRef = useRef(null);
  const videoScrollRef = useRef(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getVideos());
  }, [dispatch]);

  // Auto-scroll logic for Featured Products
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !products || products.length === 0) return;

    let animationId;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered && el) {
        el.scrollLeft += 1;
        // Reset scroll when reaching the halfway point (since items are duplicated)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Delay start slightly to ensure images load
    const timeoutId = setTimeout(() => {
       animationId = requestAnimationFrame(scroll);
    }, 1000);

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleMouseEnter, { passive: true });
    el.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchstart', handleMouseEnter);
      el.removeEventListener('touchend', handleMouseLeave);
    };
  }, [products]);

  // Auto-scroll logic for Featured Videos
  useEffect(() => {
    const el = videoScrollRef.current;
    if (!el || !featuredVideos || featuredVideos.length === 0) return;

    let animationId;
    let isHovered = false;

    const scroll = () => {
      // Only auto-scroll if we have enough videos to duplicate (length > 2)
      if (!isHovered && el && featuredVideos.length > 2) {
        el.scrollLeft += 0.5; // Slower scroll for videos
        // Reset scroll when reaching the halfway point
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const timeoutId = setTimeout(() => {
       animationId = requestAnimationFrame(scroll);
    }, 1500);

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleMouseEnter, { passive: true });
    el.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchstart', handleMouseEnter);
      el.removeEventListener('touchend', handleMouseLeave);
    };
  }, [featuredVideos]);

  return (
    <div className="w-full min-h-screen bg-[#052e16] text-white font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-[#052e16]">
      
      {/* 1. Medical Clinical Hero Section (100vh) */}
      <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden">
        {/* Abstract Clinical Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[70%] h-[100%] bg-gradient-to-l from-green-50/80 via-yellow-50/30 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-yellow-300/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute top-1/4 -left-32 w-[35rem] h-[35rem] bg-green-400/10 rounded-full blur-[150px] animate-float-1" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[25rem] h-[25rem] bg-yellow-500/10 rounded-full blur-[100px] animate-float-2" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] mix-blend-overlay"></div>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center justify-between relative z-20 pt-20 lg:pt-0">
          
          {/* Left Text Content (Pushed to the left edge with padding) */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left gap-8 px-6 lg:pl-16 xl:pl-32 pb-16 lg:pb-0 z-10">
            <div className="animate-fade-in-up mb-4">
              <img src={aayushiLogo} alt="Shree Kishan Aayushi Logo" className="h-16 sm:h-20 lg:h-24 w-auto drop-shadow-md rounded-2xl" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-semibold uppercase tracking-tight leading-[1.2] text-[#052e16] animate-fade-in-up relative" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -inset-4 bg-yellow-200/20 blur-2xl rounded-full z-0"></div>
              <span className="relative z-10 drop-shadow-sm">Shree Kishan</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-yellow-500 relative z-10 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                Aayushi
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-medium max-w-xl animate-fade-in-up mt-2" style={{ animationDelay: '0.2s' }}>
              Elevating healthcare infrastructure with verified logistics, encrypted procurement, and state-of-the-art medical asset management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => navigate('/home')} 
                className="w-full sm:w-auto px-12 py-6 bg-[#052e16] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_15px_30px_rgba(5,46,22,0.2)] hover:bg-yellow-500 hover:text-[#052e16] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(234,179,8,0.3)] transition-all duration-500"
              >
                Enter Medical Portal
              </button>
              <button 
                onClick={() => {
                  document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-10 py-6 bg-white border border-gray-200 text-[#052e16] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-green-50 hover:border-green-200 transition-all duration-500 shadow-sm"
              >
                Explore Features
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <div className="flex -space-x-4">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Doctor" className="w-14 h-14 rounded-full border-[3px] border-white shadow-md object-cover" />
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Doctor" className="w-14 h-14 rounded-full border-[3px] border-white shadow-md object-cover" />
                  <img src="https://images.unsplash.com/photo-1594824436998-5f0b5037d042?w=100&h=100&fit=crop" alt="Doctor" className="w-14 h-14 rounded-full border-[3px] border-white shadow-md object-cover" />
               </div>
               <div className="flex flex-col">
                  <span className="text-lg font-semibold text-[#052e16]">10,000+</span>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Medical Partners</span>
               </div>
            </div>
          </div>

          {/* Right Image Composition (Premium Collage) */}
          <div className="w-full lg:w-[55%] relative h-[60vh] lg:h-screen hidden lg:flex items-center justify-center p-8 lg:p-16">
             
             {/* Abstract Background Curve */}
             <div className="absolute right-0 top-0 w-[80%] h-full bg-gradient-to-bl from-green-100/50 via-green-50/20 to-transparent rounded-l-[8rem]"></div>
             <div className="absolute right-20 top-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-[80px] animate-pulse"></div>
             
             <div className="relative w-full max-w-2xl aspect-square lg:aspect-[4/5] z-10">
                
                {/* Main Large Image - Modern Medical Lab/Tech */}
                <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(5,46,22,0.15)] border-[8px] border-white z-10 animate-fade-in-up transform transition-transform hover:scale-105 duration-700">
                   <div className="absolute inset-0 bg-green-900/10 z-10 mix-blend-overlay"></div>
                   <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" alt="Advanced Clinical Research" className="w-full h-full object-cover" />
                </div>
                
                {/* Secondary Image Overlapping - Professional Doctors */}
                <div className="absolute bottom-10 left-0 w-[60%] h-[60%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(5,46,22,0.2)] border-[6px] border-white z-20 animate-fade-in-up transform hover:-translate-y-2 hover:rotate-1 transition-all duration-500" style={{ animationDelay: '0.3s' }}>
                   <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop" alt="Clinical Precision" className="w-full h-full object-cover" />
                </div>

                {/* Floating Glassmorphism Badge 1 - ISO Certified */}
                <div className="absolute top-24 -left-12 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white flex items-center gap-5 z-30 animate-bounce-slow" style={{ animationDelay: '0.6s' }}>
                   <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                      <VerifiedUserIcon sx={{ fontSize: 28 }} />
                   </div>
                   <div className="flex flex-col pr-4">
                      <span className="text-lg font-semibold text-[#052e16] tracking-tight">ISO Certified</span>
                      <span className="text-[10px] font-semibold text-green-600 uppercase tracking-[0.2em] mt-0.5">Clinical Grade</span>
                   </div>
                </div>

                {/* Floating Glassmorphism Badge 2 - Global Logistics */}
                <div className="absolute bottom-16 -right-8 bg-[#052e16]/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_rgba(5,46,22,0.3)] border border-[#052e16] flex items-center gap-5 z-30 animate-bounce-slow" style={{ animationDelay: '0.8s', animationDirection: 'alternate-reverse' }}>
                   <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-[#052e16] shadow-lg shadow-yellow-500/30">
                      <LocalShippingIcon sx={{ fontSize: 26 }} />
                   </div>
                   <div className="flex flex-col pr-4">
                      <span className="text-lg font-semibold text-white tracking-tight">Global Logistics</span>
                      <span className="text-[10px] font-semibold text-yellow-500 uppercase tracking-[0.2em] mt-0.5">24/7 Delivery</span>
                   </div>
                </div>
                
             </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 lg:left-[25%] -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-green-200 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 2. Custom Feature Grid (Immersive 3D Cards) */}
      <section id="explore" className="w-full py-32 bg-[#052e16] relative z-10">
        <div className="container-responsive px-4">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tighter mb-6">
              Why Choose <span className="text-yellow-500">Us?</span>
            </h2>
            <div className="w-24 h-2 bg-yellow-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Verified Assets", icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />, desc: "Every medical product is rigorously verified against clinical standards before entering our network." },
              { title: "Secure Logistics", icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, desc: "AES-256 encrypted tracking ensures your vital supplies are monitored from our hub to your facility." },
              { title: "24/7 Support", icon: <SupportAgentIcon sx={{ fontSize: 40 }} />, desc: "Our nodal network agents are available around the clock to assist with critical procurement." }
            ].map((feature, i) => (
              <div key={i} className="group relative p-[1.5px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-yellow-500 hover:via-green-500/50 hover:to-transparent transition-all duration-700 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative h-full bg-[#031d0e] rounded-[1.4rem] p-10 flex flex-col items-center text-center gap-6 border border-white/5 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>
                  <div className="w-20 h-20 rounded-full bg-[#052e16] border border-white/10 flex items-center justify-center text-yellow-500 group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:to-yellow-600 group-hover:text-[#052e16] transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] z-10 scale-100 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold uppercase tracking-widest">{feature.title}</h3>
                  <p className="text-white/60 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 Dynamic Products Scrolling Section */}
      <section className="w-full py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-[#052e16] relative z-10 overflow-hidden border-y border-gray-200/50">
        {/* Abstract Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-green-200/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-yellow-200/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
        
        <div className="container-responsive px-4 mb-8 flex flex-col md:flex-row items-end justify-between gap-4 relative z-10">
          <div className="flex flex-col gap-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 border border-yellow-200 shadow-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-700">Verified Catalog</span>
             </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tighter text-[#052e16]">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">Products</span>
            </h2>
          </div>
          <button 
             onClick={() => navigate('/home')}
             className="hidden md:flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-[#052e16] text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-[#052e16] hover:text-white hover:border-[#052e16] transition-all shadow-sm group"
          >
             View Full Catalog <PlayArrowIcon className="group-hover:translate-x-1 transition-transform" sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={scrollRef} className="w-full flex overflow-x-auto pb-8 px-4 lg:px-16 gap-6 relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {products && [...products, ...products, ...products, ...products].map((product, index) => (
            <div 
              key={`${product._id}-${index}`} 
              onClick={() => navigate('/login')}
              className="shrink-0 w-[280px] md:w-[300px] bg-white rounded-[1.5rem] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-yellow-400/50 hover:shadow-[0_20px_40px_rgba(5,46,22,0.1)] transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col relative"
            >
              {/* Glowing hover effect background */}
              <div className="absolute -inset-px bg-gradient-to-b from-yellow-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem] pointer-events-none"></div>
              
              {/* Product Image Box */}
              <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1rem] relative overflow-hidden flex items-center justify-center p-2 group-hover:from-white group-hover:to-gray-50 transition-all duration-500 shadow-inner z-10">
                <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <img 
                  src={
                      product.images && product.images.length > 0 && product.images[0].url
                          ? (product.images[0].url.startsWith('http') || product.images[0].url.startsWith('https')
                              ? product.images[0].url
                              : `/admin/product/${product.images[0].url}`)
                          : "/default.png"
                  }
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out relative z-10" 
                />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-all duration-500 group-hover:scale-110 z-20">
                  <VerifiedUserIcon sx={{ fontSize: 16 }} />
                </div>
              </div>
              
              {/* Product Details */}
              <div className="pt-4 px-2 flex flex-col gap-2 flex-1 relative z-10 text-center items-center">
                <span className="w-fit px-2 py-0.5 bg-green-100/50 border border-green-200 text-green-700 text-[9px] font-semibold uppercase tracking-[0.15em] rounded-full shadow-sm">
                  {product.category || "Clinical Asset"}
                </span>
                
                <h3 className="font-semibold text-base leading-snug line-clamp-2 text-[#052e16] group-hover:text-green-800 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Premium Unlock Button */}
                <div className="mt-auto pt-3 pb-1 w-full">
                  <div className="w-full h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#052e16] group-hover:to-green-900 group-hover:border-transparent transition-all duration-500 relative overflow-hidden shadow-sm group-hover:shadow-[0_10px_20px_rgba(5,46,22,0.3)]">
                     <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer ease-in-out"></div>
                     <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-500 z-10 shadow-sm">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 group-hover:text-[#052e16] transition-colors duration-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 group-hover:text-white transition-colors duration-500 z-10">
                        Unlock Pricing
                     </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Immersive Video Presentation (Dynamic Scroll) */}
      <section className="w-full py-12 relative overflow-hidden flex flex-col bg-[#010a04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#052e16] via-[#021409] to-[#010a04] opacity-90 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        
        <div className="container-responsive relative z-10 px-4 mb-12">
          <div className="flex flex-col gap-4 max-w-7xl mx-auto">
              
              <div className="flex items-center gap-4 mb-2">
                 <span className="w-12 h-1 bg-yellow-500 rounded-full"></span>
                 <p className="text-[11px] font-semibold text-yellow-500 uppercase tracking-[0.4em]">Cinematic Gallery</p>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tight leading-[1.1] text-white">
                    Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">In Healthcare</span>
                  </h2>
                  
                  <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-lg lg:pb-2 border-l-2 border-yellow-500/40 pl-5">
                    Explore our extensive catalog of high-grade surgical instruments and medical equipment. Watch verified clinical demonstrations that highlight our commitment to quality, reliability, and advanced patient care.
                  </p>
              </div>
              
          </div>
        </div>

        <div ref={videoScrollRef} className="w-full flex overflow-x-auto pb-16 px-4 lg:px-16 gap-8 relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           {/* Only duplicate for infinite scroll if there are more than 2 videos */}
           {featuredVideos && featuredVideos.length > 0 ? (
             (featuredVideos.length > 2 ? [...featuredVideos, ...featuredVideos] : featuredVideos).map((vid, idx) => (
               <div key={`${vid._id}-${idx}`} className="shrink-0 w-[320px] md:w-[480px] lg:w-[540px] flex flex-col group cursor-pointer">
                  {/* Glassmorphic Card Wrapper */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 transition-all duration-700 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.15)] hover:-translate-y-3">
                      
                      <div className="relative aspect-video w-full rounded-[1.8rem] overflow-hidden bg-black shadow-inner">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none transition-all duration-700 z-20"></div>
                        
                        {vid.type === 'youtube' ? (
                          vid.url.includes('instagram.com') ? (
                             <iframe 
                                className="w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-105" 
                                src={(() => {
                                   const cleanUrl = vid.url.split('?')[0].replace(/\/$/, '');
                                   return `${cleanUrl}/embed`;
                                })()}
                                frameBorder="0" 
                                scrolling="no"
                                allowTransparency="true"
                             ></iframe>
                          ) : vid.url.includes('facebook.com') ? (
                             <iframe 
                                className="w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-105" 
                                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(vid.url)}`}
                                frameBorder="0" 
                                scrolling="no"
                                allowTransparency="true"
                                allowFullScreen
                             ></iframe>
                          ) : (
                             <iframe 
                                className="w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-105" 
                                src={(() => {
                                   let embedUrl = vid.url;
                                   try {
                                       if (vid.url.includes('watch?v=')) {
                                           const videoId = new URL(vid.url).searchParams.get('v');
                                           embedUrl = `https://www.youtube.com/embed/${videoId}`;
                                       } else if (vid.url.includes('youtu.be/')) {
                                           const videoId = vid.url.split('youtu.be/')[1].split('?')[0];
                                           embedUrl = `https://www.youtube.com/embed/${videoId}`;
                                       }
                                   } catch(e) {}
                                   return `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=0&controls=1&rel=0`;
                                })()}
                                title={vid.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                             ></iframe>
                          )
                        ) : (
                          <video 
                            className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-105" 
                            controls 
                            src={vid.url}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-5 mt-6 px-3 mb-2">
                         <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:bg-yellow-500 group-hover:text-[#052e16] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] group-hover:scale-110 transition-all duration-500">
                            <PlayArrowIcon sx={{ fontSize: 24 }} />
                         </div>
                         <div className="flex flex-col overflow-hidden">
                            <h3 className="text-white font-semibold text-xl truncate group-hover:text-yellow-400 transition-colors duration-300 tracking-tight">{vid.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.8)]"></span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-300 transition-colors">
                                  {vid.type === 'youtube' ? (
                                    vid.url.includes('instagram.com') ? 'Instagram Reel' :
                                    vid.url.includes('facebook.com') ? 'Facebook Video' :
                                    'YouTube Premiere'
                                  ) : 'Exclusive Asset'}
                                </span>
                            </div>
                         </div>
                      </div>
                  </div>
               </div>
             ))
           ) : (
               <div className="w-full text-center py-20 text-white/50 italic font-medium">
                  No cinematic features available at the moment.
               </div>
           )}
        </div>

      </section>

      {/* 4. Final CTA - Horizontal Banner */}
      <section className="w-full py-12 lg:py-16 bg-[#021409] border-t border-yellow-500/10 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            
            <div className="flex flex-col gap-3 w-full lg:w-2/3">
                <div className="flex items-center gap-3 mb-1">
                   <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
                   <p className="text-[10px] font-semibold text-yellow-500 uppercase tracking-[0.3em]">Secure Medical Portal</p>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white uppercase tracking-tight leading-[1.1]">
                  Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Clinical Supply</span>
                </h2>
                <p className="text-white/60 text-base lg:text-lg font-medium max-w-2xl mt-1">
                  Join thousands of leading healthcare professionals who rely on our advanced, verified medical inventory system every single day.
                </p>
            </div>

            <div className="w-full lg:w-1/3 flex justify-start lg:justify-end shrink-0">
                <button onClick={() => navigate('/home')} className="group relative px-8 py-5 lg:px-10 bg-yellow-500 text-[#052e16] text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.3em] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(234,179,8,0.15)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.3)] hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 w-full lg:w-auto">
                   <div className="absolute inset-0 bg-white/30 -skew-x-12 -translate-x-full group-hover:animate-shimmer transition-all duration-700 ease-out"></div>
                   <span className="relative z-10 whitespace-nowrap">Access Portal</span>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                </button>
            </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
