import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
import { clearErrors, newOrder } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const stripe = useStripe();
    // const elements = useElements();
    // const paymentBtn = useRef(null);

    const [payDisable, setPayDisable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity) + ((item.price * (item.gst || 0) / 100) * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const order = {
        shippingInfo,
        orderItems: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: typeof item.image === 'object' && item.image ? (item.image.url || '') : (item.image || ''),
            product: item.product,
            prescriptionUrl: item.prescriptionUrl
        })),
        totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        setPayDisable(true);

        if (paymentMethod === 'cod') {
            order.paymentInfo = {
                id: "COD-" + Math.floor(Math.random() * 1000000000),
                status: "COD_WAITING"
            };

            dispatch(newOrder(order));
            dispatch(emptyCart());
            enqueueSnackbar("Order Registry Succeeded via COD", { variant: "success" });
            navigate("/order/success");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config,
            );

            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }

            post(info)

        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error.response?.data?.message || "Payment Gateway Sync Failed", { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Secure Transaction | Shree Kishan Aayushi" />
            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="container-responsive relative z-10 py-12 px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        <div className="flex-1 w-full animate-fade-in-left">
                            <Stepper activeStep={3}>
                                <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden mt-8">
                                    <div className="p-8 md:p-12 lg:p-16">
                                        
                                        {/* Header */}
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10 pb-8 border-b border-slate-100/80">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-30 rounded-full"></div>
                                                    <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                                        <AccountBalanceWalletIcon fontSize="medium" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Payment Authorization</h2>
                                                    <p className="text-sm font-semibold text-slate-400 mt-1">Select a secure payment method.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <form onSubmit={submitHandler} autoComplete="off" className="space-y-8">
                                            
                                            {/* Payment Options Grid */}
                                            <div className="space-y-5">
                                                <FormControl component="fieldset" fullWidth>
                                                    <RadioGroup
                                                        aria-labelledby="payment-radio-group"
                                                        value={paymentMethod}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        name="payment-radio-button"
                                                        className="space-y-5"
                                                    >
                                                        {/* Cash On Delivery Option */}
                                                        <div className={`relative p-1 rounded-[1.5rem] bg-white border ${paymentMethod === 'cod' ? 'border-emerald-500 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.2)]' : 'border-slate-100 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:border-emerald-200'} transition-all duration-300 group`}>
                                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 ${paymentMethod === 'cod' ? 'scale-150 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                                                            <FormControlLabel
                                                                value="cod"
                                                                control={<Radio sx={{ color: 'rgba(16,185,129,0.2)', '&.Mui-checked': { color: '#10b981' }, padding: '24px' }} />}
                                                                label={
                                                                    <div className="flex items-center gap-5">
                                                                        <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'cod' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 group-hover:text-emerald-500'}`}>
                                                                            <LocalShippingIcon />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className={`text-[15px] font-semibold tracking-tight ${paymentMethod === 'cod' ? 'text-slate-900' : 'text-slate-700'}`}>Cash on Delivery</span>
                                                                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Settle fulfillment at doorstep</span>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                sx={{ margin: 0, width: '100%', position: 'relative', zIndex: 10 }}
                                                            />
                                                        </div>

                                                        {/* Online Payment Option */}
                                                        <div className={`relative p-1 rounded-[1.5rem] bg-white border ${paymentMethod === 'paytm' ? 'border-teal-500 shadow-[0_15px_40px_-10px_rgba(20,184,166,0.2)]' : 'border-slate-100 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:border-teal-200'} transition-all duration-300 group`}>
                                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 ${paymentMethod === 'paytm' ? 'scale-150 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                                                            <FormControlLabel
                                                                value="paytm"
                                                                control={<Radio sx={{ color: 'rgba(20,184,166,0.2)', '&.Mui-checked': { color: '#14b8a6' }, padding: '24px' }} />}
                                                                label={
                                                                    <div className="flex items-center justify-between w-full pr-6">
                                                                        <div className="flex items-center gap-5">
                                                                            <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'paytm' ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-400 group-hover:text-teal-500'}`}>
                                                                                <AccountBalanceWalletIcon />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <span className={`text-[15px] font-semibold tracking-tight ${paymentMethod === 'paytm' ? 'text-slate-900' : 'text-slate-700'}`}>Paytm Wallet / Net Banking</span>
                                                                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Encrypted Direct Settlement</span>
                                                                            </div>
                                                                        </div>
                                                                        {paymentMethod === 'paytm' && (
                                                                            <div className="hidden md:flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                                                                                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                                                                                <span className="text-[9px] font-semibold text-teal-700 uppercase tracking-widest">Instant Sync</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                }
                                                                sx={{ margin: 0, width: '100%', position: 'relative', zIndex: 10 }}
                                                            />
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>

                                            {/* Security Banner & Submit */}
                                            <div className="pt-8 border-t border-slate-100 border-dashed">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-semibold italic shadow-inner">i</div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-[0.2em]">Institutional Security</span>
                                                            <span className="text-xs font-semibold text-slate-500">Secured via 256-bit SSL protocols.</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={payDisable}
                                                        className={`w-full md:w-auto relative overflow-hidden flex items-center justify-center gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-2xl font-semibold tracking-widest shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.7)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group text-[13px] ${payDisable ? 'opacity-50 cursor-not-allowed scale-95 hover:translate-y-0' : ''}`}
                                                    >
                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                                        <span className="relative z-10">
                                                            {payDisable ? 'AUTHORIZING...' : `COMMIT PAYMENT: ₹${totalPrice.toLocaleString()}`}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Stepper>
                        </div>

                        <div className="w-full lg:w-[450px]">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Payment;