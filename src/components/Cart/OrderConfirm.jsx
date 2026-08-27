import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';

const OrderConfirm = () => {

    const navigate = useNavigate();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="Deployment Finalization | Shree Kishan Aayushi" />
            <main className="min-h-screen pt-28 pb-24 bg-[#f8fafc] font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">

                {/* Ultra Premium Animated Background */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-400/20 blur-[140px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/20 blur-[140px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
                    <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-blue-300/10 blur-[100px] rounded-full mix-blend-overlay"></div>
                </div>

                <div className="w-full xl:w-[95%] 2xl:w-[90%] max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 mt-4 md:mt-8 relative z-10">
                    
                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 animate-fade-in-up mt-2">
                        <div className="flex items-center gap-5 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-40 rounded-full group-hover:opacity-70 transition-opacity duration-700"></div>
                                <div className="relative w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
                                    <FactCheckOutlinedIcon sx={{ fontSize: 30 }} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">Checkout</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">Final Order Review</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

                        {/* Main Content column */}
                        <div className="flex-1 w-full animate-fade-in-up" style={{animationDelay: '100ms'}}>
                            <Stepper activeStep={2}>
                                {/* Glassmorphism Card */}
                                <div className="bg-white/90 backdrop-blur-3xl rounded-b-[2.5rem] border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
                                    
                                    <div className="p-8 md:p-12 lg:p-16">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10 pb-8 border-b border-slate-100/80">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-[1.25rem] bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center shadow-inner">
                                                    <InventoryOutlinedIcon fontSize="medium" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Order Verification</h2>
                                                    <p className="text-sm font-semibold text-slate-400 mt-1">Please confirm details before finalizing.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                            {/* Rich Light Delivery Card */}
                                            <div className="relative p-7 rounded-[1.5rem] bg-white border border-slate-100 border-l-[6px] border-l-emerald-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.15)] transition-all duration-300 group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                                                
                                                <div className="flex flex-col relative z-10 h-full">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                            Delivery Destination
                                                        </span>
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                                            <LocalShippingOutlinedIcon fontSize="small" />
                                                        </div>
                                                    </div>
                                                    
                                                    <span className="text-lg font-semibold text-slate-900 mb-1.5 tracking-tight">{user.name}</span>
                                                    <span className="text-sm font-semibold text-slate-500 leading-relaxed">{`${shippingInfo.address}, ${shippingInfo.city}`}</span>
                                                    <span className="text-sm font-semibold text-slate-500">{`${shippingInfo.state} - ${shippingInfo.pincode}`}</span>
                                                    
                                                    <div className="mt-6 pt-5 border-t border-slate-100/80">
                                                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                            <PhoneOutlinedIcon sx={{ fontSize: 14 }} className="text-emerald-500" /> {shippingInfo.phoneNo}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rich Light Account Card */}
                                            <div className="relative p-7 rounded-[1.5rem] bg-white border border-slate-100 border-l-[6px] border-l-teal-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_50px_-10px_rgba(20,184,166,0.15)] transition-all duration-300 group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                                                
                                                <div className="flex flex-col relative z-10 h-full">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                            Account Info
                                                        </span>
                                                        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100/50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300">
                                                            <PersonOutlineOutlinedIcon fontSize="small" />
                                                        </div>
                                                    </div>
                                                    
                                                    <span className="text-lg font-semibold text-slate-900 mb-1.5 tracking-tight">{user.name}</span>
                                                    <span className="text-sm font-semibold text-slate-500 leading-relaxed break-all">{user.email}</span>
                                                    
                                                    <div className="mt-auto pt-6">
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                                                            <VerifiedIcon sx={{ fontSize: 14 }} /> Verified User
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-8 w-[1px] bg-slate-100 z-0"></div>
                                            <div className="flex flex-col gap-6 relative z-10">
                                                {cartItems?.map((item, i) => (
                                                    <div key={i} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-emerald-100 transition-all duration-300">
                                                        <CartItem {...item} inCart={false} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-12 mt-12 border-t border-slate-100 border-dashed">
                                            <button
                                                onClick={() => { navigate('/process/payment') }}
                                                className="w-full md:w-auto relative overflow-hidden flex items-center justify-center gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-14 py-5 rounded-2xl font-semibold tracking-widest shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.7)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group text-sm"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                                <span className="relative z-10">PROCEED TO SECURE PAYMENT</span>
                                                <ArrowForwardOutlinedIcon fontSize="small" className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Stepper>
                        </div>

                        {/* Price Breakdown Sidebar */}
                        <div className="lg:w-[400px] xl:w-[450px] w-full sticky top-32 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderConfirm;
