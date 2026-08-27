import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Button, Typography } from '@mui/material';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { isAuthenticated } = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productId = params.id;
    const itemInCart = cartItems.find((i) => i.product === productId);
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const quantity = itemInCart ? itemInCart.quantity : 1;

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        dispatch(addItemsToCart(productId, quantity + 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock,
            gst: product.gst
        }));
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            dispatch(removeItemsFromCart(productId));
            return;
        }
        dispatch(addItemsToCart(productId, quantity - 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock,
            gst: product.gst
        }));
    }

    const addToCartHandler = () => {
        if (product.stock < 1) return;
        dispatch(addItemsToCart(productId, 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock,
            gst: product.gst
        }));
        enqueueSnackbar("Item Added to Reserves", { variant: "success" });
    }

    const buyNow = () => {
        if (product.stock < 1) return;
        if (!itemInCart) {
            dispatch(addItemsToCart(productId, 1, {
                _id: product._id,
                name: product.name,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                images: product.images,
                stock: product.stock,
                gst: product.gst
            }));
        }
        navigate('/cart');
    }

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Removed from Wishlist", { variant: "info" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (!isAuthenticated) {
            enqueueSnackbar("Please Login to Post a Review", { variant: "error" });
            return;
        }
        if (rating === 0 || comment.trim() === "") {
            enqueueSnackbar("Please Provide Rating and Comment", { variant: "warning" });
            return;
        }

        const formData = {
            rating: Number(rating),
            comment: comment,
            productId: productId,
        };

        dispatch({ type: "NEW_REVIEW_REQUEST" }); // Mock dispatch just to hit action
        // Actually we should import newReview from productAction
        // Wait, newReview action uses form data or JSON? productAction uses json.
        dispatch(require('../../actions/productAction').newReview(formData));
        setOpen(false);
    }

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        dotsClass: "slick-dots premium-dots",
    };

    const BASE_URL = "/";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, enqueueSnackbar]);

    useEffect(() => {
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: "NEW_REVIEW_RESET" });
            dispatch(getProductDetails(productId));
        }
    }, [dispatch, reviewError, success, enqueueSnackbar, productId]);

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarProducts(product.category));
        }
    }, [dispatch, product]);

    return (
        <main className="min-h-screen pt-36 pb-32 bg-[#f4f6f8] relative">
            <MetaData title={`${product.name} | Shree Kishan Aayushi`} />

            {loading ? <Loader /> : (
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb Removed */}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT: Product Image & Overview */}
                        <div className="lg:col-span-5 w-full flex flex-col gap-6">
                            {/* Image Gallery */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100">
                                <Slider {...settings} className="product-details-slider w-full relative z-10">
                                    {product.images?.map((item, i) => (
                                        <div key={i} className="aspect-square flex items-center justify-center p-4">
                                            <img
                                                draggable="false"
                                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                                src={item.url.startsWith('http') ? item.url : `${BASE_URL}admin/product/${item.url}`}
                                                alt={product.name}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* Description Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-3">Product Overview</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Product Details & Buy Box */}
                        <div className="lg:col-span-7 flex flex-col gap-6 pt-2">
                            
                            {/* Main Details Card */}
                            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5">
                                
                                {/* Title & Brand */}
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-snug">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 cursor-pointer" onClick={() => setOpen(true)}>
                                            <span className="text-xs font-semibold">{product.ratings || 4.5}</span>
                                            <StarIcon sx={{ fontSize: 14 }} />
                                        </div>
                                        <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => setOpen(true)}>
                                            {product.numOfReviews} Ratings & Reviews
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* Price Section */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-end gap-3">
                                        <span className="text-4xl font-semibold text-slate-900">₹{product.price?.toLocaleString()}</span>
                                        {product.cuttedPrice && (
                                            <>
                                                <span className="text-lg text-slate-400 font-medium line-through mb-1">MRP ₹{product.cuttedPrice.toLocaleString()}</span>
                                                <span className="text-green-600 font-semibold text-sm mb-1">
                                                    {Math.round(((product.cuttedPrice - product.price) / product.cuttedPrice) * 100)}% OFF
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium">Inclusive of all taxes</span>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-sm font-semibold text-green-600">In Stock</span>
                                    <span className="text-sm text-slate-500 ml-1">({product.stock} units available)</span>
                                </div>

                                {/* Buy Actions */}
                                <div className="flex flex-col md:flex-row gap-4 mt-4">
                                    {/* Quantity */}
                                    <div className="flex items-center justify-between h-12 w-32 bg-white border border-slate-300 rounded-lg px-2">
                                        <button onClick={decreaseQuantity} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded text-xl font-medium transition-colors">
                                            -
                                        </button>
                                        <span className="text-base font-semibold text-slate-900">
                                            {quantity}
                                        </span>
                                        <button onClick={increaseQuantity} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded text-xl font-medium transition-colors">
                                            +
                                        </button>
                                    </div>

                                    <div className="flex-1 flex gap-3">
                                        <button
                                            onClick={addToCartHandler}
                                            disabled={product.stock < 1}
                                            className="flex-1 h-12 bg-white border-2 border-[#d97706] text-[#d97706] rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCartIcon sx={{ fontSize: 18 }} /> Add to Cart
                                        </button>
                                        
                                        <button
                                            onClick={buyNow}
                                            disabled={product.stock < 1}
                                            className="flex-1 h-12 bg-[#d97706] text-white rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#b45309] shadow-md transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBagIcon sx={{ fontSize: 18 }} /> Buy Now
                                        </button>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-600 uppercase">100% Genuine</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-600 uppercase">Secure Payment</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-600 uppercase">Fast Delivery</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description Card moved to Left Column */}
                            
                            {/* Reviews Action Card */}
                            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Customer Reviews</h3>
                                    <p className="text-sm text-slate-500">Share your experience and help others.</p>
                                </div>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold text-sm shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap"
                                >
                                    Write a Review
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Review Dialog */}
                    <Dialog
                        aria-labelledby="review-dialog"
                        open={open}
                        onClose={() => setOpen(false)}
                        PaperProps={{
                            sx: {
                                borderRadius: '16px',
                                padding: '16px',
                                minWidth: '320px'
                            }
                        }}
                    >
                        <DialogTitle sx={{ pb: 1, pt: 1, textAlign: 'center' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                                Submit Review
                            </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, pt: 2 }}>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                                precision={1}
                                sx={{ color: '#d97706' }}
                            />
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                placeholder="Write your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        fontSize: '14px'
                                    }
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 2 }}>
                            <Button onClick={() => setOpen(false)} sx={{ color: '#64748b', fontWeight: 700 }}>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} variant="contained" sx={{ background: '#d97706', borderRadius: '8px', fontWeight: 700, '&:hover': { background: '#b45309' }, boxShadow: 'none' }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Similar Products */}
                    <div className="mt-16 border-t border-slate-200 pt-12">
                        <h2 className="text-2xl font-semibold text-slate-900 mb-8">Similar Products</h2>
                        <ProductSlider title="" tagline="" productId={product._id} />
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetails;
