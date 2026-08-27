import SecurityIcon from '@mui/icons-material/Security';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const PriceSidebar = ({ cartItems }) => {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
            
            {/* Highlighted Header */}
            <div className="flex items-center gap-5 mb-8 pb-6 border-b-2 border-slate-100 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-40 rounded-full group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
                        <ReceiptLongIcon />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none">Order Summary</h2>
                    <div className="flex items-center gap-2 mt-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Price Details</p>
                    </div>
                </div>
            </div>

            <div className="space-y-5 text-slate-600 font-medium">
                <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-slate-900">₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice || item.price || 0) * item.quantity), 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span>Discount</span>
                    <span className="text-emerald-600 font-semibold">- ₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice || item.price || 0) * item.quantity) - ((item.price || 0) * item.quantity)), 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                </div>

                <div className="flex justify-between items-center">
                    <span>GST (Estimated)</span>
                    <span className="text-slate-900">₹{cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.gst || 0) / 100 * item.quantity), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                        <span className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Total</span>
                        <span className="text-3xl font-semibold text-slate-900">₹{cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity) + ((item.price || 0) * (item.gst || 0) / 100 * item.quantity), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-center gap-2.5 shadow-sm">
                    <SecurityIcon className="text-emerald-500" fontSize="small" />
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-[0.15em]">Safe & Secure Payment</span>
                </div>
                
                <p className="text-[11px] text-slate-400 text-center px-4 leading-relaxed font-medium">
                    Final taxes will be calculated at checkout.
                </p>
            </div>
        </div>
    );
};

export default PriceSidebar;
