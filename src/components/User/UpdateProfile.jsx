import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");


    // Professional Details State
    const [address, setAddress] = useState("");
    const [clinicname, setClinicname] = useState("");
    const [clinicid, setClinicid] = useState("");
    const [qualification, setQualification] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [medicalCouncil, setMedicalCouncil] = useState("");
    const [experience, setExperience] = useState("");

    const [registrationCertificate, setRegistrationCertificate] = useState("");
    const [doctorIdProof, setDoctorIdProof] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            phone,
            gender,
            avatar,
            address,
            clinicname,
            clinicid,
            qualification,
            specialization,
            registrationNumber,
            medicalCouncilName: medicalCouncil,
            yearsOfExperience: experience,
            registrationCertificate,
            doctorIdProof,
            profilePhoto
        };

        dispatch(updateProfile(userData));
    }

    const handleUpdateDataChange = (e) => {
        const reader = new FileReader();
        const name = e.target.name;

        reader.onload = () => {
            if (reader.readyState === 2) {
                if (name === "avatar") {

                    setAvatar(reader.result);
                } else if (name === "registrationCertificate") {
                    setRegistrationCertificate(reader.result);
                } else if (name === "doctorIdProof") {
                    setDoctorIdProof(reader.result);
                } else if (name === "profilePhoto") {
                    setProfilePhoto(reader.result);
                }
            }
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || "");
            setGender(user.gender);


            setAddress(user.address || "");
            setClinicname(user.clinicname || "");
            setClinicid(user.clinicid || "");
            setQualification(user.qualification || "");
            setSpecialization(user.specialization || "");
            setRegistrationNumber(user.registrationNumber || "");
            setMedicalCouncil(user.medicalCouncilName || "");
            setExperience(user.yearsOfExperience || "");
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    const muiInputStyles = {
        '& .MuiOutlinedInput-root': { 
            borderRadius: '1rem', 
            bgcolor: '#ffffff', 
            fontWeight: '500',
            transition: 'all 0.3s ease',
            '& fieldset': {
                borderColor: '#e5e7eb',
                borderWidth: '1px'
            },
            '&:hover fieldset': {
                borderColor: '#064e3b',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#064e3b',
                borderWidth: '2px'
            }
        },
        '& .MuiInputLabel-root': { 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            fontSize: '11px',
            color: '#9ca3af'
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#064e3b'
        }
    };

    return (
        <>
            <MetaData title="Modify Profile | Shree Kishan Aayushi" />
            {loading && <BackdropLoader />}

            <main className="min-h-screen bg-slate-50 pt-20 pb-20 relative overflow-hidden">
                
                {/* Subtle Background Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    
                    {/* Top Cover Banner */}
                    <div className="h-48 md:h-56 w-full rounded-t-[2.5rem] bg-gradient-to-r from-[#064e3b] via-[#0a664e] to-[#043326] relative overflow-hidden shadow-lg mt-6">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#f97316]/20 rounded-full blur-2xl"></div>
                    </div>

                    {/* Main Form Container */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 -mt-20 relative z-20">
                        
                        <div className="flex flex-col items-center mb-10 gap-3">
                            <div className="w-16 h-1.5 bg-[#f97316] rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 uppercase tracking-wide text-center">
                                Edit Profile Details
                            </h2>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Update your ledger information</p>
                        </div>

                        <form onSubmit={updateProfileHandler} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    sx={muiInputStyles}
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    sx={muiInputStyles}
                                />
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    sx={muiInputStyles}
                                />
                            </div>

                            <div className="space-y-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-2">Gender Selection</p>
                                <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)} className="flex gap-8 px-2">
                                    <FormControlLabel value="male" control={<Radio sx={{ color: 'rgba(6,78,59,0.3)', '&.Mui-checked': { color: '#064e3b' } }} />} label={<span className="text-gray-700 font-semibold uppercase text-xs tracking-wider">Male</span>} />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: 'rgba(6,78,59,0.3)', '&.Mui-checked': { color: '#064e3b' } }} />} label={<span className="text-gray-700 font-semibold uppercase text-xs tracking-wider">Female</span>} />
                                </RadioGroup>
                            </div>

                            {user.role && user.role.toLowerCase().includes("doctor") && (
                                <div className="pt-8 border-t border-gray-100 space-y-8 mt-10">
                                    <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#064e3b]/5 flex items-center justify-center text-[#064e3b]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        </div>
                                        Professional Registry
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextField fullWidth label="Medical Council Name" value={medicalCouncil} onChange={(e) => setMedicalCouncil(e.target.value)} sx={muiInputStyles} />
                                        <TextField fullWidth label="Registration Number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} sx={muiInputStyles} />
                                        <TextField fullWidth label="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} sx={muiInputStyles} />
                                        <TextField fullWidth label="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} sx={muiInputStyles} />
                                        <TextField fullWidth label="Experience (Years)" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} sx={muiInputStyles} />
                                        <TextField fullWidth label="Clinic Name" value={clinicname} onChange={(e) => setClinicname(e.target.value)} sx={muiInputStyles} />
                                    </div>
                                    <TextField fullWidth multiline rows={2} label="Clinic Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={muiInputStyles} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col gap-3">
                                            <label className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                Update Medical Certificate
                                            </label>
                                            <input
                                                type="file"
                                                name="registrationCertificate"
                                                accept="image/*,application/pdf"
                                                onChange={handleUpdateDataChange}
                                                className="block w-full text-xs text-gray-500
                                                file:mr-4 file:py-2.5 file:px-5
                                                file:rounded-xl file:border-0
                                                file:text-[10px] file:font-semibold file:uppercase file:tracking-wider
                                                file:bg-emerald-600 file:text-white
                                                hover:file:bg-emerald-700 hover:file:cursor-pointer transition-all"
                                            />
                                        </div>
                                        <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100 flex flex-col gap-3">
                                            <label className="text-[10px] font-semibold text-orange-800 uppercase tracking-widest flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                                Update ID Proof
                                            </label>
                                            <input
                                                type="file"
                                                name="doctorIdProof"
                                                accept="image/*,application/pdf"
                                                onChange={handleUpdateDataChange}
                                                className="block w-full text-xs text-gray-500
                                                file:mr-4 file:py-2.5 file:px-5
                                                file:rounded-xl file:border-0
                                                file:text-[10px] file:font-semibold file:uppercase file:tracking-wider
                                                file:bg-[#f97316] file:text-white
                                                hover:file:bg-[#ea580c] hover:file:cursor-pointer transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-6 border-t border-gray-100">
                                <Link to="/account" className="flex-1 bg-gray-50 border border-gray-200 text-gray-500 text-center py-4 rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-gray-100 transition-all duration-300">
                                    Cancel Changes
                                </Link>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#f97316] text-white py-4 rounded-xl font-semibold uppercase tracking-widest text-[11px] shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)] hover:bg-[#ea580c] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-6px_rgba(249,115,22,0.6)] transition-all duration-300"
                                >
                                    {loading ? 'Saving Changes...' : 'Save Profile Details'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdateProfile;