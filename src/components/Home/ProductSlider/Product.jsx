import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../../actions/cartAction';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';

const Product = (props) => {

    const { _id, id, name, images, ratings, numOfReviews, price, cuttedPrice, stock, gst } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const productId = _id || id;
    const itemInCart = cartItems.find((i) => i.product === productId);

    const BASE_URL = "/";

    const increaseQty = () => {
        if (stock <= itemInCart.quantity) return;
        dispatch(addItemsToCart(productId, itemInCart.quantity + 1, { _id, id, name, price, cuttedPrice, images, stock, gst }));
    }

    const decreaseQty = () => {
        if (itemInCart.quantity <= 1) {
            dispatch(removeItemsFromCart(productId));
            return;
        }
        dispatch(addItemsToCart(productId, itemInCart.quantity - 1, { _id, id, name, price, cuttedPrice, images, stock, gst }));
    }

    const addToCartHandler = () => {
        if (stock < 1) {
            Swal.fire({
                title: "Unavailable",
                text: "Item is currently out of stock",
                icon: "warning",
                confirmButtonColor: "#10b981"
            });
            return;
        }
        dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock, gst }));
    }

    const buyNowHandler = () => {
        if (stock < 1) {
            enqueueSnackbar("Item Unavailable", { variant: "error" });
            return;
        }
        if (!itemInCart) {
            dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock, gst }));
        }
        navigate('/cart');
    }


    return (
        <div className="group relative bg-white rounded-[1.2rem] p-4 transition-all duration-500 hover:shadow-xl border border-blue-50 flex flex-col items-center text-center overflow-hidden m-2">

            {/* Image Container */}
            <div className="relative w-full aspect-square mb-6 bg-[#f8fafc] rounded-2xl p-4 flex items-center justify-center overflow-hidden group/img">
                <img
                    draggable="false"
                    className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-105"
                    src={
                        images && images.length > 0 && images[0].url
                            ? (images[0].url.startsWith('http') || images[0].url.startsWith('https')
                                ? images[0].url
                                : `${BASE_URL}admin/product/${images[0].url}`)
                            : "/default.png"
                    }
                    alt={name}
                />
            </div>

            {/* Content Info */}
            <div className="flex flex-col gap-1 w-full relative z-10 flex-1">
                <div>
                    <h2 className="text-[#1a202c] font-semibold text-xs uppercase tracking-tight leading-tight px-1 line-clamp-2">
                        {name}
                    </h2>
                </div>

                {/* Price Display - Below Name */}
                <div className="flex flex-col items-center gap-1 mt-2">
                    <span className="text-xl font-semibold text-blue-600 tracking-tighter leading-none">₹{price.toLocaleString()}</span>

                    {/* Highlighted Stock Qty */}
                    <div className="mt-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-[8px] font-semibold text-blue-900 uppercase tracking-widest leading-none">
                            Stock: {stock}
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    {itemInCart ? (
                        <div className="flex items-center justify-between w-full h-10 bg-[#f0f4f8] rounded-full px-1 border border-blue-50 shadow-inner">
                            <button
                                onClick={decreaseQty}
                                className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg font-semibold shadow-sm"
                            >
                                -
                            </button>
                            <span className="text-xs font-semibold text-[#1a202c]">
                                {itemInCart.quantity}
                            </span>
                            <button
                                onClick={increaseQty}
                                className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg font-semibold shadow-sm"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={addToCartHandler}
                            disabled={stock < 1}
                            className="w-full h-10 rounded-lg border border-blue-600 bg-white text-blue-600 text-[10px] font-semibold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingCartIcon sx={{ fontSize: 14 }} />
                            ADD
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
