import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const HomeDelivery = () => {
    const steps = [
        { 
            title: 'Order Confirmed', 
            desc: 'We verify and process orders carefully.', 
            step: '01',
            icon: <FactCheckOutlinedIcon sx={{ fontSize: 32 }} /> 
        },
        { 
            title: 'Packed Securely', 
            desc: 'Items are packed to maintain integrity during transit.', 
            step: '02',
            icon: <Inventory2OutlinedIcon sx={{ fontSize: 32 }} /> 
        },
        { 
            title: 'Delivered Fast', 
            desc: 'Quick doorstep delivery with tracking updates.', 
            step: '03',
            icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} /> 
        }
    ];

    return (
        <section className="relative w-full py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                <div>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-slate-800 tracking-tight leading-[1.1]">
                        Wellness <span className="text-emerald-600">Pipeline</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-[0.2em] mt-4 uppercase">
                        End-to-end clinical grade chain of care
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-4 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 shadow-sm">
                    <div className="relative flex items-center justify-center w-3 h-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest leading-none">
                        Status: Seamless
                    </span>
                </div>
            </div>

            {/* Pipeline Container */}
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100 -translate-y-1/2 hidden lg:block opacity-50"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                    {steps.map((s, i) => (
                        <div key={i} className="group relative">
                            
                            {/* Card Background (Glassmorphism) */}
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] group-hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                            
                            {/* Content */}
                            <div className="relative p-8 lg:p-10 flex flex-col items-center text-center">
                                
                                {/* Step Number Watermark */}
                                <div className="absolute top-4 right-6 text-5xl lg:text-6xl font-semibold text-slate-100 group-hover:text-emerald-50 transition-colors duration-500 select-none">
                                    {s.step}
                                </div>

                                {/* Icon Circle */}
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50 flex items-center justify-center mb-8 text-emerald-600 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-500">
                                    {s.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-3 group-hover:text-emerald-600 transition-colors">
                                    {s.title}
                                </h3>
                                
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    {s.desc}
                                </p>

                                {/* Animated Bottom Bar */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-full transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeDelivery;