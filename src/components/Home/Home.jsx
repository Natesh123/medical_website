import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
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

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      if (error !== "Please Login to Access") {
        enqueueSnackbar(error, { variant: "error" });
      }
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
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

        <div className="container mx-auto px-4 sm:px-8 relative z-20 flex flex-col gap-24 py-20">

          {/* Why Choose Us - Premium Clinical Block */}
          <section className="animate-fade-in-up">
              <AboutSite
                variant="dark"
                image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop"
                title="State-of-the-Art Clinical Care"
                description="We leverage advanced logistics and professional expertise to deliver a premium healthcare experience right to your fingertips."
                bullets={["100% SECURE PROTOCOL", "LIVE SPECIALIST SYNC", "EXPRESS CLINICAL DELIVERY"]}
                reverse={false}
              />
          </section>

          {/* Delivery & Support */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <HomeDelivery />
          </section>

          <section className="animate-fade-in-up mb-16" style={{ animationDelay: '0.4s' }}>
              <AboutSite
                variant="emerald"
                image={ayurvedaImg}
                title="Vibrant Health Integration"
                description="Safe, fast, and secure delivery of your essential medical supplies. We prioritize your health with every shipment."
                bullets={["REAL-TIME ASSET TRACKING", "BIO-SECURE PACKAGING", "AUTOMATED RETURN PROTOCOLS"]}
                reverse={true}
              />
          </section>

        </div>
      </main>
    </>
  );
};

export default Home;