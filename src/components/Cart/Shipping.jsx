import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
// force recompile

import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState(shippingInfo.state || "");
    const [pincode, setPincode] = useState(shippingInfo.pincode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

    const [errors, setErrors] = useState({});

    // Real-time error clearance
    const handleInputChange = (setter, field, value) => {
        setter(value);
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address.trim()) newErrors.address = "Delivery address is required";
        if (!pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        } else if (pincode.length !== 6) {
            newErrors.pincode = "Pincode must be 6 digits";
        }
        if (!phoneNo.trim()) {
            newErrors.phoneNo = "Phone number is required";
        } else if (phoneNo.length !== 10) {
            newErrors.phoneNo = "Phone number must be 10 digits";
        }
        if (!city.trim()) newErrors.city = "City name is required";
        if (!state) newErrors.state = "Please select your state";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(saveShippingInfo({ address, city, country, state, pincode, phoneNo }));
            enqueueSnackbar("Address saved successfully", { variant: "success" });
            navigate("/order/confirm");
        } else {
            enqueueSnackbar("Please correct the errors mentioned below", { variant: "error" });
        }
    }

    const premiumInputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '1rem',
            bgcolor: '#ffffff',
            fontWeight: '600',
            color: '#0f172a',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 2px 10px -2px rgba(0,0,0,0.02)',
            '& fieldset': {
                borderColor: '#e2e8f0',
                borderWidth: '2px',
                transition: 'all 0.3s ease-in-out',
            },
            '&:hover fieldset': {
                borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#059669',
                borderWidth: '2px',
                boxShadow: '0 4px 20px -4px rgba(5, 150, 105, 0.15)',
            },
            '& input:-webkit-autofill, & textarea:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #ffffff inset',
                WebkitTextFillColor: '#0f172a',
                transition: 'background-color 5000s ease-in-out 0s',
            }
        },
        '& .MuiInputLabel-root': {
            color: '#64748b',
            fontWeight: '600',
            fontSize: '15px'
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#059669',
            fontWeight: '700'
        }
    };

    return (
        <>
            <MetaData title="Deployment Logistics | Shree Kishan Aayushi" />
            <main className="min-h-screen pt-28 pb-24 bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-emerald-400/20 blur-[120px] rounded-full mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-teal-400/20 blur-[120px] rounded-full mix-blend-multiply"></div>
                </div>

                <div className="w-full xl:w-[95%] 2xl:w-[90%] max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 mt-4 md:mt-8 relative z-10">
                    
                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 animate-fade-in-up mt-2">
                        <div className="flex items-center gap-5 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-40 rounded-full group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
                                    <ShoppingCartCheckoutOutlinedIcon />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Checkout</h1>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Secure Delivery Logistics</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">

                        {/* Main Logistics column */}
                        <div className="flex-1 w-full animate-fade-in-up" style={{animationDelay: '100ms'}}>
                            <Stepper activeStep={1}>
                                <div className="bg-white rounded-b-[2rem] border border-t-0 border-slate-200 shadow-2xl shadow-slate-200/50">
                                    
                                    <div className="p-8 md:p-12 lg:p-16">
                                        <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-100">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                                                <LocalShippingOutlinedIcon fontSize="medium" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Delivery Address</h2>
                                                <p className="text-sm font-medium text-slate-500 mt-1">Please enter your exact shipping location</p>
                                            </div>
                                        </div>
                                        
                                        <form onSubmit={shippingSubmit} autoComplete="off" className="space-y-8">

                                            <TextField
                                                value={address}
                                                onChange={(e) => handleInputChange(setAddress, 'address', e.target.value)}
                                                fullWidth
                                                label="Full Delivery Address"
                                                variant="outlined"
                                                required
                                                multiline
                                                rows={2}
                                                error={!!errors.address}
                                                helperText={errors.address}
                                                sx={premiumInputStyle}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5, mr: 1.5 }}>
                                                            <LocationOnOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <TextField
                                                    value={pincode}
                                                    onChange={(e) => handleInputChange(setPincode, 'pincode', e.target.value)}
                                                    type="number"
                                                    label="Pincode"
                                                    fullWidth
                                                    required
                                                    error={!!errors.pincode}
                                                    helperText={errors.pincode}
                                                    sx={premiumInputStyle}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                                <DialpadOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    value={phoneNo}
                                                    onChange={(e) => handleInputChange(setPhoneNo, 'phoneNo', e.target.value)}
                                                    type="number"
                                                    label="Phone Number"
                                                    fullWidth
                                                    required
                                                    error={!!errors.phoneNo}
                                                    helperText={errors.phoneNo}
                                                    sx={premiumInputStyle}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                                <PhoneOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <TextField
                                                    value={city}
                                                    onChange={(e) => handleInputChange(setCity, 'city', e.target.value)}
                                                    label="City"
                                                    fullWidth
                                                    required
                                                    error={!!errors.city}
                                                    helperText={errors.city}
                                                    sx={premiumInputStyle}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                                <LocationCityOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    label="Landmark (Optional)"
                                                    fullWidth
                                                    sx={premiumInputStyle}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-8">
                                                <Autocomplete
                                                    options={states}
                                                    getOptionLabel={(option) => option.name}
                                                    value={states.find((s) => s.code === state) || null}
                                                    onChange={(event, newValue) => {
                                                        handleInputChange(setState, 'state', newValue ? newValue.code : "");
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option.code === value.code}
                                                    PaperComponent={({ children }) => (
                                                        <div className="bg-white rounded-[1.25rem] mt-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
                                                            {children}
                                                        </div>
                                                    )}
                                                    sx={{
                                                        '& .MuiAutocomplete-option': {
                                                            padding: '12px 24px',
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#475569',
                                                            transition: 'all 0.2s',
                                                            '&[aria-selected="true"]': {
                                                                backgroundColor: '#d1fae5 !important',
                                                                color: '#047857',
                                                                fontWeight: '800',
                                                            },
                                                            '&:hover, &.Mui-focused': {
                                                                backgroundColor: '#ecfdf5 !important',
                                                                color: '#059669',
                                                            },
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="State"
                                                            required
                                                            error={!!errors.state}
                                                            helperText={errors.state}
                                                            sx={premiumInputStyle}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                startAdornment: (
                                                                    <>
                                                                        <InputAdornment position="start" sx={{ mr: 1, ml: 1 }}>
                                                                            <PublicOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                                        </InputAdornment>
                                                                        {params.InputProps.startAdornment}
                                                                    </>
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className="pt-8 border-t border-slate-100 flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 group"
                                                >
                                                    <span>Save & Continue</span>
                                                    <ArrowForwardOutlinedIcon fontSize="small" className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Stepper>
                        </div>

                        {/* Price Breakdown Sidebar */}
                        <div className="lg:w-[400px] xl:w-[480px] w-full sticky top-32 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Shipping;
