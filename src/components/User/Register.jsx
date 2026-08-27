import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../actions/userAction";
import { getAllRoles } from "../../actions/rolesActions";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import aayushiLogo from '../../assets/images/logo1.jpg';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, isAuthenticated, error, user: currentUser } = useSelector(
    (state) => state.user
  );

  const { roles = [], loading: roleLoading } = useSelector(
    (state) => state.roles || {}
  );

  const [activeStep, setActiveStep] = useState(0);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    password: "",
    cpassword: "",
    // Doctor-specific fields
    qualification: "",
    specialization: [],
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [resume, setResume] = useState(""); 
  const [idProof, setIdProof] = useState("");

  const isDoctor = user.role && user.role.toLowerCase().includes("doctor");
  const steps = isDoctor 
    ? ['Personal Info', 'Account Details', 'Medical Credentials']
    : ['Personal Info', 'Account Details'];

  const validateStep = (stepIndex) => {
    const newErrors = {};
    let isValid = true;

    if (stepIndex === 0) {
      if (!user.name.trim()) newErrors.name = "Required";
      if (!user.email.trim()) newErrors.email = "Required";
      else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Invalid Email";
      if (!user.phone.trim()) newErrors.phone = "Required";
      else if (!/^\d{10}$/.test(user.phone)) newErrors.phone = "10 digits required";
      if (!user.gender) newErrors.gender = "Required";
      if (!user.address.trim()) newErrors.address = "Required";
    }

    if (stepIndex === 1) {
      if (!user.role) newErrors.role = "Role is required";
      if (!user.password) newErrors.password = "Required";
      else if (user.password.length < 8) newErrors.password = "Min 8 chars";
      if (!user.cpassword) newErrors.cpassword = "Required";
      else if (user.password !== user.cpassword) newErrors.cpassword = "Passwords must match";
    }

    if (stepIndex === 2 && isDoctor) {
      if (!user.qualification) newErrors.qualification = "Required";
      if (!user.specialization || user.specialization.length === 0) newErrors.specialization = "Required";
      if (!user.experience) newErrors.experience = "Required";
    }

    if (Object.keys(newErrors).length > 0) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      enqueueSnackbar("Please fill required fields correctly", { variant: "error" });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: null });
    }
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleRegister = async () => {
    if (!validateStep(activeStep)) {
      enqueueSnackbar("Please fix the errors before submitting", { variant: "error" });
      return;
    }

    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      role: user.role,
      password: user.password,
      cpassword: user.cpassword,
    }

    if (isDoctor) {
      payload.qualification = user.qualification;
      payload.specialization = user.specialization.join(", ");
      payload.yearsOfExperience = user.experience;
    }

    dispatch(registerUser(payload));
  };


  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      if (currentUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, enqueueSnackbar, currentUser]);

  // Premium TextField Styling
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#f8fafc',
      transition: 'all 0.3s ease',
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#064e3b', borderWidth: '2px' },
      '&.Mui-error fieldset': { borderColor: '#ef4444', borderWidth: '2px' }
    }
  };
  const inputProps = { style: { borderRadius: '12px' } };

  return (
    <>
      <MetaData title="Create Account | Shree Kishan Aayushi" />
      {loading && <BackdropLoader />}

      <div className="min-h-screen bg-gradient-to-br from-[#eef2f6] to-[#d5e0e9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#064e3b] opacity-10 rounded-full blur-3xl fixed"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-primary-orange opacity-10 rounded-full blur-3xl fixed"></div>

        {/* Premium Layout: min-h-[600px] ensures it feels substantial, md:flex-row handles the columns */}
        <div className="max-w-6xl w-full min-h-[600px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-white/80 relative z-10">

          {/* Left Panel: justify-between aligns top logo and bottom footer perfectly */}
          <div className="hidden md:flex md:w-[35%] bg-[#064e3b] text-white p-12 flex-col justify-between relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-orange/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
            
            <div className="relative z-10">
                <Link to="/" className="flex items-center space-x-3 mb-10 hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-md overflow-hidden shrink-0">
                        <img draggable="false" className="w-full h-full object-contain" src={aayushiLogo} alt="Shree Kishan Aayushi" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xl font-semibold tracking-tight leading-none text-white">SHREE KISHAN</span>
                        <span className="text-xl font-semibold tracking-tight leading-none text-primary-orange">AAYUSHI</span>
                    </div>
                </Link>
                
                <h2 className="text-4xl font-semibold leading-tight mb-4">Join Us.</h2>
                <p className="text-green-100/80 text-base mb-10 leading-relaxed font-light pr-4">
                    Complete the steps to access premium clinical procurement.
                </p>

                <div className="mb-8">
                    <Stepper activeStep={activeStep} orientation="vertical" sx={{
                        '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.4)', fontWeight: '600' },
                        '& .MuiStepLabel-label.Mui-active': { color: '#fff', fontSize: '1.15rem', fontWeight: '800' },
                        '& .MuiStepLabel-label.Mui-completed': { color: '#86efac' },
                        '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.1)' },
                        '& .MuiStepIcon-root.Mui-active': { color: '#f97316' },
                        '& .MuiStepIcon-root.Mui-completed': { color: '#86efac' },
                        '& .MuiStepConnector-line': { borderColor: 'rgba(255,255,255,0.1)' }
                    }}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </div>
            </div>

            <div className="relative z-10 bg-black/10 backdrop-blur-sm rounded-2xl p-5 border border-white/5 shadow-sm">
                <p className="text-xs text-green-100/70 font-medium mb-2 uppercase tracking-wider">Already have an account?</p>
                <Link to="/login" className="text-base font-semibold text-white hover:text-primary-orange transition-colors flex items-center group">
                    Log In Here <ArrowForwardIcon fontSize="small" className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>

          {/* Main Form Area: justify-between aligns header and buttons to match the left sidebar */}
          <div className="w-full md:w-[65%] p-10 md:p-14 bg-white flex flex-col justify-between relative">
            <div>
              <div className="mb-10 pb-4 border-b border-gray-100">
                <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">{steps[activeStep]}</h1>
                <p className="text-gray-500 mt-2 text-sm font-semibold tracking-wide uppercase">Step {activeStep + 1} of {steps.length}</p>
              </div>

              {/* Form Content vertically centered in its remaining space */}
              <div className="flex flex-col justify-center min-h-[300px]">
                {/* STEP 1: PERSONAL INFO */}
                {activeStep === 0 && (
                    <div className="space-y-6 animate-fade-in-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField label="Full Name" name="name" value={user.name} onChange={handleDataChange} fullWidth variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.name} helperText={errors.name} />
                        <TextField label="Email Address" name="email" type="email" value={user.email} onChange={handleDataChange} fullWidth variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.email} helperText={errors.email} />
                        <TextField label="Phone Number" name="phone" type="tel" value={user.phone} onChange={handleDataChange} fullWidth variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.phone} helperText={errors.phone} />
                        <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel sx={{ '&.Mui-focused': { color: '#064e3b' } }}>Gender</InputLabel>
                        <Select name="gender" value={user.gender} onChange={handleDataChange} label="Gender" sx={{ backgroundColor: '#f8fafc', borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#064e3b', borderWidth: '2px' } }}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                        </FormControl>
                    </div>
                    <TextField label="Official Address" name="address" value={user.address} onChange={handleDataChange} fullWidth multiline rows={3} variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.address} helperText={errors.address} />
                    </div>
                )}

                {/* STEP 2: ACCOUNT DETAILS */}
                {activeStep === 1 && (
                    <div className="space-y-8 animate-fade-in-up max-w-lg">
                    <FormControl fullWidth error={!!errors.role}>
                        <InputLabel sx={{ '&.Mui-focused': { color: '#064e3b' } }}>Registering as a...</InputLabel>
                        <Select name="role" value={user.role} onChange={handleDataChange} label="Registering as a..." sx={{ backgroundColor: '#f8fafc', borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#064e3b', borderWidth: '2px' } }}>
                        {loading ? <MenuItem disabled>Loading...</MenuItem> :
                            roles.map((role) => (
                            <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
                            ))
                        }
                        </Select>
                        {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                    </FormControl>
                    
                    <div className="grid grid-cols-1 gap-5">
                        <TextField label="Secure Password" name="password" type="password" value={user.password} onChange={handleDataChange} fullWidth variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.password} helperText={errors.password} />
                        <TextField label="Confirm Password" name="cpassword" type="password" value={user.cpassword} onChange={handleDataChange} fullWidth variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.cpassword} helperText={errors.cpassword} />
                    </div>
                    </div>
                )}

                {/* STEP 3: DOCTOR DETAILS */}
                {activeStep === 2 && isDoctor && (
                    <div className="space-y-5 animate-fade-in-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormControl fullWidth size="small" error={!!errors.qualification} sx={textFieldStyles}>
                          <InputLabel sx={{ '&.Mui-focused': { color: '#064e3b' } }}>Qualification</InputLabel>
                          <Select name="qualification" value={user.qualification} onChange={handleDataChange} label="Qualification" sx={{ backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                              <MenuItem value="MBBS">MBBS</MenuItem>
                              <MenuItem value="BDS">BDS</MenuItem>
                              <MenuItem value="BAMS">BAMS</MenuItem>
                              <MenuItem value="BHMS">BHMS</MenuItem>
                              <MenuItem value="MD">MD</MenuItem>
                              <MenuItem value="MS">MS</MenuItem>
                              <MenuItem value="Others">Others</MenuItem>
                          </Select>
                          {errors.qualification && <FormHelperText>{errors.qualification}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth size="small" error={!!errors.specialization} sx={textFieldStyles}>
                          <InputLabel sx={{ '&.Mui-focused': { color: '#064e3b' } }}>Specialization</InputLabel>
                          <Select multiple name="specialization" value={user.specialization} onChange={handleDataChange} label="Specialization" sx={{ backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                              <MenuItem value="Cardiology">Cardiology</MenuItem>
                              <MenuItem value="Dermatology">Dermatology</MenuItem>
                              <MenuItem value="Neurology">Neurology</MenuItem>
                              <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                              <MenuItem value="Psychiatry">Psychiatry</MenuItem>
                              <MenuItem value="General Medicine">General Medicine</MenuItem>
                              <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                              <MenuItem value="Gynecology">Gynecology</MenuItem>
                          </Select>
                          {errors.specialization && <FormHelperText>{errors.specialization}</FormHelperText>}
                        </FormControl>
                        
                        <TextField label="Experience (Years)" type="number" name="experience" value={user.experience} onChange={handleDataChange} fullWidth size="small" variant="outlined" InputProps={inputProps} sx={textFieldStyles} error={!!errors.experience} helperText={errors.experience} />
                    </div>
                    </div>
                )}
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-between mt-10">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 'bold', '&:hover': { color: '#064e3b', backgroundColor: '#f8fafc' } }}
              >
                Go Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                    onClick={handleRegister}
                    variant="contained"
                    sx={{
                        borderRadius: '12px',
                        padding: '12px 36px',
                        fontSize: '15px',
                        fontWeight: '800',
                        backgroundColor: '#f97316',
                        color: 'white',
                        textTransform: 'none',
                        boxShadow: '0 8px 20px -6px rgba(249, 115, 22, 0.5)',
                        '&:hover': { backgroundColor: '#ea580c', transform: 'translateY(-1px)', boxShadow: '0 10px 25px -6px rgba(249, 115, 22, 0.6)' },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Submit Registration
                </Button>
              ) : (
                <Button
                    onClick={handleNext}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        borderRadius: '12px',
                        padding: '12px 36px',
                        fontSize: '15px',
                        fontWeight: '800',
                        backgroundColor: '#064e3b',
                        color: 'white',
                        textTransform: 'none',
                        boxShadow: '0 8px 20px -6px rgba(6, 78, 59, 0.4)',
                        '&:hover': { backgroundColor: '#04362a', transform: 'translateY(-1px)', boxShadow: '0 10px 25px -6px rgba(6, 78, 59, 0.5)' },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Next Step
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;