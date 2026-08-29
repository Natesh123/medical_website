import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Rating from '@mui/material/Rating';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Product = ({ _id, id, name, images, ratings, numOfReviews, price, cuttedPrice, stock, subCategoryType, gst }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const productId = _id || id;

    // Check if item is already in cart
    const itemInCart = cartItems.find((i) => String(i.product) === String(productId));

    // Upload State
    const [openUpload, setOpenUpload] = useState(false);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const increaseQty = () => {
        if (stock <= itemInCart.quantity) return;
        dispatch(addItemsToCart(productId, itemInCart.quantity + 1, {
            _id, id, name, price, cuttedPrice, images, stock, subCategoryType, gst,
            prescriptionUrl: itemInCart.prescriptionUrl
        }));
    }

    const decreaseQty = () => {
        if (itemInCart.quantity <= 1) {
            dispatch(removeItemsFromCart(productId));
            return;
        }
        dispatch(addItemsToCart(productId, itemInCart.quantity - 1, {
            _id, id, name, price, cuttedPrice, images, stock, subCategoryType, gst,
            prescriptionUrl: itemInCart.prescriptionUrl
        }));
    }

    const handlePrescriptionUpload = async () => {
        if (!prescriptionFile) {
            enqueueSnackbar("Please select a file", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.append('prescription', prescriptionFile);

        setUploading(true);
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
            const { data } = await axios.post('/api/v1/order/prescription', formData, config);

            if (data.success) {
                // Add to cart with prescription URL
                dispatch(addItemsToCart(productId, 1, {
                    _id, id, name, price, cuttedPrice, images, stock, subCategoryType, gst,
                    prescriptionUrl: data.url
                }));
                enqueueSnackbar("Prescription Uploaded & Item Added", { variant: "success" });
                setOpenUpload(false);
                setPrescriptionFile(null);
            }
        } catch (error) {
            enqueueSnackbar("Upload Failed", { variant: "error" });
        } finally {
            setUploading(false);
        }
    };

    const addToCartHandler = async () => {
        if (stock < 1) {
            Swal.fire({
                title: "Unavailable",
                text: "This item is currently out of stock.",
                icon: "warning",
                confirmButtonColor: "#10b981"
            });
            return;
        }

        // Logic Check: If Prescription -> Show Modal
        if (subCategoryType === "Prescription") {
            setOpenUpload(true);
            return;
        }

        dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock, subCategoryType, gst }));
        enqueueSnackbar("Item added to cart", { variant: "success" });
    }

    const buyNowHandler = () => {
        if (stock < 1) {
            enqueueSnackbar("Item Unavailable", { variant: "error" });
            return;
        }
        if (!itemInCart) {
            dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock, subCategoryType, gst }));
        }
        navigate('/cart');
    }

    const BASE_URL = "/";

    return (
        <>
            <div className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-row items-center gap-4 h-full overflow-hidden w-full">

                {/* Image Container */}
                <Link to={`/product/${productId}`} className="shrink-0">
                    <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-slate-50/50 rounded-xl p-2 flex items-center justify-center overflow-hidden group/img cursor-pointer">
                        {cuttedPrice > price && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-lg shadow-red-500/30">
                                {Math.round(((cuttedPrice - price) / cuttedPrice) * 100)}% OFF
                            </div>
                        )}
                        <img
                            draggable="false"
                            className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
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
                </Link>

                {/* Content Info */}
                <div className="flex flex-col flex-1 text-left min-w-0">
                    {/* Category Tag Badge */}
                    <div className="mb-1 flex items-center">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest border ${
                            subCategoryType === 'Prescription'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                            {subCategoryType === 'Prescription' ? (
                                <span className="bg-indigo-600 text-white text-[7.5px] px-1 py-[2px] rounded-sm leading-none tracking-normal">Rx</span>
                            ) : (
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-500"></span>
                            )}
                            {subCategoryType || 'Medical Care'}
                        </span>
                    </div>

                    <Link to={`/product/${productId}`} className="truncate">
                        <h2 className="text-slate-800 font-semibold text-[14px] sm:text-[15px] leading-snug truncate hover:text-[#d97706] transition-colors mb-1">
                            {name}
                        </h2>
                    </Link>

                    {/* Bottom Section: Price & Action */}
                    <div className="mt-auto pt-1">
                        <div className="flex flex-col mb-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-start">
                                    <span className="text-xs font-semibold text-slate-800 mt-[2px] mr-[1px]">₹</span>
                                    <span className="text-2xl font-bold text-slate-900 leading-none tracking-tight">{price.toLocaleString()}</span>
                                </div>
                                {cuttedPrice > price && (
                                    <span className="text-[11px] font-medium text-slate-500 line-through mt-1">
                                        ₹{cuttedPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Large Action Button */}
                        {itemInCart ? (
                            <div className="flex items-center justify-between w-full h-11 bg-white rounded-xl border border-[#d97706] overflow-hidden">
                                <button
                                    onClick={decreaseQty}
                                    className="w-10 h-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center text-lg font-bold hover:bg-[#d97706] hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="text-sm font-bold text-[#d97706] mx-2">
                                    {itemInCart.quantity}
                                </span>
                                <button
                                    onClick={increaseQty}
                                    className="w-10 h-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center text-lg font-bold hover:bg-[#d97706] hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={addToCartHandler}
                                disabled={stock < 1}
                                className={`w-full h-11 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${stock < 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#d97706] text-white hover:bg-[#b45309] shadow-md hover:shadow-lg'}`}
                            >
                                {stock >= 1 && <ShoppingCartIcon sx={{ fontSize: 16 }} />}
                                {stock < 1 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Prescription Upload Modal */}
            <Modal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                aria-labelledby="upload-prescription-modal"
                aria-describedby="upload-prescription-modal-description"
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl outline-none border border-blue-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-blue-950 uppercase tracking-tighter">Required Upload</h3>
                        <button onClick={() => setOpenUpload(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide leading-relaxed">
                            Government regulations require a valid prescription for <span className="text-blue-600">{name}</span>.
                        </p>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group">
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => setPrescriptionFile(e.target.files[0])}
                            />
                            {prescriptionFile ? (
                                <div className="text-center px-4">
                                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest truncate max-w-[200px]">{prescriptionFile.name}</p>
                                    <p className="text-[9px] text-emerald-400 mt-1 font-semibold">Ready to Upload</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <CloudUploadIcon className="text-blue-300 group-hover:text-blue-500 transition-colors mb-2" sx={{ fontSize: 32 }} />
                                    <p className="text-[10px] font-semibold text-blue-900/40 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Tap to Upload</p>
                                </div>
                            )}
                        </label>

                        <button
                            onClick={handlePrescriptionUpload}
                            disabled={!prescriptionFile || uploading}
                            className={`w-full py-3 rounded-xl font-semibold uppercase tracking-widest text-[10px] shadow-lg transition-all ${!prescriptionFile || uploading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95'}`}
                        >
                            {uploading ? 'Verifying...' : 'Verify & Add to Cart'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Product;
