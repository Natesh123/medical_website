import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-10 animate-fade-in-up text-center">
            <div className="w-48 h-48 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 relative group">
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-24 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 relative z-10">
                    <ShoppingCartIcon sx={{ fontSize: 40 }} className="text-slate-300 group-hover:text-emerald-500 transition-colors duration-500" />
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight mb-3">Your Cart is Empty</h2>
            <p className="text-slate-400 max-w-sm font-semibold tracking-wide uppercase text-[10px] leading-relaxed mb-8">You haven't added any items to your cart yet.</p>
            <Link
                to="/products"
                className="px-10 py-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/30 hover:-translate-y-1 transition-all"
            >
                Start Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;
