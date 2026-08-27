import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import aayushiLogo from '../../assets/images/logo1.jpg';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    const validate = (field, value) => {
        const newErrors = { ...errors };
        if (field === 'email') {
            if (!value.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
            else delete newErrors.email;
        } else if (field === 'password') {
            if (!value) newErrors.password = "Password is required";
            else delete newErrors.password;
        }
        return newErrors;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors(validate('email', e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors(validate('password', e.target.value));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const formErrors = {};
        if (!email.trim()) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";

        if (!password) formErrors.password = "Password is required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setHasLoggedIn(true);
        dispatch(loginUser(email, password));
    };

    useEffect(() => {
        if (error) {
            // Only show popup for actual errors, not the initial "Please Login to Access" or token expirations
            if (error !== "Please Login to Access" && error !== "Invalid JWT Token" && error !== "JWT Token has expired") {
                Swal.fire({
                    title: "Error!",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            if (hasLoggedIn) {
                Swal.fire({
                    title: "Success!",
                    text: "User Login Successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }

            if (user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/home");
            }
        }
    }, [dispatch, error, isAuthenticated, navigate, user, hasLoggedIn]);

    return (
        <>
            <MetaData title="Login | Shree Kishan Aayushi" />
            {loading && <BackdropLoader />}

            <div className="min-h-screen bg-gradient-to-br from-[#eef2f6] to-[#d5e0e9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#064e3b] opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-primary-orange opacity-10 rounded-full blur-3xl"></div>

                <div className="max-w-5xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/50 relative z-10">

                    {/* Sidebar / Left Panel */}
                    <div className="md:w-[45%] bg-[#064e3b] text-white p-12 flex flex-col justify-between relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-orange/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <Link to="/" className="flex items-center space-x-3 mb-12 hover:opacity-90 transition-opacity">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-md overflow-hidden">
                                        <img draggable="false" className="w-full h-full object-contain" src={aayushiLogo} alt="Shree Kishan Aayushi" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-xl font-semibold tracking-tight leading-none text-white">SHREE KISHAN <span className="text-primary-orange">AAYUSHI</span></span>
                                        <span className="text-[10px] font-semibold text-green-200 uppercase tracking-widest mt-1">Clinical Procurement</span>
                                    </div>
                                </Link>
                                
                                <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">Welcome Back.</h2>
                                <p className="text-green-100/80 text-lg mb-10 leading-relaxed font-light">
                                    Please log in to manage your orders, track your medical supplies, and securely access your account.
                                </p>
                            </div>

                            <div className="mt-auto bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <p className="text-sm text-green-50 font-medium mb-3">New to Shree Kishan Aayushi?</p>
                                <Link to="/register" className="group flex items-center justify-between bg-white text-[#064e3b] px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-50 transition-all duration-300 w-full hover:-translate-y-1">
                                    <span>Create Business Account</span>
                                    <HealthAndSafetyIcon className="text-primary-orange group-hover:scale-110 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="md:w-[55%] p-10 md:p-16 flex flex-col justify-center bg-white">
                        <div className="mb-12">
                            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Secure Login</h1>
                            <p className="text-gray-500 mt-2 font-medium">Please enter your credentials to proceed</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">

                            <TextField
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{ 
                                    style: { borderRadius: '16px', backgroundColor: '#f8fafc' },
                                    classes: { notchedOutline: 'border-gray-200' }
                                }}
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#064e3b',
                                            borderWidth: '2px'
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#064e3b'
                                    }
                                }}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{ 
                                    style: { borderRadius: '16px', backgroundColor: '#f8fafc' },
                                    classes: { notchedOutline: 'border-gray-200' }
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#064e3b',
                                            borderWidth: '2px'
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#064e3b'
                                    }
                                }}
                            />

                            <div className="flex items-center justify-end pt-2">
                                <Link
                                    to="/password/forgot"
                                    className="text-sm font-semibold text-[#064e3b] hover:text-primary-orange transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={<LoginIcon />}
                                sx={{
                                    mt: 4,
                                    borderRadius: '16px',
                                    padding: '16px',
                                    fontWeight: '800',
                                    fontSize: '1.1rem',
                                    backgroundColor: '#f97316', // primary-orange
                                    color: 'white',
                                    textTransform: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#ea580c', // darker orange
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 25px -3px rgba(249, 115, 22, 0.4)',
                                    }
                                }}
                            >
                                Log In
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
