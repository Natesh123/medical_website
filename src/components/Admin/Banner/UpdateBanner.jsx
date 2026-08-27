import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateBanner, getBannerDetails, clearErrors } from '../../../actions/bannerAction';
import { UPDATE_BANNER_RESET } from '../../../constants/bannerConstants';
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

const UpdateBanner = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, isUpdated } = useSelector((state) => state.banner);
    const { banner, error: detailsError } = useSelector((state) => state.bannerDetails);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (banner && banner._id !== id) {
            dispatch(getBannerDetails(id));
        } else if (banner) {
            setTitle(banner.title);
            setSubtitle(banner.subtitle);
            setIsActive(banner.isActive);
            setImagePreview(banner.image ? `/${banner.image.url}` : '');
        }

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (detailsError) {
            enqueueSnackbar(detailsError, { variant: "error" });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            enqueueSnackbar("Banner Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_BANNER_RESET });
            navigate('/admin/banners');
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar, id, banner, detailsError]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('isActive', isActive);
        
        if (image) {
            formData.set('image', image);
        }

        dispatch(updateBanner(id, formData));
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
            <MetaData title="Admin Panel | Update Banner" />

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
                        Update <span style={{ color: '#16a34a' }}>Banner</span>
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
                                <Box sx={{ width: '100%', height: '300px', borderRadius: '20px', overflow: 'hidden', border: '2px dashed #16a34a', position: 'relative' }}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <Button 
                                        component="label" 
                                        variant="contained"
                                        sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.7)', borderRadius: '12px' }}
                                    >
                                        Change Image
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ width: '100%', height: '300px', borderRadius: '20px', border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', gap: 2 }}>
                                    <PhotoCamera sx={{ fontSize: 60, color: '#94a3b8' }} />
                                    <Typography sx={{ color: '#64748b', fontWeight: 600 }}>Upload Banner Image (1600x900 recommended)</Typography>
                                    <Button component="label" variant="contained" sx={{ bgcolor: '#16a34a', borderRadius: '12px' }}>
                                        Browse Files
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <TextField
                            fullWidth
                            label="Banner Title"
                            variant="outlined"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />

                        <TextField
                            fullWidth
                            label="Banner Subtitle"
                            variant="outlined"
                            multiline
                            rows={3}
                            required
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={<Typography sx={{ fontWeight: 700, color: '#334155' }}>Active Status (Display on Homepage)</Typography>}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            fullWidth
                            sx={{
                                py: 2,
                                mt: 2,
                                bgcolor: '#16a34a',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                '&:hover': { bgcolor: '#15803d' },
                                '&:disabled': { bgcolor: '#94a3b8', color: 'white' }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Banner'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateBanner;
