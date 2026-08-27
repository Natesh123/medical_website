import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';

const OrderItem = (props) => {

    const { orderId, name, image, price, quantity, createdAt, deliveredAt, orderStatus } = props;

    const BASE_URL = "/";

    // Construct proper image URL
    const getImageUrl = () => {
        if (!image) return "/default.png";

        const imageUrl = image?.url || image;

        // If it's already a full URL (starts with http/https), use it as is
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }

        // Otherwise, construct the full URL with BASE_URL
        return `${BASE_URL}admin/product/${imageUrl}`;
    };

    return (
        <Link to={`/order_details/${orderId}`} className="group flex flex-col p-5 bg-white border border-gray-100 rounded-[1.5rem] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:border-emerald-100 transition-all duration-300 relative overflow-hidden">
            
            <div className="flex gap-5">
                {/* Image Widget */}
                <div className="w-20 h-20 rounded-[1rem] bg-gray-50 p-2.5 border border-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img draggable="false" className="h-full w-full object-contain mix-blend-multiply" src={getImageUrl()} alt={name} />
                </div>
                
                {/* Main Details */}
                <div className="flex flex-col flex-1 min-w-0 py-0.5">
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide truncate">{name}</p>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">ID: {orderId.substring(0, 10)}</p>
                    
                    <div className="flex justify-between items-end mt-auto">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Amount</span>
                            <span className="text-base font-semibold text-[#f97316] leading-none tracking-tight">₹{price.toLocaleString()}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-[9px] font-semibold uppercase tracking-widest rounded-lg shadow-sm">
                            Qty: {quantity}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
                    {orderStatus === "Delivered" ? "Successfully Delivered" : orderStatus === "Shipped" ? "In Transit" : "Processing"}
                </p>
                <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm ${
                    orderStatus === 'Delivered' ? 'bg-emerald-50 border border-emerald-100' : 
                    orderStatus === 'Shipped' ? 'bg-orange-50 border border-orange-100' : 
                    'bg-slate-50 border border-slate-200'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                        orderStatus === 'Delivered' ? 'bg-emerald-500' : 
                        orderStatus === 'Shipped' ? 'bg-[#f97316]' : 
                        'bg-slate-500'
                    }`}></span>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest ${
                        orderStatus === 'Delivered' ? 'text-[#064e3b]' : 
                        orderStatus === 'Shipped' ? 'text-[#c2410c]' : 
                        'text-slate-700'
                    }`}>
                        {orderStatus}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
