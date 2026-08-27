import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';

import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity, inCart, gst }) => {

    const productId = product || product?._id || product?.id;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const gstAmount = (price * (gst / 100)) * quantity;

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            enqueueSnackbar("Maximum stock reached", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addItemsToCart(id, newQty));
    }

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Item removed", { variant: "info" });
    }

    const BASE_URL = "/";

    if (!inCart) {
        return (
            <div className="flex items-center gap-4 py-4 sm:px-6 group transition-colors" key={product}>
                {/* Compact Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-center">
                    <img
                        draggable="false"
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                        src={image?.startsWith('http') ? image : `${BASE_URL}admin/product/${image}`}
                        alt={name}
                    />
                </div>

                {/* Details */}
                <div className="flex-1 flex justify-between items-center min-w-0">
                    <div className="flex flex-col pr-4 min-w-0">
                        {productId ? (
                            <Link to={`/product/${productId}`} className="block truncate">
                                <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 hover:text-emerald-600 transition-colors truncate">
                                    {name}
                                </h3>
                            </Link>
                        ) : (
                            <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 truncate">{name}</h3>
                        )}
                        <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[11px] text-slate-500 truncate">Sold by {seller}</p>
                            {gst > 0 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                                    {gst}% GST (+₹{gstAmount.toFixed(2)})
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Price and Qty */}
                    <div className="flex flex-col items-end flex-shrink-0 gap-1.5">
                        <div className="text-base sm:text-lg font-semibold text-slate-900">
                            ₹{(price * quantity).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/60 py-1 px-2.5 rounded-lg shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]">
                            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Qty</span>
                            <span className="text-xs font-semibold text-slate-800">{quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start group" key={product}>
            
            {/* Product Image */}
            <div className="w-24 sm:w-32 lg:w-40 aspect-square flex-shrink-0 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center">
                <img
                    draggable="false"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    src={image?.startsWith('http') ? image : `${BASE_URL}admin/product/${image}`}
                    alt={name}
                />
            </div>

            {/* Details & Actions */}
            <div className="flex-1 w-full flex flex-col justify-between min-h-[160px]">
                
                {/* Top: Title & Price */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                        {productId ? (
                            <Link to={`/product/${productId}`} className="block">
                                <h3 className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors leading-tight">
                                    {name}
                                </h3>
                            </Link>
                        ) : (
                            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{name}</h3>
                        )}
                        <div className="flex items-center gap-3">
                            <p className="text-sm text-slate-500">Sold by {seller}</p>
                            {gst > 0 ? (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-widest">
                                    {gst}% GST Applied (+₹{gstAmount.toFixed(2)})
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest">
                                    No GST
                                </span>
                            )}
                        </div>
                        
                        {stock < 10 && (
                            <p className="text-xs font-semibold text-red-500 mt-2">
                                Only {stock} left in stock
                            </p>
                        )}
                    </div>

                    <div className="text-left sm:text-right">
                        <div className="text-xl font-semibold text-slate-900">
                            ₹{(price * quantity).toLocaleString()}
                        </div>
                        {cuttedPrice > price && (
                            <div className="text-sm text-slate-400 line-through mt-1">
                                ₹{(cuttedPrice * quantity).toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom: Quantity & Remove */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100/60">
                    
                    {/* Quantity */}
                    <div className="flex items-center">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => decreaseQuantity(product, quantity)}
                                className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors text-xl font-medium"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
                            <button
                                onClick={() => increaseQuantity(product, quantity, stock)}
                                className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors text-xl font-medium"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeCartItem(product)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors group/remove"
                    >
                        <DeleteOutlineIcon fontSize="small" className="group-hover/remove:scale-110 transition-transform" />
                        <span className="underline underline-offset-4">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
