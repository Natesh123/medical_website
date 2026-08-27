import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { createBanner, clearErrors } from '../../../actions/bannerAction';
import { NEW_BANNER_RESET } from '../../../constants/bannerConstants';
import MetaData from '../../Layouts/MetaData';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    FormControlLabel,
    Switch
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const NewBanner = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newBanner);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (success) {
            enqueueSnackbar("Banner Created Successfully", { variant: "success" });
            dispatch({ type: NEW_BANNER_RESET });
            navigate('/admin/banners');
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!image) {
            enqueueSnackbar("Please select an image", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('isActive', isActive);
        formData.set('image', image);

        dispatch(createBanner(formData));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Admin Panel | Add New Banner" />

            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link to="/admin/banners">
                    <Box sx={{ 
                        w: 40, h: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        borderRadius: '12px', bgcolor: '#f1f5f9', color: '#64748b',
                        '&:hover': { bgcolor: '#e2e8f0', color: '#16a34a' }, transition: 'all 0.3s'
                    }}>
                        <ArrowBackIcon />
                    </Box>
                </Link>
                <Box>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[10px] font-semibold text-green-900/40 uppercase tracking-[0.3em]">Banners</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        Add New <span style={{ color: '#16a34a' }}>Banner</span>
                    </Typography>
                </Box>
            </Box>

            <Card sx={{
                borderRadius: '35px',
                boxShadow: '0 40px 100px rgba(22, 163, 74, 0.04)',
                border: '1px solid #f1f5f9',
                background: '#ffffff',
                maxWidth: '800px',
                mx: 'auto'
            }}>
                <CardContent sx={{ p: 5 }}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
                            {imagePreview ? (
                                <Box sx={{ width: '100%', height: '300px', borderRadius: '25px', overflow: 'hidden', border: '2px dashed #16a34a', position: 'relative' }}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <Button 
                                        component="label" 
                                        variant="contained"
                                        sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.7)', borderRadius: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
                                    >
                                        Change Image
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ width: '100%', height: '300px', borderRadius: '25px', border: '2px dashed rgba(22, 163, 74, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0fdf4', gap: 2, transition: 'all 0.3s ease', '&:hover': { borderColor: '#16a34a', bgcolor: '#dcfce7' } }}>
                                    <PhotoCamera sx={{ fontSize: 60, color: 'rgba(22, 163, 74, 0.4)' }} />
                                    <Typography sx={{ color: '#16a34a', fontWeight: 800, fontSize: '13px' }}>Upload Banner Image (1600x900 recommended)</Typography>
                                    <Button component="label" variant="contained" sx={{ bgcolor: '#16a34a', borderRadius: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', px: 4, py: 1.5, boxShadow: '0 10px 20px rgba(22,163,74,0.2)', '&:hover': { bgcolor: '#15803d', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>
                                        Browse Files
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Banner Title *</label>
                            <TextField
                                fullWidth
                                placeholder="Enter banner title"
                                variant="outlined"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-green-900/30 uppercase tracking-widest ml-1">Banner Subtitle *</label>
                            <TextField
                                fullWidth
                                placeholder="Enter banner subtitle"
                                variant="outlined"
                                multiline
                                rows={3}
                                required
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                            />
                        </div>

                        <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f1f5f9' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 900, color: '#020617', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Active Status</Typography>
                                <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, mt: 0.5 }}>Display this banner on the homepage</Typography>
                            </Box>
                            <Switch
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                color="success"
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#16a34a' } }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            disabled={loading}
                            fullWidth
                            sx={{
                                py: 2.5,
                                mt: 2,
                                bgcolor: '#16a34a',
                                color: 'white',
                                borderRadius: '15px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                fontSize: '12px',
                                boxShadow: '0 15px 30px rgba(22, 163, 74, 0.15)',
                                '&:hover': { bgcolor: '#14532d', transform: 'translateY(-2px)' },
                                '&:disabled': { bgcolor: '#94a3b8', color: 'white', transform: 'none', boxShadow: 'none' },
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Banner'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NewBanner;
