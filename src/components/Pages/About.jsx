import MetaData from '../Layouts/MetaData';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import aayushiLogo from '../../assets/images/logo1.jpg';

const About = () => {
    return (
        <main className="min-h-screen pt-36 pb-20 bg-[#f4f6f8] relative">
            <MetaData title="About Us | Shree Kishan Aayushi" />

            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
                        About <span className="text-[#d97706]">Shree Kishan Aayushi</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Shree Kishan Aayushi is a leading based in Madurai. we are committed to delivering quality products and services.
                    </p>
                </div>

                {/* Company Details */}
                <div className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Our Company Profile</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Founded with a vision to revolutionize medical supply chains, Shree Kishan Aayushi has grown into a trusted partner for hospitals, clinics, and pharmacies nationwide. We specialize in distributing authentic, clinical-grade medical supplies with uncompromising efficiency.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Our robust infrastructure and stringent quality control protocols ensure that every product we deliver meets the highest global standards of safety and efficacy.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 mt-10">
                                <div className="flex flex-col gap-2">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                                        <VerifiedUserIcon />
                                    </div>
                                    <h4 className="font-semibold text-slate-900">100% Verified</h4>
                                    <p className="text-xs text-slate-500">All products sourced directly from manufacturers.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#d97706] mb-2">
                                        <TrendingUpIcon />
                                    </div>
                                    <h4 className="font-semibold text-slate-900">National Reach</h4>
                                    <p className="text-xs text-slate-500">Delivering to over 5,000 pin codes seamlessly.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full min-h-[350px] flex items-center justify-center p-6 sm:p-10 group">
                            {/* Animated Glowing Blobs */}
                            <div className="absolute top-0 -left-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 group-hover:opacity-60 group-hover:translate-x-12 group-hover:scale-110 transition-all duration-1000 ease-in-out z-0"></div>
                            <div className="absolute -bottom-10 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 group-hover:opacity-60 group-hover:-translate-y-12 group-hover:-translate-x-10 group-hover:scale-110 transition-all duration-1000 ease-in-out delay-100 z-0"></div>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 group-hover:opacity-60 group-hover:-translate-x-12 group-hover:translate-y-12 transition-all duration-1000 ease-in-out delay-200 z-0"></div>

                            {/* Main Glassmorphism Card */}
                            <div className="relative w-full h-full rounded-[2.5rem] bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] p-8 flex items-center justify-center transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-10 overflow-hidden">
                                {/* Inner decorative ring */}
                                <div className="absolute inset-3 rounded-[2rem] border-2 border-white/60 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                                
                                {/* Corner Accents that appear on hover */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-green-500 rounded-tl-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-500 rounded-br-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                
                                {/* Shimmer Effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></div>

                                {/* Logo */}
                                <img src={aayushiLogo} alt="Shree Kishan Aayushi Logo" className="w-full h-full object-contain relative z-20 filter drop-shadow-xl group-hover:scale-105 transition-transform duration-700 ease-out" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leadership Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">Leadership Team</h2>
                        <div className="w-16 h-1 bg-[#d97706] rounded-full mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        {/* Founder */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f4f6f8] shadow-md mb-6 bg-slate-200">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Founder" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-1">Ramesh Kumar</h3>
                            <p className="text-sm font-semibold text-[#d97706] uppercase tracking-widest mb-4">Founder & CEO</p>
                            <p className="text-slate-600 text-sm leading-relaxed italic">
                                "Our mission is simple: to ensure that no patient is ever deprived of care due to an inefficient supply chain. We are building the backbone of modern Indian healthcare."
                            </p>
                        </div>

                        {/* Manager 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f4f6f8] shadow-md mb-6 bg-slate-200">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Manager" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-1">Priya Sharma</h3>
                            <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-4">Operations Manager</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Overseeing our national logistics network, Priya ensures that critical medical supplies reach healthcare facilities securely and on time, every single day.
                            </p>
                        </div>

                        {/* Manager 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f4f6f8] shadow-md mb-6 bg-slate-200">
                                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Manager" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-1">Anil Desai</h3>
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Procurement Head</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                With over 15 years in pharmaceutical sourcing, Anil leads our vendor relations, ensuring strict compliance and quality audits for every product we stock.
                            </p>
                        </div>

                    </div>
                </div>

            </section>
        </main>
    );
};

export default About;
