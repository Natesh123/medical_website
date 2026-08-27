import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';
import { fetchCart } from '../../actions/cartAction';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [isAuthenticated, dispatch]);

    const placeOrderHandler = () => {
        navigate('/shipping');
    };

    const continueShoppingHandler = () => {
        navigate('/products');
    };

    return (
        <>
            <MetaData title="Shopping Cart | Shree Kishan Aayushi" />
            <main className="min-h-screen pt-28 pb-24 bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
                
                <div className="w-full xl:w-[95%] 2xl:w-[90%] max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 mt-4 md:mt-8">

                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 animate-fade-in-up mt-2">
                        <div className="flex items-center gap-5 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-40 rounded-full group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
                                    <LocalMallOutlinedIcon />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Shopping Cart</h1>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to ship</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
                        
                        {/* Left Column - Cart Items */}
                        <div className="flex-1 w-full space-y-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>

                            {/* Cart List */}
                            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                                
                                <div className="p-6 md:p-10 space-y-2">
                                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Items ({cartItems.length})</h2>
                                    
                                    {cartItems.length === 0 ? (
                                        <EmptyCart />
                                    ) : (
                                        <div className="divide-y divide-slate-100">
                                            {cartItems.map((item) => (
                                                <div key={item.product} className="py-8 first:pt-0 last:pb-0">
                                                    <CartItem {...item} inCart={true} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions Block */}
                                {cartItems.length > 0 && (
                                    <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <button
                                            onClick={continueShoppingHandler}
                                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center gap-2"
                                        >
                                            &larr; Continue Shopping
                                        </button>
                                        <button
                                            onClick={placeOrderHandler}
                                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Saved For Later */}
                            {saveForLaterItems.length > 0 && (
                                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="p-6 md:p-10">
                                        <h2 className="text-xl font-semibold text-slate-900 mb-6">Saved for later ({saveForLaterItems.length})</h2>
                                        
                                        <div className="divide-y divide-slate-100">
                                            {saveForLaterItems.map((item) => (
                                                <div key={item.product} className="py-8 first:pt-0 last:pb-0">
                                                    <SaveForLaterItem {...item} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Order Summary */}
                        {cartItems.length > 0 && (
                            <div className="lg:w-[400px] xl:w-[480px] w-full sticky top-32 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                                <PriceSidebar cartItems={cartItems} />
                            </div>
                        )}
                    </div>

                </div>
            </main >
        </>
    );
};

export default Cart;