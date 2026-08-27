import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getBanners } from '../../../actions/bannerAction';
import { CircularProgress, Box } from '@mui/material';

export const PreviousBtn = ({ className, onClick }) => (
  <div className={`${className} z-20 !flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-110 transition-all duration-500 left-4 sm:left-12 cursor-pointer`} onClick={onClick}>
    <ArrowBackIosIcon sx={{ color: 'white', fontSize: 20, ml: 0.5 }} className="sm:!text-[22px]" />
  </div>
);

export const NextBtn = ({ className, onClick }) => (
  <div className={`${className} z-20 !flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-110 transition-all duration-500 right-4 sm:right-12 cursor-pointer`} onClick={onClick}>
    <ArrowForwardIosIcon sx={{ color: 'white', fontSize: 20 }} className="sm:!text-[22px]" />
  </div>
);

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const { banners, loading } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: !isMobile ? <PreviousBtn /> : false,
    nextArrow: !isMobile ? <NextBtn /> : false,
    arrows: !isMobile,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    customPaging: i => (
      <div className="w-2.5 h-2.5 mx-2 rounded-full bg-white/40 hover:bg-white transition-all duration-300 mt-8 dot-inner" />
    )
  };

  if (loading) {
    return (
        <Box sx={{ width: '100%', height: '85vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#064e3b' }}>
            <CircularProgress sx={{ color: '#f59e0b' }} />
        </Box>
    );
  }

  // Fallback if no banners are added yet from admin panel
  const displayBanners = banners && banners.length > 0 ? banners : [{
      image: { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop' },
      title: "PIONEERING WELLNESS",
      subtitle: "Experience the next generation of clinical procurement with lightning-fast delivery and expert-verified medical supplies.",
      _id: 'default'
  }];

  return (
    <section className="w-full relative group overflow-hidden bg-black">
      <Slider {...settings}>
        {displayBanners.map((banner, i) => (
          <div key={banner._id} className="relative outline-none">
            <div className="h-[85vh] min-h-[600px] w-full relative flex items-center justify-center">
              
              <img
                draggable="false"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[40s] ease-out group-hover:scale-105"
                src={banner._id === 'default' ? banner.image.url : `/${banner.image.url}`}
                alt={banner.title}
              />
              
              {/* Ultra-Premium Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/95 via-[#064e3b]/60 to-transparent mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-12 container mx-auto text-center h-full pt-16">
                
                <div className="animate-fade-in-up w-full max-w-4xl flex flex-col items-center">
                  
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-green-50 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-8">
                    <span className="w-2 h-2 bg-primary-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                    Verified Clinical Partner
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
                    {banner.title && banner.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx === 1 ? "text-primary-orange inline-block" : "text-white inline-block"}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-green-50/90 mb-10 leading-relaxed max-w-2xl font-medium tracking-wide drop-shadow-md">
                    {banner.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                    <a href="/products" className="group relative overflow-hidden px-10 py-4 rounded-full font-semibold text-sm text-center text-white bg-primary-orange shadow-[0_10px_20px_-5px_rgba(245,158,11,0.6)] hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.8)] transition-all duration-300 hover:-translate-y-1">
                      <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest uppercase">
                        Access Catalog
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    </a>
                    
                    <a href="/about" className="group flex items-center justify-center gap-4 px-10 py-4 rounded-full font-semibold text-sm bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 transition-all duration-300 hover:-translate-y-1 tracking-widest uppercase">
                      Our Philosophy
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
