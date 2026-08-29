import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import Product from '../Products/Product';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import HomeHealthArticles from './HomeHealthArticles';
import HomeExperts from './HomeExperts';
import HomeBrands from './HomeBrands';
import HomeDelivery from './HomeDelivery';
import brandImg from '../../assets/images/Home/brand.svg';
import expertImg from '../../assets/images/Home/expert.svg';
import deliveryImg from '../../assets/images/Home/delivery.svg';
import tipsImg from '../../assets/images/Home/health_tips.svg';
import HomeHighlights from './HomeHighlights';
import AboutSite from './AboutSite';
import ayurvedaImg from '../../assets/images/Home/ayurveda.png';
import ayurvedaSiddhaImg from '../../assets/images/Home/ayurveda_siddha.jpg';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      if (error !== "Please Login to Access") {
        enqueueSnackbar(error, { variant: "error" });
      }
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Shree Kishan Aayushi | Premium Healthcare Assets & Clinical Protocols" />

      <main className="w-full min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">

        {/* Banner Section - Now Full Width Edge-to-Edge */}
          <section className="w-full relative z-10 pt-20">
          <Banner />
        </section>

        {/* Premium Medical Mesh Background for lower sections */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mt-[80vh]">
          <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] bg-primary-green/10 blur-[150px] rounded-full animate-float-1"></div>
          <div className="absolute bottom-0 right-[-10%] w-[60%] h-[60%] bg-primary-orange/10 blur-[150px] rounded-full animate-float-2"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-20 flex flex-col gap-20 py-16">



          {/* Overall Dynamic Products Grid */}
          <section data-aos="fade-up" className="w-full flex flex-col gap-8 bg-white/40 p-4 sm:p-6 lg:p-8 rounded-[3rem] border border-blue-100/50 shadow-xl shadow-slate-200/40">
              <div className="flex flex-row justify-between items-end border-b-2 border-slate-100 pb-4 mb-4">
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                          <span className="w-8 h-1 bg-[#16a34a] rounded-full"></span>
                          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight uppercase">Trending Supplies</h2>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase ml-11">Explore our complete premium catalog</p>
                  </div>
                  <Link to="/products" className="mb-1 text-[11px] font-bold text-[#d97706] hover:text-white border border-[#d97706] hover:bg-[#d97706] px-5 py-2 rounded-full uppercase tracking-widest transition-all duration-300">
                      View All
                  </Link>
              </div>
              
              {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className="bg-white/50 h-32 rounded-2xl animate-pulse border border-slate-100 shadow-sm"></div>
                      ))}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products?.slice(0, 12).map((product) => (
                          <Product key={product._id} {...product} />
                      ))}
                  </div>
              )}
          </section>



          {/* Why Choose Us - Dark Block */}
          <section data-aos="fade-right">
              <AboutSite
                variant="dark"
                image={ayurvedaSiddhaImg}
                title="Traditional Siddha & Ayurvedic Care"
                description="Experience the healing power of ancient wisdom with our authentic Siddha and Ayurveda medical supplies, bringing wellness to your doorstep."
                bullets={["100% SECURE PROTOCOL", "LIVE SPECIALIST SYNC", "EXPRESS CLINICAL DELIVERY"]}
                reverse={false}
              />
          </section>



          {/* Why Choose Us - Emerald Block */}
          <section data-aos="fade-left">
              <AboutSite
                variant="emerald"
                image={ayurvedaImg}
                title="Vibrant Health Integration"
                description="Safe, fast, and secure delivery of your essential medical supplies. We prioritize your health with every shipment."
                bullets={["REAL-TIME ASSET TRACKING", "BIO-SECURE PACKAGING", "AUTOMATED RETURN PROTOCOLS"]}
                reverse={true}
              />
          </section>



          {/* Delivery & Support */}
          <section data-aos="fade-up" className="mb-10">
            <HomeDelivery />
          </section>

        </div>
      </main>
    </>
  );
};

export default Home;