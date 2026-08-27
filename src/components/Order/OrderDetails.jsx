import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MetaData from '../Layouts/MetaData';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const BASE_URL = "/";

    const getImageUrl = (image) => {
        if (!image) return "/default.png";
        const imageUrl = image?.url || image;
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }
        return `${BASE_URL}admin/product/${imageUrl}`;
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Order Details | Shree Kishan Aayushi" />

            <main className="min-h-screen bg-[#f8fafc] pt-20 pb-24 relative overflow-hidden font-sans">
                {/* Premium Animated Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-80">
                    <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-[120px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-yellow-400/20 to-yellow-600/20 blur-[130px] rounded-full animate-float-2"></div>
                    <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-indigo-400/10 blur-[100px] rounded-full animate-pulse-slow"></div>
                </div>

                <div className="w-full container-responsive mx-auto relative z-10">
                    {loading ? <Loader /> : (
                        <>
                            {order && order.user && order.shippingInfo && (
                                <div className="flex flex-col gap-10 mt-10 animate-fade-in-up">
                                    
                                    {/* Header Section */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -ml-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
                                        
                                        <div className="flex items-center gap-5 relative z-10">
                                            <Link to="/orders" className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-slate-400 hover:text-emerald-600 border border-slate-100 hover:scale-105">
                                                <ArrowBackIosIcon fontSize="small" className="ml-1.5" />
                                            </Link>
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transform group-hover:rotate-6 transition-transform duration-500">
                                                    <ShoppingBagIcon fontSize="large" />
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">Order Details</h1>
                                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Order ID: <span className="text-slate-600">{params.id}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm relative z-10 hover:scale-105 transition-transform duration-300">
                                            <span className={`w-3 h-3 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-yellow-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.8)]'}`}></span>
                                            <span className="text-sm font-semibold text-slate-700 uppercase tracking-widest">{order.orderStatus}</span>
                                        </div>
                                    </div>

                                    {/* Two Column Layout */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                        {/* Tracking Status */}
                                        <div className="lg:col-span-2 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>
                                            
                                            <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-200/50 relative z-10">
                                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white shadow-lg shadow-emerald-500/20 transform group-hover:scale-110 transition-transform duration-300">
                                                    <LocalShippingIcon />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Tracking Status</h3>
                                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Track your order's journey</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-center justify-center py-8 relative z-10">
                                                <TrackStepper
                                                    orderOn={order.createdAt}
                                                    shippedAt={order.shippedAt}
                                                    deliveredAt={order.deliveredAt}
                                                    activeStep={
                                                        order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div className="lg:col-span-1 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -ml-20 -mb-20 transition-transform duration-700 group-hover:scale-110"></div>
                                            
                                            <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-200/50 relative z-10">
                                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl text-white shadow-lg shadow-yellow-500/20 transform group-hover:scale-110 transition-transform duration-300">
                                                    <LocationOnIcon />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Delivery Address</h3>
                                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Where your order is going</p>
                                                </div>
                                            </div>

                                            <div className="space-y-5 relative z-10">
                                                <div className="p-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-2xl"></div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <PersonIcon fontSize="small" className="text-slate-400" />
                                                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Receiver Name</p>
                                                    </div>
                                                    <p className="text-base font-semibold text-slate-800 pl-8">{order.user.name}</p>
                                                </div>

                                                <div className="p-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-2xl"></div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <LocationOnIcon fontSize="small" className="text-slate-400" />
                                                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Full Address</p>
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-600 leading-relaxed pl-8">
                                                        {order.shippingInfo.address},<br/>
                                                        {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                                                    </p>
                                                </div>

                                                <div className="p-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-2xl"></div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <PhoneIcon fontSize="small" className="text-slate-400" />
                                                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Phone Number</p>
                                                    </div>
                                                    <p className="text-base font-semibold text-slate-800 pl-8">{order.shippingInfo.phoneNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
                                        <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-200/50">
                                            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20 transform hover:scale-110 transition-transform duration-300">
                                                <ShoppingBagIcon />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Items in your order</h3>
                                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{order.orderItems?.length || 0} items total</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-5">
                                            {order.orderItems && order.orderItems.map((item, index) => {
                                                const { _id, image, name, price, quantity } = item;
                                                return (
                                                    <div key={_id} className={`flex flex-col md:flex-row items-center gap-8 p-6 bg-white/50 backdrop-blur-md rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 border border-white group`}>
                                                        <div className="w-28 h-28 rounded-2xl bg-white p-3 shadow-sm border border-slate-100 flex-shrink-0 group-hover:rotate-3 group-hover:scale-105 transition-all duration-500">
                                                            <img draggable="false" className="h-full w-full object-contain mix-blend-multiply" src={getImageUrl(image)} alt={name} />
                                                        </div>
                                                        <div className="flex-1 flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-6">
                                                            <div className="max-w-xl">
                                                                <Link to={`/product/${_id}`} className="text-xl font-semibold text-slate-800 hover:text-emerald-600 transition-colors line-clamp-2 mb-3">
                                                                    {name}
                                                                </Link>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-2 bg-slate-100/80 px-4 py-2 rounded-xl">
                                                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Price</span>
                                                                        <span className="text-sm font-semibold text-slate-700">₹{price.toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50">
                                                                        <span className="text-[10px] font-semibold text-emerald-600/70 uppercase tracking-widest">Qty</span>
                                                                        <span className="text-sm font-semibold text-emerald-600">x{quantity}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-start md:items-end w-full md:w-auto bg-slate-50/50 md:bg-transparent p-5 md:p-0 rounded-2xl border border-slate-100 md:border-none">
                                                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Item Total</span>
                                                                <span className="text-3xl font-semibold text-slate-800 tracking-tight">₹{(quantity * price).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Order Summary Footer */}
                                        <div className="mt-12 pt-10 border-t-2 border-dashed border-slate-200 flex flex-col md:flex-row justify-end items-end md:items-center gap-10">
                                            <div className="flex items-center gap-10">
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Subtotal</span>
                                                    <span className="text-lg font-semibold text-slate-700">₹{order.itemsPrice?.toLocaleString() || 0}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Shipping</span>
                                                    <span className="text-lg font-semibold text-slate-700">₹{order.shippingPrice?.toLocaleString() || 0}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Tax</span>
                                                    <span className="text-lg font-semibold text-slate-700">₹{order.taxPrice?.toLocaleString() || 0}</span>
                                                </div>
                                            </div>
                                            <div className="hidden md:block h-16 w-px bg-slate-200"></div>
                                            <div className="flex flex-col text-right bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-5 rounded-2xl shadow-lg shadow-emerald-500/20 w-full md:w-auto transform hover:scale-105 transition-transform duration-300">
                                                <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-widest mb-1">Grand Total</span>
                                                <span className="text-4xl font-semibold text-white tracking-tighter">₹{order.totalPrice?.toLocaleString() || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default OrderDetails;
